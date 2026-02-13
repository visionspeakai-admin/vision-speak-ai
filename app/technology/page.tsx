"use client";

import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FeatureCard } from "@/components/shared/feature-card";
import { BarChart3, Cpu, Zap, Shield, Network, Brain } from "lucide-react";

export default function TechnologyPage() {
  const techDetails = [
    {
      icon: <Brain className='w-6 h-6' />,
      title: "Vision Transformers",
      description:
        "State-of-the-art transformer models trained on 10M+ video samples with multi-language lip-reading capabilities.",
      badge: "Core Architecture",
      isHighlighted: true,
    },
    {
      icon: <Cpu className='w-6 h-6' />,
      title: "NVIDIA CUDA/cuDNN",
      description:
        "Full NVIDIA acceleration stack enabling 45% faster inference on RTX and A100 GPUs with optimized memory management.",
    },
    {
      icon: <Zap className='w-6 h-6' />,
      title: "Real-time Processing",
      description:
        "Sub-100ms latency processing for live video streams with adaptive quality based on hardware capabilities.",
      badge: "NVIDIA-Powered",
    },
    {
      icon: <Shield className='w-6 h-6' />,
      title: "Edge & Cloud Ready",
      description:
        "Deploy on-premises or cloud with end-to-end encryption, local processing options, and zero data retention.",
    },
    {
      icon: <Network className='w-6 h-6' />,
      title: "Multi-Modal Learning",
      description:
        "Combines visual lip-reading with audio data for improved accuracy and robustness across environments.",
    },
    {
      icon: <BarChart3 className='w-6 h-6' />,
      title: "Adaptive Inference",
      description:
        "Model quantization and pruning for edge devices with 99.2% accuracy retention on mobile hardware.",
    },
  ];

  const benchmarks = [
    {
      metric: "Accuracy",
      value: "95.3%",
      comparison: "vs 78% baseline",
      color: "text-green-400",
    },
    {
      metric: "Latency",
      value: "<100ms",
      comparison: "on RTX 3090",
      color: "text-cyan-400",
    },
    {
      metric: "Throughput",
      value: "240 FPS",
      comparison: "per GPU with batching",
      color: "text-lime-400",
    },
    {
      metric: "Languages",
      value: "40+",
      comparison: "supported languages",
      color: "text-purple-400",
    },
  ];

  return (
    <main className='min-h-screen bg-background'>
      <Navigation />

      {/* Hero */}
      <HeroSection
        badgeText='Technology & Architecture'
        title='Cutting-Edge AI Meets NVIDIA Performance'
        description="Deep dive into the neural networks and GPU acceleration powering VisionSpeakAI's industry-leading accuracy and speed."
        backgroundVariant='grid'
      />

      {/* Technology Stack */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>Technology Foundation</h2>
          <p className='body-text max-w-2xl mx-auto'>
            Built with cutting-edge machine learning frameworks and NVIDIA GPU
            acceleration.
          </p>
        </div>
        <div className='mb-8'>
          <img
            src='/images/neural_net_abstract_1770976031098.png'
            alt='Model architecture illustration'
            className='w-full rounded-2xl shadow-lg'
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {techDetails.map((tech, index) => (
            <FeatureCard key={index} {...tech} />
          ))}
        </div>
      </section>

      {/* NVIDIA Deep Dive Section (Primary Focus) */}
      <section className='relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden'>
        <div className='absolute top-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl -z-10' />
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl -z-10' />

        <div className='mb-12'>
          <div className='inline-block mb-4 px-4 py-2 rounded-full glass-effect'>
            <span className='text-cyan-400 text-sm font-semibold'>
              Primary Integration
            </span>
          </div>
          <h2 className='heading-lg mb-6 text-pretty'>
            NVIDIA GPU Acceleration
          </h2>
          <p className='body-text max-w-3xl mb-10'>
            VisionSpeakAI's performance foundation is built on NVIDIA's CUDA and
            cuDNN technology stack. By leveraging GPU compute capabilities, we
            achieve unprecedented speed and efficiency in real-time AI
            inference. Our models are optimized for NVIDIA's full range of GPUs,
            from consumer RTX cards to enterprise A100 accelerators.
          </p>

          {/* Benchmark Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12'>
            {benchmarks.map((bench, index) => (
              <div
                key={index}
                className='glass-effect p-6 rounded-xl text-center'
              >
                <p className='text-sm text-slate-400 mb-2'>{bench.metric}</p>
                <p
                  className={`text-3xl md:text-4xl font-bold ${bench.color} mb-2`}
                >
                  {bench.value}
                </p>
                <p className='text-xs text-slate-500'>{bench.comparison}</p>
              </div>
            ))}
          </div>

          {/* NVIDIA Details Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
            {/* CUDA */}
            <div className='glass-effect p-8 rounded-xl'>
              <div className='w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4'>
                <Cpu className='w-6 h-6 text-cyan-400' />
              </div>
              <h3 className='text-lg font-bold text-white mb-3'>
                CUDA Compute
              </h3>
              <ul className='space-y-2 text-sm text-slate-400'>
                <li className='flex gap-2'>
                  <span className='text-cyan-400'>•</span> 10000+ CUDA cores
                  utilization
                </li>
                <li className='flex gap-2'>
                  <span className='text-cyan-400'>•</span> Mixed precision
                  FP16/INT8
                </li>
                <li className='flex gap-2'>
                  <span className='text-cyan-400'>•</span> Memory bandwidth
                  optimized
                </li>
              </ul>
            </div>

            {/* cuDNN */}
            <div className='glass-effect p-8 rounded-xl'>
              <div className='w-12 h-12 rounded-lg bg-lime-500/20 flex items-center justify-center mb-4'>
                <Zap className='w-6 h-6 text-lime-400' />
              </div>
              <h3 className='text-lg font-bold text-white mb-3'>
                cuDNN Library
              </h3>
              <ul className='space-y-2 text-sm text-slate-400'>
                <li className='flex gap-2'>
                  <span className='text-lime-400'>•</span> Optimized neural ops
                </li>
                <li className='flex gap-2'>
                  <span className='text-lime-400'>•</span> Tensor Cores
                  acceleration
                </li>
                <li className='flex gap-2'>
                  <span className='text-lime-400'>•</span> Auto-tuning
                  capabilities
                </li>
              </ul>
            </div>

            {/* Hardware */}
            <div className='glass-effect p-8 rounded-xl'>
              <div className='w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4'>
                <Shield className='w-6 h-6 text-purple-400' />
              </div>
              <h3 className='text-lg font-bold text-white mb-3'>
                GPU Hardware
              </h3>
              <ul className='space-y-2 text-sm text-slate-400'>
                <li className='flex gap-2'>
                  <span className='text-purple-400'>•</span> RTX 3090/4090
                  supported
                </li>
                <li className='flex gap-2'>
                  <span className='text-purple-400'>•</span> A100 enterprise
                  grade
                </li>
                <li className='flex gap-2'>
                  <span className='text-purple-400'>•</span> Jetson edge devices
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className='glass-effect p-8 md:p-12 rounded-2xl'>
          <div className='mb-6'>
            <img
              src='/images/gpu_performance_comparison_1770976140955.png'
              alt='GPU vs CPU performance'
              className='w-full rounded-xl object-cover max-h-48'
            />
          </div>
          <h3 className='text-xl font-bold text-white mb-6'>
            CPU vs GPU Performance
          </h3>
          <div className='space-y-4'>
            {[
              {
                name: "Inference Latency",
                cpu: "450ms",
                gpu: "78ms",
                improvement: "5.8x faster",
              },
              {
                name: "Batch Throughput",
                cpu: "8 FPS",
                gpu: "240 FPS",
                improvement: "30x increase",
              },
              {
                name: "Power Consumption",
                cpu: "180W",
                gpu: "250W",
                improvement: "30% efficient",
              },
              {
                name: "Cost per Inference",
                cpu: "€0.042",
                gpu: "€0.006",
                improvement: "7x cheaper",
              },
            ].map((comp, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-4 bg-white/5 rounded-lg'
              >
                <div className='flex-1'>
                  <p className='font-semibold text-white mb-1'>{comp.name}</p>
                  <div className='flex gap-4 text-sm'>
                    <span className='text-slate-400'>CPU: {comp.cpu}</span>
                    <span className='text-cyan-400 font-semibold'>
                      GPU: {comp.gpu}
                    </span>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-lime-400 font-bold'>{comp.improvement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training & Data Section */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='heading-lg mb-6 text-pretty'>
              Model Training & Data
            </h2>
            <p className='body-text mb-6'>
              Our models are trained on a diverse, carefully curated dataset of
              10+ million video samples covering various demographics, lighting
              conditions, and languages. This ensures robust performance across
              real-world scenarios.
            </p>
            <div className='space-y-4'>
              {[
                { label: "Training Samples", value: "10M+" },
                { label: "Demographic Coverage", value: "95 countries" },
                { label: "Languages Supported", value: "40+" },
                { label: "Model Parameters", value: "2.7B" },
              ].map((item, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-4 glass-effect rounded-lg'
                >
                  <span className='text-slate-300'>{item.label}</span>
                  <span className='font-bold text-cyan-300'>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='glass-effect p-8 md:p-12 rounded-2xl'>
            <h3 className='text-lg font-bold text-white mb-6'>
              Model Architecture
            </h3>
            <code className='text-xs md:text-sm text-slate-300 font-mono leading-relaxed block'>
              {`Vision Transformer (ViT) Backbone
├── Patch Embedding (16x16)
├── Positional Encoding
└── Multi-Head Attention (24 heads)
    ├── Query/Key/Value Projections
    ├── Scaled Dot-Product Attention
    └── Feed-Forward Networks (4x width)

Temporal Modeling
├── Recurrent LSTM Layer
├── Bidirectional Processing
└── Attention Pooling

Classification Head
├── 3-layer MLP (2.7B params)
├── Dropout (0.1) regularization
└── Softmax Output (95% accuracy)`}
            </code>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>System Requirements</h2>
          <p className='body-text max-w-2xl mx-auto'>
            VisionSpeakAI supports a range of deployment scenarios from edge
            computing to cloud-scale inference.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Minimum */}
          <div className='glass-effect p-8 rounded-xl'>
            <h3 className='text-lg font-bold text-white mb-6'>Minimum</h3>
            <ul className='space-y-3 text-sm text-slate-400'>
              <li className='flex gap-3'>
                <span className='text-cyan-400'>→</span>
                <span>GPU: RTX 2080 or equiv</span>
              </li>
              <li className='flex gap-3'>
                <span className='text-cyan-400'>→</span>
                <span>VRAM: 6GB</span>
              </li>
              <li className='flex gap-3'>
                <span className='text-cyan-400'>→</span>
                <span>Latency: ~200ms</span>
              </li>
              <li className='flex gap-3'>
                <span className='text-cyan-400'>→</span>
                <span>Throughput: 30 FPS</span>
              </li>
            </ul>
          </div>

          {/* Recommended */}
          <div className='glass-effect-strong border-cyan-400/50 shadow-[0_0_30px_rgba(0,242,255,0.3)] p-8 rounded-xl'>
            <div className='inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'>
              Recommended
            </div>
            <h3 className='text-lg font-bold text-white mb-6'>Production</h3>
            <ul className='space-y-3 text-sm text-slate-400'>
              <li className='flex gap-3'>
                <span className='text-lime-400'>→</span>
                <span>GPU: RTX 3090 / A100</span>
              </li>
              <li className='flex gap-3'>
                <span className='text-lime-400'>→</span>
                <span>VRAM: 24GB</span>
              </li>
              <li className='flex gap-3'>
                <span className='text-lime-400'>→</span>
                <span>Latency: 78ms avg</span>
              </li>
              <li className='flex gap-3'>
                <span className='text-lime-400'>→</span>
                <span>Throughput: 240 FPS</span>
              </li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className='glass-effect p-8 rounded-xl'>
            <h3 className='text-lg font-bold text-white mb-6'>Enterprise</h3>
            <ul className='space-y-3 text-sm text-slate-400'>
              <li className='flex gap-3'>
                <span className='text-purple-400'>→</span>
                <span>GPU: A100 Multi-GPU</span>
              </li>
              <li className='flex gap-3'>
                <span className='text-purple-400'>→</span>
                <span>VRAM: 80GB+ total</span>
              </li>
              <li className='flex gap-3'>
                <span className='text-purple-400'>→</span>
                <span>Latency: &lt;50ms</span>
              </li>
              <li className='flex gap-3'>
                <span className='text-purple-400'>→</span>
                <span>Throughput: 1000+ FPS</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto text-center glass-effect p-12 rounded-2xl'>
          <h2 className='heading-lg mb-4 text-pretty'>
            Ready for Production Deployment?
          </h2>
          <p className='body-text mb-8'>
            Access our comprehensive API documentation and deployment guides to
            get started today.
          </p>
          <a href='/developers' className='inline-block glow-button'>
            View API Documentation
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
