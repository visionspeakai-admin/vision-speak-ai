'use client'

import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'
import { HeroSection } from '@/components/shared/hero-section'
import { FeatureCard } from '@/components/shared/feature-card'
import { MetricsDisplay } from '@/components/shared/metrics-display'
import { StaggeredText } from '@/components/animations/staggered-text'
import { FadeInUp } from '@/components/animations/fade-in-up'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { Eye, Hand, Zap, Shield, Users, Cpu, TrendingUp, Lock } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Lip-Reading AI',
      description: 'Advanced vision transformers capture and interpret lip movements with 95% accuracy across multiple languages.',
      badge: 'Primary Feature',
    },
    {
      icon: <Hand className="w-6 h-6" />,
      title: 'Gesture Recognition',
      description: 'Real-time hand and body gesture detection for intuitive, touchless interaction and control systems.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'GPU Acceleration',
      description: 'Powered by NVIDIA CUDA technology for sub-100ms latency processing on RTX and A100 hardware.',
      badge: 'NVIDIA-Enabled',
      isHighlighted: true,
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Enterprise Security',
      description: 'End-to-end encryption, SOC 2 compliance, and edge processing for sensitive data protection.',
    },
  ]

  const useCases = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Accessibility',
      description: 'Enable speech-impaired users to communicate seamlessly with real-time captioning and text conversion.',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Silent Authentication',
      description: 'Gesture-based biometric authentication for secure, privacy-focused user verification.',
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'Retail Innovation',
      description: 'Touchless kiosk interactions and gesture-driven menus for enhanced customer experiences.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Research & Analytics',
      description: 'Analyze communication patterns, engagement metrics, and behavioral data at scale.',
    },
  ]

  const metrics = [
    { value: '95', unit: '%', label: 'Accuracy Rate', icon: <Eye size={20} /> },
    { value: '<100', unit: 'ms', label: 'Latency', icon: <Zap size={20} /> },
    { value: '40', unit: '+', label: 'Languages', icon: <Users size={20} /> },
    { value: '99.9', unit: '%', label: 'Uptime', icon: <Shield size={20} /> },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        badgeText="AI-Powered Communication Platform"
        title="See What Others Say. Understand What Others Show."
        description="Revolutionary Lip-Reading and Gesture Recognition API powered by NVIDIA technology. Transform accessibility, security, and human-computer interaction."
        primaryCta={{ text: 'Start Building', href: '/developers' }}
        secondaryCta={{ text: 'Watch Demo', href: '/demo' }}
        backgroundVariant="gradient"
      >
        <div className="relative w-full h-80 md:h-96 mx-auto mt-12 rounded-lg card-modern overflow-hidden flex items-center justify-center">
          {/* Placeholder for interactive visualization */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
              <Eye className="w-10 h-10 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm">Interactive AI Visualization</p>
          </div>
        </div>
      </HeroSection>

      {/* Metrics Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="heading-lg text-pretty">Performance Built on NVIDIA Excellence</h2>
        </ScrollReveal>
        <MetricsDisplay metrics={metrics} />
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="heading-lg mb-4 text-pretty">Core Capabilities</h2>
          <p className="body-text max-w-2xl mx-auto">
            State-of-the-art AI models trained on diverse datasets, optimized for production environments.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FadeInUp key={index} delay={index * 0.1}>
              <FeatureCard {...feature} />
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* NVIDIA Integration Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full glass-effect">
              <span className="text-cyan-400 text-sm font-semibold">Powered by NVIDIA</span>
            </div>
            <h2 className="heading-lg mb-6 text-pretty">GPU-Accelerated Inference</h2>
            <p className="body-text mb-6">
              Leveraging NVIDIA CUDA and cuDNN technology, VisionSpeakAI delivers unprecedented performance. Our models run on modern NVIDIA GPUs including RTX series and A100 data center GPUs, achieving sub-100ms latency for real-time applications.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg card-modern border-border flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">CUDA Acceleration</h3>
                  <p className="text-sm text-muted-foreground">Parallel processing for optimal throughput</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg card-modern border-border flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Real-time Processing</h3>
                  <p className="text-sm text-muted-foreground">Sub-100ms latency on supported hardware</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg card-modern border-border flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Scalable Architecture</h3>
                  <p className="text-sm text-muted-foreground">From edge to cloud deployment options</p>
                </div>
              </div>
            </div>

            <a href="/technology" className="inline-block glow-button">
              Explore Technology
            </a>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-1 gap-4">
            <div className="card-modern border-l-4 border-primary">
              <div className="text-3xl font-bold text-primary mb-2">45%</div>
              <p className="text-sm text-muted-foreground">Faster than CPU baseline</p>
            </div>
            <div className="card-modern border-l-4 border-lime-400">
              <div className="text-3xl font-bold text-lime-400 mb-2">8x</div>
              <p className="text-sm text-muted-foreground">Throughput improvement with NVIDIA</p>
            </div>
            <div className="card-modern border-l-4 border-purple-400">
              <div className="text-3xl font-bold text-purple-400 mb-2">60%</div>
              <p className="text-sm text-muted-foreground">Energy efficiency gain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="heading-lg mb-4 text-pretty">Real-World Applications</h2>
          <p className="body-text max-w-2xl mx-auto">
            From accessibility solutions to enterprise security, VisionSpeakAI powers transformative applications.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <FadeInUp key={index} delay={index * 0.1}>
              <FeatureCard {...useCase} />
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="max-w-3xl mx-auto text-center card-modern p-12">
            <h2 className="heading-lg mb-4 text-pretty">Ready to Transform Communication?</h2>
            <p className="body-text mb-8">
              Join enterprises leveraging AI to create accessible, secure, and innovative experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/developers" className="glow-button">
                Get API Access
              </a>
              <a
                href="#"
                className="px-6 py-3 font-semibold rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 text-foreground transition-all"
              >
                Schedule Demo
              </a>
            </div>
          </div>
        </FadeInUp>
      </section>

      <Footer />
    </main>
  )
}
