"use client";

import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/shared/hero-section";
import {
  Camera,
  Hand,
  BarChart3,
  Download,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import Link from "next/link";

export default function DemoPage() {
  const [mode, setMode] = useState<"lip-read" | "gesture">("lip-read");
  const [isRecording, setIsRecording] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFpsRef = useRef<number | null>(null);
  const framesAccRef = useRef(0);
  const framesTotalRef = useRef(0);
  const transcriptionIndexRef = useRef(0);
  const [fps, setFps] = useState(0);
  const [framesProcessed, setFramesProcessed] = useState(0);
  const [gpuLoad, setGpuLoad] = useState(45);
  const [confidence, setConfidence] = useState(92);
  const [mockLabel, setMockLabel] = useState<string>("");
  const [mirror, setMirror] = useState(true);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const { user } = useAuth();

  const startWebcam = async () => {
    try {
      setCameraError(null);
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        } as MediaTrackConstraints,
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // stop previous tracks if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // reset runtime metrics
      framesAccRef.current = 0;
      framesTotalRef.current = 0;
      transcriptionIndexRef.current = 0;
      setFps(0);
      setFramesProcessed(0);
      setMockLabel("");
      setIsRecording(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unable to access camera";
      setCameraError(errorMessage);
      setIsRecording(false);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
  };

  const toggleWebcam = () => {
    if (isRecording) {
      stopWebcam();
    } else {
      startWebcam();
    }
  };

  const switchCamera = async () => {
    // toggle facing mode and restart stream
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    stopWebcam();
    // allow a small gap for tracks to stop
    setTimeout(() => startWebcam(), 250);
  };

  const captureSnapshot = () => {
    const v = videoRef.current;
    if (!v) return;
    const w = v.videoWidth || v.clientWidth;
    const h = v.videoHeight || v.clientHeight;
    if (!w || !h) return;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    if (mirror) {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(v, 0, 0, w, h);
    const url = c.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "vss-snapshot.png";
    a.click();
  };

  const toggleMirror = () => setMirror((m) => !m);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Attach stream to video element when the video is mounted and recording starts
  useEffect(() => {
    if (isRecording && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      // ensure playback starts (muted + playsInline required for autoplay in most browsers)
      const playPromise = videoRef.current.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          /* ignore play() rejection */
        });
      }
    }
  }, [isRecording]);

  // Processing / overlay / mock predictions loop
  useEffect(() => {
    let animationId: number | null = null;
    let mockInterval: number | null = null;

    const canvas = overlayRef.current;
    const video = videoRef.current;

    const syncCanvasSize = () => {
      if (!canvas || !video) return;
      const w = video.videoWidth || video.clientWidth;
      const h = video.videoHeight || video.clientHeight;
      if (w && h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const drawOverlay = (time: number) => {
      if (!canvas || !video) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // simple animated mock boxes for demo
      ctx.lineWidth = Math.max(2, Math.floor(Math.min(w, h) / 160));
      if (mode === "gesture") {
        const boxW = Math.max(40, Math.floor(w * 0.18));
        const boxH = Math.max(40, Math.floor(h * 0.18));
        const xRaw = Math.abs(
          Math.floor(((Math.sin(time / 600) + 1) / 2) * (w - boxW)),
        );
        const x = mirror ? w - xRaw - boxW : xRaw;
        const y = Math.abs(
          Math.floor(((Math.cos(time / 700) + 1) / 2) * (h - boxH)),
        );
        ctx.strokeStyle = "rgba(56,189,248,0.9)";
        ctx.fillStyle = "rgba(56,189,248,0.08)";
        ctx.fillRect(x, y, boxW, boxH);
        ctx.strokeRect(x + 0.5, y + 0.5, boxW - 1, boxH - 1);
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.font = `${Math.max(12, Math.floor(w / 60))}px ui-sans-serif`;
        ctx.fillText(mockLabel || "Detecting...", x + 8, y + 20);
      } else {
        // lip-read: small rectangle near bottom center
        const boxW = Math.floor(w * 0.28);
        const boxH = Math.floor(h * 0.08);
        const xRaw = Math.floor((w - boxW) / 2);
        const x = mirror ? w - xRaw - boxW : xRaw;
        const y = Math.floor(h * 0.68 + Math.sin(time / 300) * 6);
        ctx.strokeStyle = "rgba(99,102,241,0.9)";
        ctx.fillStyle = "rgba(99,102,241,0.06)";
        ctx.fillRect(x, y, boxW, boxH);
        ctx.strokeRect(x + 0.5, y + 0.5, boxW - 1, boxH - 1);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.font = `${Math.max(12, Math.floor(w / 60))}px ui-sans-serif`;
        ctx.fillText(mockLabel || "Transcribing...", x + 8, y + boxH / 1.6);
      }
    };

    const loop = (t: number) => {
      framesAccRef.current++;
      framesTotalRef.current++;
      const last = lastFpsRef.current || t;
      const elapsed = t - last;
      if (elapsed >= 500) {
        const currentFps =
          Math.round((framesAccRef.current / elapsed) * 1000) || 0;
        setFps(currentFps);
        setFramesProcessed(framesTotalRef.current);
        framesAccRef.current = 0;
        lastFpsRef.current = t;
        setGpuLoad((p) =>
          Math.max(5, Math.min(98, p + Math.round((Math.random() - 0.5) * 6))),
        );
        setConfidence((c) =>
          Math.max(
            50,
            Math.min(100, c + Math.round((Math.random() - 0.5) * 6)),
          ),
        );
      }

      // sync canvas size to video if changed
      syncCanvasSize();
      drawOverlay(t);
      rafRef.current = requestAnimationFrame(loop);
    };

    if (isRecording) {
      // start mock prediction interval
      if (mode === "gesture") {
        mockInterval = window.setInterval(() => {
          const items = ["Thumbs Up", "Open Hand", "Pointing"];
          const next = items[Math.floor(Math.random() * items.length)];
          setMockLabel(next);
          setConfidence(80 + Math.round(Math.random() * 18));
        }, 900) as unknown as number;
      } else {
        const phrase = "Hello, this is a demo of VisionSpeak AI.";
        transcriptionIndexRef.current = 0;
        mockInterval = window.setInterval(() => {
          transcriptionIndexRef.current = Math.min(
            phrase.length,
            transcriptionIndexRef.current + 1,
          );
          setMockLabel(phrase.slice(0, transcriptionIndexRef.current));
          if (transcriptionIndexRef.current >= phrase.length)
            transcriptionIndexRef.current = 0;
        }, 140) as unknown as number;
      }

      // ensure canvas matches video and start loop
      setTimeout(() => {
        syncCanvasSize();
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
        rafRef.current = requestAnimationFrame(loop);
      }, 50);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (mockInterval) clearInterval(mockInterval as unknown as number);
    };
  }, [isRecording, mode, mirror]);

  return (
    <main className='min-h-screen bg-background'>
      <Navigation />

      {/* Hero */}
      <HeroSection
        badgeText='Experience VisionSpeakAI'
        title='VSpeakX 1.0 In Action'
        description='Try our AI models in real-time using your webcam. See lip-reading and gesture recognition powered by NVIDIA.'
        backgroundVariant='gradient'
      />

      {/* Call-to-Action Section */}
      <section className='px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto -mt-8 mb-12'>
        <div className='glass-effect-strong border-2 border-cyan-500/20 rounded-2xl p-8 md:p-10'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='flex-1 text-center md:text-left'>
              <h2 className='text-2xl md:text-3xl font-black uppercase mb-3 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent'>
                Ready to Analyze?
              </h2>
              <p className='text-slate-400 text-sm md:text-base'>
                {user
                  ? "Access your full analytics dashboard to monitor API usage, view insights, and manage your account."
                  : "Sign up now to access the full platform with API keys, analytics, and more powerful features."}
              </p>
            </div>
            <div className='flex flex-col sm:flex-row items-center gap-3'>
              {user ? (
                <Link
                  href='/dashboard'
                  className='px-8 py-4 text-base font-black uppercase rounded-xl glow-button flex items-center gap-2 group'
                >
                  <LayoutDashboard className='w-5 h-5' />
                  Go to Dashboard
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </Link>
              ) : (
                <>
                  <Link
                    href='/auth/signup'
                    className='px-8 py-4 text-base font-black uppercase rounded-xl glow-button flex items-center gap-2 group'
                  >
                    Start Analyzing
                    <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                  </Link>
                  <Link
                    href='/auth/login'
                    className='px-8 py-4 text-base font-bold rounded-xl border border-white/10 hover:bg-white/5 transition-colors'
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Interface */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Video Feed */}
          <div className='lg:col-span-2'>
            <div className='glass-effect rounded-2xl overflow-hidden mb-6'>
              {/* Webcam Feed */}
              <div className='relative w-full bg-black/50 aspect-video flex items-center justify-center border-2 border-cyan-500/20'>
                {isRecording ? (
                  <div className='relative w-full h-full'>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className='w-full h-full object-cover'
                      style={{ transform: mirror ? "scaleX(-1)" : undefined }}
                    />

                    <canvas
                      ref={overlayRef}
                      className='absolute inset-0 w-full h-full pointer-events-none'
                    />

                    <div className='absolute top-4 left-4 flex items-center gap-2'>
                      <button
                        onClick={captureSnapshot}
                        className='px-3 py-1 rounded-md bg-black/40 border border-white/10 text-sm flex items-center gap-2'
                      >
                        <Download className='w-4 h-4' />
                        Snapshot
                      </button>

                      <button
                        onClick={switchCamera}
                        className='px-3 py-1 rounded-md bg-black/40 border border-white/10 text-sm flex items-center gap-2'
                      >
                        <Camera className='w-4 h-4' />
                        Switch
                      </button>

                      <button
                        onClick={toggleMirror}
                        className='px-3 py-1 rounded-md bg-black/40 border border-white/10 text-sm'
                      >
                        Mirror
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='text-center'>
                    <Camera className='w-16 h-16 text-cyan-400/30 mx-auto mb-4' />
                    <p className='text-slate-400 text-sm mb-4'>
                      {cameraError
                        ? `Camera Error: ${cameraError}`
                        : 'Click "Start Demo" to enable your webcam'}
                    </p>
                    {cameraError && (
                      <p className='text-red-400 text-xs mb-4'>
                        Please check camera permissions and try again
                      </p>
                    )}
                    <button
                      onClick={toggleWebcam}
                      className='px-6 py-2 rounded-lg font-semibold transition-all border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10'
                    >
                      Start Demo
                    </button>
                  </div>
                )}
                {isRecording && (
                  <button
                    onClick={toggleWebcam}
                    className='absolute top-4 right-4 px-4 py-2 rounded-lg font-semibold glow-button'
                  >
                    Stop Demo
                  </button>
                )}
              </div>

              {/* Mode Selector */}
              <div className='flex gap-2 p-4 border-t border-white/10'>
                <button
                  onClick={() => setMode("lip-read")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    mode === "lip-read"
                      ? "glass-effect-strong border-cyan-400/50 text-white"
                      : "glass-effect text-slate-400 hover:text-white"
                  }`}
                >
                  <Camera size={18} />
                  Lip-Reading
                </button>
                <button
                  onClick={() => setMode("gesture")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    mode === "gesture"
                      ? "glass-effect-strong border-cyan-400/50 text-white"
                      : "glass-effect text-slate-400 hover:text-white"
                  }`}
                >
                  <Hand size={18} />
                  Gesture Recognition
                </button>
              </div>
            </div>

            {/* Description */}
            {mode === "lip-read" && (
              <div className='glass-effect p-6 rounded-xl'>
                <h3 className='font-bold text-white mb-2'>Lip-Reading Mode</h3>
                <p className='text-sm text-slate-400'>
                  Our AI analyzes your lip movements and converts them to text
                  in real-time. Speak naturally at any pace and watch as the
                  model transcribes your words with high accuracy.
                </p>
              </div>
            )}

            {mode === "gesture" && (
              <div className='glass-effect p-6 rounded-xl'>
                <h3 className='font-bold text-white mb-2'>
                  Gesture Recognition Mode
                </h3>
                <p className='text-sm text-slate-400'>
                  The model detects and classifies hand and body gestures in
                  real-time. Try common gestures like thumbs up, peace sign, or
                  custom hand signals.
                </p>
              </div>
            )}
          </div>

          {/* Results Sidebar */}
          <div className='flex flex-col gap-6'>
            {/* Live Results */}
            <div className='glass-effect p-6 rounded-xl'>
              <h3 className='font-bold text-white mb-4'>Live Results</h3>

              {!isRecording ? (
                <div className='space-y-3 text-center text-slate-400'>
                  <p className='text-sm'>
                    Enable your webcam to see live results
                  </p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {mode === "lip-read" ? (
                    <>
                      <div className='p-3 bg-white/5 rounded-lg'>
                        <p className='text-xs text-slate-500 mb-2'>
                          Transcription
                        </p>
                        <p className='text-cyan-300 font-mono text-sm'>
                          {mockLabel ? `"${mockLabel}"` : "Listening..."}
                        </p>
                      </div>
                      <div className='grid grid-cols-2 gap-3'>
                        <div className='p-3 bg-white/5 rounded-lg'>
                          <p className='text-xs text-slate-500'>Confidence</p>
                          <p className='text-lime-300 font-bold text-lg'>
                            {confidence}%
                          </p>
                        </div>
                        <div className='p-3 bg-white/5 rounded-lg'>
                          <p className='text-xs text-slate-500'>Latency</p>
                          <p className='text-lime-300 font-bold text-lg'>
                            {fps ? `${Math.round(1000 / fps)}ms` : "--"}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='space-y-2'>
                        {["Thumbs Up", "Open Hand", "Pointing"].map(
                          (gesture) => (
                            <div
                              key={gesture}
                              className={`flex items-center justify-between p-2 rounded ${gesture === mockLabel ? "bg-cyan-900/20 border border-cyan-400" : "bg-white/5"}`}
                            >
                              <span
                                className={`text-sm ${gesture === mockLabel ? "text-white" : "text-slate-300"}`}
                              >
                                {gesture}
                              </span>
                              <span
                                className={`font-bold text-sm ${gesture === mockLabel ? "text-cyan-300" : "text-slate-400"}`}
                              >
                                {gesture === mockLabel
                                  ? `${confidence}%`
                                  : "--"}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                      <div className='p-3 bg-white/5 rounded-lg'>
                        <p className='text-xs text-slate-500'>Latency</p>
                        <p className='text-lime-300 font-bold text-lg'>56ms</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className='glass-effect p-6 rounded-xl'>
              <h3 className='font-bold text-white mb-4 flex items-center gap-2'>
                <BarChart3 size={18} />
                Statistics
              </h3>
              <div className='space-y-3 text-sm'>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Frames Processed</span>
                  <span className='text-cyan-300 font-bold'>
                    {framesProcessed}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Avg Confidence</span>
                  <span className='text-cyan-300 font-bold'>{confidence}%</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Avg Latency</span>
                  <span className='text-cyan-300 font-bold'>
                    {fps ? `${Math.round(1000 / fps)}ms` : "--"}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>GPU Load</span>
                  <span className='text-lime-300 font-bold'>{gpuLoad}%</span>
                </div>
              </div>
            </div>

            {/* Export Button */}
            {isRecording && (
              <button className='w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg glow-button'>
                <Download size={18} />
                Export Results
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          {[
            {
              title: "Privacy First",
              description:
                "All processing happens locally in your browser. No data is stored or transmitted to our servers.",
            },
            {
              title: "NVIDIA-Powered",
              description:
                "Built on NVIDIA Metropolis framework with TensorRT optimization for sub-100ms latency. TAO-trained custom models with GPU acceleration.",
            },
            {
              title: "Production Ready",
              description:
                "Deployed via NVIDIA Triton Inference Server for enterprise-grade scalability. The same pipeline used by production customers.",
            },
          ].map((feature, index) => (
            <div key={index} className='glass-effect p-6 rounded-xl'>
              <h3 className='font-bold text-white mb-3'>{feature.title}</h3>
              <p className='text-sm text-slate-400'>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Technical Specs */}
        <div className='glass-effect p-8 rounded-xl'>
          <h3 className='font-bold text-white mb-6'>
            Technical Specifications
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[
              { label: "Model Version", value: "VisionSpeak v2.1.0" },
              { label: "Framework", value: "NVIDIA Metropolis + DeepStream" },
              { label: "Model Optimization", value: "NVIDIA TensorRT" },
              { label: "Inference Server", value: "NVIDIA Triton" },
              { label: "Custom Models", value: "TAO Toolkit Fine-tuned" },
              { label: "Frame Rate", value: "30 FPS GPU-accelerated" },
              { label: "Input Resolution", value: "1080p (adjustable)" },
              {
                label: "Supported Browsers",
                value: "Chrome, Firefox, Safari, Edge",
              },
              { label: "Minimum GPU", value: "Any GPU with WebGL 2.0" },
              {
                label: "Latency",
                value: "<100ms per frame (TensorRT optimized)",
              },
            ].map((spec, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 bg-white/5 rounded-lg'
              >
                <span className='text-slate-400'>{spec.label}</span>
                <span className='font-mono text-cyan-300 text-sm'>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto text-center glass-effect p-12 rounded-2xl'>
          <h2 className='heading-lg mb-4 text-pretty'>
            Impressed? Let's Build Together
          </h2>
          <p className='body-text mb-8'>
            Integrate VSpeakX 1.0 into your application with our
            production-grade APIs and SDKs.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a href='/developers' className='glow-button'>
              Get API Access
            </a>
            <a
              href='/pricing'
              className='px-6 py-3 font-semibold rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all'
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
