"use client";

import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { CodeBlock } from "@/components/shared/code-block";
import { APIReference } from "@/components/shared/api-reference";
import { Tabs } from "@/components/shared/tabs";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Code, Book, Github, Zap, FileJson, Cpu } from "lucide-react";

export default function DevelopersPage() {
  const quickStart = [
    {
      step: 1,
      title: "Get API Key",
      description:
        "Sign up and generate your API key from the dashboard in under 60 seconds.",
      code: "VS_KEY_abc123xyz789",
    },
    {
      step: 2,
      title: "Install SDK",
      description:
        "Add our SDK to your project with your preferred package manager.",
      code: "npm install visionspeakai",
    },
    {
      step: 3,
      title: "Start Inference",
      description: "Call our APIs with just a few lines of code.",
      code: "const result = await vs.lipRead(videoFrame);",
    },
  ];

  const endpoints = [
    {
      name: "Lip Reading",
      path: "/api/v1/lip-read",
      method: "POST",
      description:
        "Analyze lip movements and generate transcriptions from video input.",
      params: ["video_stream", "language", "confidence_threshold"],
    },
    {
      name: "Gesture Recognition",
      path: "/api/v1/gestures",
      method: "POST",
      description:
        "Detect and classify hand/body gestures from video or depth data.",
      params: ["video_stream", "gesture_set", "return_coordinates"],
    },
    {
      name: "Real-time Stream",
      path: "/api/v1/stream",
      method: "WebSocket",
      description:
        "Continuous gesture and lip-reading detection from live video streams.",
      params: ["video_stream", "models", "inference_speed"],
    },
  ];

  const codeExamples = [
    {
      language: "Python",
      code: `import visionspeakai as vs

client = vs.Client(api_key="VS_KEY_...")

# Lip-reading from video
with open("video.mp4", "rb") as f:
    result = client.lip_read(
        video=f,
        language="en",
        confidence=0.85
    )
    print(result.transcription)

# Gesture recognition
gestures = client.recognize_gestures(
    video=f,
    gesture_set="hand_commands"
)
for gesture in gestures:
    print(f"{gesture.name} - {gesture.confidence}")`,
    },
    {
      language: "JavaScript",
      code: `import VisionSpeakAI from 'visionspeakai';

const client = new VisionSpeakAI({
  apiKey: process.env.VS_API_KEY
});

// Real-time gesture detection
const stream = await client.createStream();
stream.on('gesture', (gesture) => {
  console.log(
    \`Detected: \${gesture.name} (\${gesture.confidence})\`
  );
});

// Start video stream
const video = document.getElementById('video');
stream.setInput(video);`,
    },
    {
      language: "cURL",
      code: `curl -X POST https://api.visionspeakai.com/v1/lip-read \\
  -H "Authorization: Bearer VS_KEY_..." \\
  -H "Content-Type: application/octet-stream" \\
  --data-binary @video.mp4

# Response
{
  "transcription": "Hello, this is a test",
  "confidence": 0.97,
  "language": "en",
  "duration_ms": 2450,
  "tokens": 6
}`,
    },
  ];

  const resources = [
    {
      icon: <Book />,
      title: "API Reference",
      description: "Complete endpoint documentation",
      link: "#api-reference",
    },
    {
      icon: <Code />,
      title: "Code Examples",
      description: "Working examples in 5+ languages",
      link: "#",
    },
    {
      icon: <Zap />,
      title: "Quick Start",
      description: "5-minute setup guide",
      link: "#",
    },
  ];

  return (
    <main className='min-h-screen bg-background'>
      <Navigation />

      {/* Hero */}
      <HeroSection
        badgeText='Developer Documentation'
        title='Build with VisionSpeakAI'
        description='Comprehensive APIs and SDKs to integrate lip-reading and gesture recognition into your applications.'
        primaryCta={{ text: "Get API Key", href: "/auth/login" }}
        secondaryCta={{ text: "View Docs", href: "#api-reference" }}
        backgroundVariant='gradient'
      />

      {/* Quick Start Section */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>
            Get Started in 3 Steps
          </h2>
          <p className='body-text max-w-2xl mx-auto'>
            From signup to first API call in less than 5 minutes.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {quickStart.map((item) => (
            <div key={item.step} className='glass-effect p-8 rounded-xl'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center font-bold text-cyan-300'>
                  {item.step}
                </div>
                <h3 className='font-bold text-white'>{item.title}</h3>
              </div>
              <p className='text-sm text-slate-400 mb-4'>{item.description}</p>
              <div className='bg-black/30 p-3 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto'>
                {item.code}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-8 rounded-2xl overflow-hidden glass-effect p-0'>
          <img
            src='/images/dev.webp'
            alt='Developer workspace'
            className='w-full h-56 object-cover rounded-2xl'
          />
        </div>
      </section>

      {/* API Endpoints */}
      <section
        id='api-reference'
        className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'
      >
        <div className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>API Reference</h2>
          <p className='body-text max-w-2xl mx-auto'>
            Our REST and WebSocket APIs deliver real-time AI inference at scale.
          </p>
        </div>

        <div className='mb-8 rounded-2xl overflow-hidden'>
          <img
            src='/images/dev_2.webp'
            alt='API architecture'
            className='w-full h-44 object-cover rounded-2xl shadow-md'
          />
        </div>

        <div className='space-y-6'>
          {endpoints.map((endpoint, index) => (
            <div key={index} className='glass-effect p-8 rounded-xl'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4'>
                <div>
                  <h3 className='text-lg font-bold text-white mb-2'>
                    {endpoint.name}
                  </h3>
                  <p className='text-sm text-slate-400'>
                    {endpoint.description}
                  </p>
                </div>
                <div className='flex gap-2'>
                  <span
                    className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                      endpoint.method === "POST"
                        ? "bg-green-500/20 text-green-400"
                        : endpoint.method === "WebSocket"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                </div>
              </div>

              <div className='bg-black/20 p-4 rounded-lg mb-6'>
                <code className='text-sm font-mono text-cyan-300'>
                  {endpoint.path}
                </code>
              </div>

              <div>
                <p className='text-xs font-semibold text-slate-400 mb-3'>
                  Parameters:
                </p>
                <div className='flex flex-wrap gap-2'>
                  {endpoint.params.map((param, idx) => (
                    <span
                      key={idx}
                      className='px-3 py-1 rounded-full text-xs bg-white/5 text-slate-300 border border-white/10'
                    >
                      {param}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Code Examples */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>Code Examples</h2>
          <p className='body-text max-w-2xl mx-auto'>
            Ready-to-use examples in your favorite languages.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8'>
          {codeExamples.map((example, index) => (
            <div
              key={index}
              className='glass-effect rounded-xl overflow-hidden'
            >
              <div className='flex items-center justify-between p-4 border-b border-white/10'>
                <span className='font-mono font-bold text-cyan-300'>
                  {example.language}
                </span>
                <button className='text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors text-slate-300'>
                  Copy
                </button>
              </div>
              <div className='p-6 overflow-x-auto'>
                <pre className='text-xs md:text-sm font-mono text-slate-300 leading-relaxed'>
                  <code>{example.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>Developer Resources</h2>
          <p className='body-text max-w-2xl mx-auto'>
            Everything you need to build and deploy with VisionSpeakAI.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className='glass-effect p-6 rounded-xl hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,242,255,0.2)] transition-all group cursor-pointer'
            >
              <div className='w-12 h-12 rounded-lg bg-white/5 group-hover:bg-cyan-500/10 flex items-center justify-center mb-4 text-cyan-400 transition-colors text-xl'>
                {resource.icon}
              </div>
              <h3 className='font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors'>
                {resource.title}
              </h3>
              <p className='text-sm text-slate-400'>{resource.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* SDKs */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>Official SDKs</h2>
          <p className='body-text max-w-2xl mx-auto'>
            Download our official SDKs with built-in support for NVIDIA
            acceleration.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[
            { name: "Python", version: "1.2.0", downloads: "50K+" },
            {
              name: "JavaScript/TypeScript",
              version: "1.2.0",
              downloads: "35K+",
            },
            { name: "Go", version: "1.1.5", downloads: "12K+" },
            { name: "C++", version: "1.0.8", downloads: "8K+" },
            { name: "Java", version: "1.1.2", downloads: "6K+" },
            { name: "Rust", version: "0.9.5", downloads: "3K+" },
          ].map((sdk, index) => (
            <div
              key={index}
              className='glass-effect p-6 rounded-xl flex flex-col justify-between'
            >
              <div className='mb-4'>
                <h3 className='font-bold text-white mb-2'>{sdk.name}</h3>
                <p className='text-xs text-slate-400'>v{sdk.version}</p>
              </div>
              <div>
                <p className='text-xs text-slate-500 mb-4'>
                  {sdk.downloads} weekly downloads
                </p>
                <div className='flex items-center justify-between gap-3'>
                  <span className='inline-flex items-center px-3 py-1 rounded-full bg-white/5 text-xs font-semibold text-slate-300 border border-white/5'>
                    Coming soon
                  </span>
                  <button
                    disabled
                    className='w-36 px-4 py-2 rounded-lg text-sm font-semibold border border-white/10 bg-white/5 text-slate-400 opacity-60 cursor-not-allowed'
                  >
                    Coming soon
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support CTA */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto text-center glass-effect p-12 rounded-2xl'>
          <h2 className='heading-lg mb-4 text-pretty'>Need Help?</h2>
          <p className='body-text mb-8'>
            Our developer community and support team are here to help you
            succeed.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a href='#' className='glow-button'>
              Join Community
            </a>
            <a
              href='#'
              className='px-6 py-3 font-semibold rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all'
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
