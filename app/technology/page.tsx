"use client";

import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FeatureCard } from "@/components/shared/feature-card";
import { BarChart3, Cpu, Zap, Shield, Network, Brain } from "lucide-react";
import Image from "next/image";

export default function TechnologyPage() {
  const techDetails = [
    {
      icon: (
        <Image
          src='/images/t1.webp'
          alt='Transformer icon'
          width={52}
          height={52}
        />
      ),
      title: "Vision Transformers",
      description:
        "State-of-the-art transformer models trained on 10M+ video samples with multi-language lip-reading capabilities.",
      badge: "Core Architecture",
      isHighlighted: true,
    },
    {
      icon: (
        <Image
          src='/images/t2.webp'
          alt='GPU Acceleration icon'
          width={52}
          height={52}
        />
      ),
      title: "GPU ACCELERATION",
      description:
        "Full NVIDIA acceleration stack enabling 45% faster inference on RTX and A100 GPUs with optimized memory management.",
    },
    {
      icon: (
        <Image
          src='/images/t3.webp'
          alt='Real-time Processing icon'
          width={52}
          height={52}
        />
      ),
      title: "Real-time Processing",
      description:
        "Sub-100ms latency processing for live video streams with adaptive quality based on hardware capabilities.",
      badge: "NVIDIA-Powered",
    },
    {
      icon: (
        <Image
          src='/images/t4.webp'
          alt='Edge & Cloud icon'
          width={52}
          height={52}
        />
      ),
      title: "Edge & Cloud Ready",
      description:
        "Deploy on-premises or cloud with end-to-end encryption, local processing options, and zero data retention.",
    },
    {
      icon: (
        <Image
          src='/images/t5.webp'
          alt='Multi-modal icon'
          width={52}
          height={52}
        />
      ),
      title: "Multi-Modal Learning",
      description:
        "Combines visual lip-reading with audio data for improved accuracy and robustness across environments.",
    },
    {
      icon: (
        <Image
          src='/images/t6.webp'
          alt='Adaptive Inference icon'
          width={52}
          height={52}
        />
      ),
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
        title='Precision Recognition,'
        subtitle=' Powered by VSpeakX 1.0'
        description='Experience advanced lip-reading and gesture analysis with GPU-accelerated, production-ready performance.'
        backgroundVariant='grid'
      />

      {/* Technology Stack */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>Technology Foundation</h2>
          <p className='body-text max-w-2xl mx-auto'>
            Developed on robust ML frameworks with GPU acceleration for scalable
            lip-reading and gesture analysis.
          </p>
        </div>
        <div className='mb-8'>
          <img
            src='/images/technology.webp'
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
            GPU-Accelerated Performance
          </h2>
          <p className='body-text max-w-3xl mb-10'>
            VSpeakX 1.0 is built on high-performance GPU compute. By leveraging
            GPU acceleration, it achieves unprecedented speed and efficiency in
            real-time lip-reading and gesture recognition. Models are optimized
            for a wide range of GPU hardware, from consumer-grade cards to
            enterprise accelerators and edge devices.
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
                <Image
                  src={"/images/t7.webp"}
                  width={52}
                  height={52}
                  alt='GPU Compute Optimization'
                />
              </div>
              <h3 className='text-lg font-bold text-white mb-3'>
                GPU Compute Optimization
              </h3>
              <ul className='space-y-2 text-sm text-slate-400'>
                <li className='flex gap-2'>
                  <span className='text-cyan-400'>•</span> 10000+ GPU cores
                  utilization
                </li>
                <li className='flex gap-2'>
                  <span className='text-cyan-400'>•</span> Mixed precision
                  FP16/INT8 for faster inference
                </li>
                <li className='flex gap-2'>
                  <span className='text-cyan-400'>•</span> MMemory bandwidth
                  optimized for large datasets
                </li>
              </ul>
            </div>

            {/* cuDNN */}
            <div className='glass-effect p-8 rounded-xl'>
              <div className='w-12 h-12 rounded-lg bg-lime-500/20 flex items-center justify-center mb-4'>
                <Image
                  src={"/images/t8.webp"}
                  width={52}
                  height={52}
                  alt='Neural Network Acceleration'
                />
              </div>
              <h3 className='text-lg font-bold text-white mb-3'>
                Neural Network Acceleration
              </h3>
              <ul className='space-y-2 text-sm text-slate-400'>
                <li className='flex gap-2'>
                  <span className='text-lime-400'>•</span> Optimized neural
                  operations
                </li>
                <li className='flex gap-2'>
                  <span className='text-lime-400'>•</span> Tensor-core-style
                  acceleration
                </li>
                <li className='flex gap-2'>
                  <span className='text-lime-400'>•</span> Auto-tuning for
                  maximum efficiency
                </li>
              </ul>
            </div>

            {/* Hardware */}
            <div className='glass-effect p-8 rounded-xl'>
              <div className='w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4'>
                <Image
                  src={"/images/t9.webp"}
                  width={52}
                  height={52}
                  alt='Supported GPU Hardware'
                />
              </div>
              <h3 className='text-lg font-bold text-white mb-3'>
                Supported GPU Hardware
              </h3>
              <ul className='space-y-2 text-sm text-slate-400'>
                <li className='flex gap-2'>
                  <span className='text-purple-400'>•</span>Consumer cards (RTX
                  4090/5090)
                </li>
                <li className='flex gap-2'>
                  <span className='text-purple-400'>•</span> Enterprise
                  accelerators (A100 or equivalent)
                </li>
                <li className='flex gap-2'>
                  <span className='text-purple-400'>•</span> Jetson and other
                  edge devices
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className='glass-effect p-8 md:p-12 rounded-2xl'>
          <div className='mb-6'>
            <img
              src='/images/technology_second.webp'
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
