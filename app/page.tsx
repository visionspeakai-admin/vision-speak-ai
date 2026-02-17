"use client";

import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FeatureCard } from "@/components/shared/feature-card";
import { MetricsDisplay } from "@/components/shared/metrics-display";
import { StaggeredText } from "@/components/animations/staggered-text";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import {
  Eye,
  Hand,
  Zap,
  Shield,
  Users,
  Cpu,
  TrendingUp,
  Lock,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Eye className='w-6 h-6' />,
      title: "Lip-reading",
      description:
        "Advanced vision transformers capture and interpret lip movements with 95% accuracy across multiple languages.",
      badge: "Primary Feature",
    },
    {
      icon: <Hand className='w-6 h-6' />,
      title: "Gesture Recognition",
      description:
        "Real-time hand and body gesture detection for intuitive, touchless interaction and control systems.",
    },
    {
      icon: <Zap className='w-6 h-6' />,
      title: "GPU Acceleration",
      description:
        "High-performance GPU processing enables sub-100ms latency for real-time recognition and analysis.",
      isHighlighted: true,
    },
    {
      icon: <Shield className='w-6 h-6' />,
      title: "Enterprise Security",
      description:
        "End-to-end encryption, SOC 2 compliance, and edge processing for sensitive data protection.",
    },
  ];

  const useCases = [
    {
      icon: <Users className='w-6 h-6' />,
      title: "Accessibility",
      description:
        "Enable speech-impaired users to communicate seamlessly with real-time captioning and text conversion.",
    },
    {
      icon: <Lock className='w-6 h-6' />,
      title: "Silent Authentication",
      description:
        "Gesture-based biometric authentication for secure, privacy-focused user verification.",
    },
    {
      icon: <Cpu className='w-6 h-6' />,
      title: "Retail Innovation",
      description:
        "Touchless kiosk interactions and gesture-driven menus for enhanced customer experiences.",
    },
    {
      icon: <TrendingUp className='w-6 h-6' />,
      title: "Research & Analytics",
      description:
        "Analyze communication patterns, engagement metrics, and behavioral data at scale.",
    },
  ];

  const metrics = [
    { value: "95", unit: "%", label: "Accuracy Rate", icon: <Eye size={20} /> },
    { value: "<100", unit: "ms", label: "Latency", icon: <Zap size={20} /> },
    { value: "40", unit: "+", label: "Languages", icon: <Users size={20} /> },
    { value: "99.9", unit: "%", label: "Uptime", icon: <Shield size={20} /> },
  ];

  return (
    <main className='min-h-screen bg-background'>
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        badgeText='AI-Powered Communication Platform'
        title='Watch the Silence Read the Motion'
        description='Advanced Lip-Reading and Gesture Recognition API to enhance accessibility, security, and human-computer interaction with VSpeakX 1.0.'
        primaryCta={{ text: "Start Building", href: "/developers" }}
        secondaryCta={{ text: "Try VSpeakX", href: "/demo" }}
        backgroundVariant='gradient'
      >
        <div className='relative w-full h-80 md:h-[450px] mx-auto mt-16 rounded-3xl glass-effect overflow-hidden group border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]'>
          {/* Background Tech Image */}
          <div className='absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700'>
            <img
              src='images/home.webp'
              alt='Cyber Tech'
              className='w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent' />
          </div>

          {/* Animated Background Scan Line */}
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-cyan-electric/20 to-transparent w-full h-1/2 -top-full animate-scan z-10' />

          <div className='relative h-full flex flex-col items-center justify-center z-20 p-8'>
            <div className='w-20 h-20 mb-6 rounded-2xl bg-cyan-electric/10 flex items-center justify-center border-2 border-cyan-electric/30 shadow-[0_0_30px_rgba(0,242,255,0.3)] backdrop-blur-md'>
              <Eye className='w-10 h-10 text-cyan-electric animate-pulse-cyan' />
            </div>
            <div className='space-y-2'>
              <p className='text-cyan-electric font-mono text-xs tracking-[0.3em] uppercase mb-1 drop-shadow-glow'>
                Neural-Link Active
              </p>
              <h3 className='text-white font-black text-2xl uppercase tracking-tighter'>
                Interactive Vision Engine
              </h3>
              <p className='text-slate-400 text-sm max-w-md mx-auto'>
                Processing real-time ocular and manual data streams for
                high-performance results.
              </p>
            </div>

            {/* Mock HUD Elements */}
            <div className='absolute top-6 left-6 text-left font-mono text-[10px] text-cyan-electric/50 space-y-1 hidden md:block'>
              <p>LATENCY: 42MS</p>
              <p>ACCURACY: 98.4%</p>
              <p>FRAME_RATE: 120FPS</p>
            </div>
            <div className='absolute bottom-6 right-6 text-right font-mono text-[10px] text-lime-bio/50 space-y-1 hidden md:block'>
              <p>NVIDIA_CUDA_READY</p>
              <p>ENCRYPTION_AES256</p>
              <p>MODEL_V4.2_STABLE</p>
            </div>
          </div>
        </div>
      </HeroSection>

      {/* AI in Action Showcase */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <ScrollReveal>
            <div className='relative rounded-2xl overflow-hidden glass-effect-strong border border-cyan-electric/20 shadow-[0_0_50px_rgba(0,242,255,0.2)]'>
              <img
                src='/images/home_second.webp'
                alt='AI Lip-Reading Technology in Action'
                className='w-full h-auto'
              />
            </div>
          </ScrollReveal>
          <div>
            <h2 className='heading-lg mb-6 text-pretty'>
              Communication Made Smarter
            </h2>
            <p className='body-text mb-6'>
              Experience real-time lip-reading and transcription with
              industry-leading{" "}
              <span className='text-cyan-electric font-bold'>95% accuracy</span>
              . Our advanced vision transformers capture and interpret lip
              movements across 40+ languages.
            </p>
            <ul className='space-y-3 text-slate-300'>
              <li className='flex gap-3'>
                <span className='text-cyan-electric'>→</span>
                <span>Real-time transcription with sub-100ms latency</span>
              </li>
              <li className='flex gap-3'>
                <span className='text-cyan-electric'>→</span>
                <span>Multi-language support for global accessibility</span>
              </li>
              <li className='flex gap-3'>
                <span className='text-cyan-electric'>→</span>
                <span>NVIDIA GPU acceleration for maximum performance</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className='py-16 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <ScrollReveal className='text-center mb-16'>
          <h2 className='heading-lg text-pretty'>
            Performance Built for{" "}
            <span className='glow-cyan uppercase'>Lip & Gesture</span> Analysis
          </h2>
          <div className='w-24 h-1 bg-lime-bio mx-auto mt-4 rounded-full' />
        </ScrollReveal>
        <div className='mb-12'>
          <img
            src='/images/home_third.webp'
            alt='Performance Analytics Dashboard'
            className='w-full max-w-5xl mx-auto rounded-2xl shadow-2xl'
          />
        </div>
        <MetricsDisplay metrics={metrics} />
      </section>

      {/* Features Section */}
      <section
        id='features'
        className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'
      >
        <ScrollReveal className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty font-black tracking-tighter'>
            CORE CAPABILITIES
          </h2>
          <p className='body-text max-w-2xl mx-auto'>
            High-precision lip-reading and gesture models trained on diverse
            datasets for scalable, low-latency deployment.
          </p>
        </ScrollReveal>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {features.map((feature, index) => (
            <FadeInUp key={index} delay={index * 0.1}>
              <FeatureCard {...feature} />
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* NVIDIA Integration Section */}
      <section className='relative py-16 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-cyan-electric/5 rounded-full blur-[120px] -z-10' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-lime-bio/5 rounded-full blur-[120px] -z-10' />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
          {/* Left Content */}
          <div>
            <h2 className='heading-lg mb-6 text-pretty font-black'>
              GPU-ACCELERATED INFERENCE
            </h2>
            <p className='body-text mb-8 text-white/80'>
              High-performance GPU acceleration enables VisionSpeakAI to deliver
              unprecedented speed and efficiency. Our models achieve{" "}
              <span className='text-cyan-electric font-bold'>
                sub-100ms latency
              </span>{" "}
              for real-time applications.
            </p>

            <div className='space-y-6 mb-10'>
              <div className='flex gap-6 items-center'>
                <div className='flex-shrink-0 w-14 h-14 rounded-2xl glass-effect flex items-center justify-center border-cyan-electric/20 shadow-lg'>
                  <Cpu className='w-7 h-7 text-cyan-electric' />
                </div>
                <div>
                  <h3 className='font-bold text-white text-lg'>
                    Parallel Processing
                  </h3>
                  <p className='text-sm text-slate-400'>
                    Optimized for maximum throughput across multiple visual data
                    streams.
                  </p>
                </div>
              </div>

              <div className='flex gap-6 items-center'>
                <div className='flex-shrink-0 w-14 h-14 rounded-2xl glass-effect flex items-center justify-center border-cyan-electric/20 shadow-lg'>
                  <Zap className='w-7 h-7 text-cyan-electric' />
                </div>
                <div>
                  <h3 className='font-bold text-white text-lg'>
                    Real-Time Processing
                  </h3>
                  <p className='text-sm text-slate-400'>
                    Low-latency inference for critical lip-reading and gesture
                    recognition.
                  </p>
                </div>
              </div>

              <div className='flex gap-6 items-center'>
                <div className='flex-shrink-0 w-14 h-14 rounded-2xl glass-effect flex items-center justify-center border-cyan-electric/20 shadow-lg'>
                  <TrendingUp className='w-7 h-7 text-cyan-electric' />
                </div>
                <div>
                  <h3 className='font-bold text-white text-lg'>
                    Scalable Architecture
                  </h3>
                  <p className='text-sm text-slate-400'>
                    Enterprise-ready deployment from edge devices to cloud
                    environments.
                  </p>
                </div>
              </div>
            </div>

            <a href='/technology' className='glow-button'>
              Explore Technology
            </a>
          </div>

          {/* Right: Stats */}
          <div className='grid grid-cols-1 gap-6'>
            <div className='relative overflow-hidden rounded-2xl'>
              <img
                src='/images/home_fourth.webp'
                alt='Neural network illustration'
                className='w-full h-40 object-cover rounded-2xl mb-4'
              />
            </div>
            <div className='card-modern border-l-4 border-cyan-electric bg-obsidian-light p-8'>
              <div className='text-4xl font-black text-cyan-electric mb-2 tracking-tighter'>
                45%
              </div>
              <p className='text-sm font-bold text-slate-400 uppercase tracking-widest'>
                Faster than CPU baseline
              </p>
            </div>
            <div className='card-modern border-l-4 border-lime-bio bg-obsidian-light p-8'>
              <div className='text-4xl font-black text-lime-bio mb-2 tracking-tighter'>
                8x
              </div>
              <p className='text-sm font-bold text-slate-400 uppercase tracking-widest'>
                Throughput improvement
              </p>
            </div>
            <div className='card-modern border-l-4 border-purple-500 bg-obsidian-light p-8'>
              <div className='text-4xl font-black text-purple-500 mb-2 tracking-tighter'>
                PHASE 2
              </div>
              <p className='text-sm font-bold text-slate-400 uppercase tracking-widest'>
                Hybrid Edge Deployment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <ScrollReveal className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>
            Real-World Applications
          </h2>
          <p className='body-text max-w-2xl mx-auto'>
            From accessibility solutions to enterprise security, VisionSpeakAI
            powers transformative applications.
          </p>
        </ScrollReveal>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12'>
          <div className='relative rounded-2xl overflow-hidden glass-effect border border-purple-500/20'>
            <img
              src='/images/home_fifth.webp'
              alt='Gesture-based Accessibility Interface'
              className='w-full h-auto'
            />
          </div>
          <div>
            <h3 className='text-2xl font-bold text-white mb-4'>
              Touchless Interaction
            </h3>
            <p className='text-slate-300 mb-4'>
              Enable intuitive gesture-based controls for accessible computing
              and touchless user interfaces. Perfect for accessibility, retail
              kiosks, and modern interaction paradigms.
            </p>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {useCases.map((useCase, index) => (
            <FadeInUp key={index} delay={index * 0.1}>
              <FeatureCard {...useCase} />
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 md:py-32 px-4 sm:px-6 lg:px-8'>
        <FadeInUp>
          <div className='max-w-4xl mx-auto text-center card-modern p-16 relative overflow-hidden group'>
            <div className='absolute inset-0 bg-gradient-to-tr from-cyan-electric/5 via-transparent to-lime-bio/5 opacity-50' />

            <h2 className='heading-lg mb-6 text-pretty font-black relative z-10'>
              READY TO TRANSFORM COMMUNICATION?
            </h2>
            <p className='body-text mb-10 text-white/70 relative z-10 max-w-2xl mx-auto'>
              Join leading enterprises leveraging VSpeakX 1.0 to create more
              accessible, secure, and innovative human experiences.
            </p>
            <div className='flex flex-col sm:flex-row gap-6 justify-center relative z-10'>
              <a href='/auth/signup' className='glow-button px-10'>
                Get API Access
              </a>
              <a href='/demo' className='glow-button-secondary px-10'>
                Watch Demo
              </a>
            </div>
          </div>
        </FadeInUp>
      </section>

      <Footer />
    </main>
  );
}
