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
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import Link from "next/link";

export default function DemoPage() {
  const [mode, setMode] = useState<"lip-read" | "gesture">("lip-read");
  const [isRecording, setIsRecording] = useState(false);
  const { user } = useAuth();

  return (
    <main className='min-h-screen bg-background'>
      <Navigation />

      {/* Hero */}
      <HeroSection
        badgeText='Interactive Demo'
        title='Experience VisionSpeakAI in Action'
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
              {/* Webcam Placeholder */}
              <div className='relative w-full bg-black/50 aspect-video flex items-center justify-center border-2 border-cyan-500/20'>
                <div className='text-center'>
                  <Camera className='w-16 h-16 text-cyan-400/30 mx-auto mb-4' />
                  <p className='text-slate-400 text-sm mb-4'>
                    Click "Start Demo" to enable your webcam
                  </p>
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      isRecording
                        ? "glow-button"
                        : "border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10"
                    }`}
                  >
                    {isRecording ? "Stop Demo" : "Start Demo"}
                  </button>
                </div>
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
                          "Hello, this is a demo of..."
                        </p>
                      </div>
                      <div className='grid grid-cols-2 gap-3'>
                        <div className='p-3 bg-white/5 rounded-lg'>
                          <p className='text-xs text-slate-500'>Confidence</p>
                          <p className='text-lime-300 font-bold text-lg'>
                            94.2%
                          </p>
                        </div>
                        <div className='p-3 bg-white/5 rounded-lg'>
                          <p className='text-xs text-slate-500'>Latency</p>
                          <p className='text-lime-300 font-bold text-lg'>
                            78ms
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
                              className='flex items-center justify-between p-2 bg-white/5 rounded'
                            >
                              <span className='text-sm text-slate-300'>
                                {gesture}
                              </span>
                              <span className='text-cyan-300 font-bold text-sm'>
                                92%
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
                  <span className='text-cyan-300 font-bold'>142</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Avg Confidence</span>
                  <span className='text-cyan-300 font-bold'>91.7%</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Avg Latency</span>
                  <span className='text-cyan-300 font-bold'>74ms</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>GPU Load</span>
                  <span className='text-lime-300 font-bold'>45%</span>
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
                "Experience sub-100ms latency with GPU acceleration. Works on most modern devices.",
            },
            {
              title: "Production Ready",
              description:
                "The same models used by our enterprise customers. Try before you integrate.",
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
              { label: "Input Resolution", value: "1080p (adjustable)" },
              { label: "Frame Rate", value: "30 FPS" },
              {
                label: "Supported Browsers",
                value: "Chrome, Firefox, Safari, Edge",
              },
              { label: "Minimum GPU", value: "Any GPU with WebGL 2.0" },
              { label: "Latency", value: "<100ms per frame" },
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
            Integrate VisionSpeakAI into your application with our
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
