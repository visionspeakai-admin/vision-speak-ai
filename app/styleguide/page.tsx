'use client'

import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'
import { HeroSection } from '@/components/shared/hero-section'
import { FeatureCard } from '@/components/shared/feature-card'
import { CodeBlock } from '@/components/shared/code-block'
import { Tabs } from '@/components/shared/tabs'
import { Accordion } from '@/components/shared/accordion'
import { Modal } from '@/components/shared/modal'
import { Spinner } from '@/components/shared/spinner'
import { GradientText } from '@/components/shared/gradient-text'
import { Zap, Eye, Hand } from 'lucide-react'
import { useState } from 'react'

export default function StyleGuidePage() {
  const [showModal, setShowModal] = useState(false)

  const accordionItems = [
    {
      id: '1',
      title: 'What is VisionSpeakAI?',
      content:
        'VisionSpeakAI is an AI-driven platform offering Lip-Reading and Gesture Recognition APIs powered by NVIDIA technology for accessibility, security, and innovation.',
    },
    {
      id: '2',
      title: 'How accurate is the lip-reading?',
      content:
        'Our lip-reading model achieves 95% accuracy across 40+ languages with sub-100ms latency on NVIDIA GPUs.',
    },
    {
      id: '3',
      title: 'What hardware do I need?',
      content:
        'You can run VisionSpeakAI on modern NVIDIA GPUs (RTX series) or on-cloud A100 GPUs for optimal performance.',
    },
  ]

  const tabItems = [
    {
      label: 'Python',
      value: 'python',
      content: (
        <CodeBlock
          code={`import visionspeakai as vs

client = vs.Client(api_key="YOUR_KEY")
result = client.lip_read(video_file)
print(result.transcription)`}
          language="python"
          title="Python Example"
        />
      ),
    },
    {
      label: 'JavaScript',
      value: 'javascript',
      content: (
        <CodeBlock
          code={`import VisionSpeakAI from 'visionspeakai';

const client = new VisionSpeakAI({
  apiKey: process.env.VS_KEY
});
const result = await client.lipRead(video);`}
          language="javascript"
          title="JavaScript Example"
        />
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <HeroSection
        title="Component Style Guide"
        description="Explore all components, patterns, and design elements used throughout VisionSpeakAI"
        badgeText="Design System"
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Colors Section */}
        <section className="mb-20">
          <h2 className="heading-lg mb-8">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-effect p-6 rounded-xl">
              <div className="w-full h-24 bg-cyan-400 rounded-lg mb-4" />
              <h3 className="font-semibold mb-1">Primary Accent</h3>
              <p className="text-sm text-slate-400">#00F2FF</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <div className="w-full h-24 bg-lime-300 rounded-lg mb-4" />
              <h3 className="font-semibold mb-1">Secondary Accent</h3>
              <p className="text-sm text-slate-400">#CCFF00</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <div className="w-full h-24 bg-slate-700 rounded-lg mb-4" />
              <h3 className="font-semibold mb-1">Muted</h3>
              <p className="text-sm text-slate-400">#475569</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <div className="w-full h-24 bg-slate-900 rounded-lg mb-4" />
              <h3 className="font-semibold mb-1">Dark Background</h3>
              <p className="text-sm text-slate-400">#050505</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-20">
          <h2 className="heading-lg mb-8">Typography</h2>
          <div className="space-y-6">
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="heading-xl mb-2">Heading Extra Large</h3>
              <p className="text-sm text-slate-400">48px, bold, tracking-tight</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="heading-lg mb-2">Heading Large</h3>
              <p className="text-sm text-slate-400">36px, bold, tracking-tight</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="heading-md mb-2">Heading Medium</h3>
              <p className="text-sm text-slate-400">28px, bold, tracking-tight</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <p className="body-text">
                This is body text. It uses the Inter font family with 16-18px size and 1.4-1.6 line
                height for optimal readability.
              </p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-20">
          <h2 className="heading-lg mb-8">Buttons</h2>
          <div className="space-y-6">
            <div className="glass-effect p-6 rounded-xl">
              <div className="flex flex-wrap gap-4">
                <button className="glow-button">Primary Button</button>
                <button className="px-6 py-3 font-semibold rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all">
                  Secondary Button
                </button>
                <button className="px-6 py-3 font-semibold rounded-lg text-slate-400 hover:text-white transition-colors">
                  Text Button
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-20">
          <h2 className="heading-lg mb-8">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<Eye className="w-6 h-6" />}
              title="Feature Card"
              description="Standard feature card with icon, title, and description text."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Highlighted Card"
              description="Feature card with highlight styling for emphasis."
              badge="Featured"
              isHighlighted={true}
            />
          </div>
        </section>

        {/* Effects */}
        <section className="mb-20">
          <h2 className="heading-lg mb-8">Visual Effects</h2>
          <div className="space-y-6">
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="font-semibold mb-4">Glassmorphic Effect</h3>
              <p className="text-slate-400">Semi-transparent background with blur effect</p>
            </div>
            <div className="glow-border p-6 rounded-xl">
              <h3 className="font-semibold mb-4 text-glow">Glow Border Effect</h3>
              <p className="text-slate-400">Border with cyan glow and inner glow</p>
            </div>
            <div className="p-6 rounded-xl">
              <h3 className="font-semibold mb-4">
                <GradientText variant="cyan-purple">Gradient Text Effect</GradientText>
              </h3>
              <p className="text-slate-400">Text with gradient color fill</p>
            </div>
          </div>
        </section>

        {/* Animations */}
        <section className="mb-20">
          <h2 className="heading-lg mb-8">Animations</h2>
          <div className="space-y-6">
            <div className="glass-effect p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-2">Spinner Animation</h3>
                  <p className="text-sm text-slate-400">Loading spinner with cyan accent</p>
                </div>
                <Spinner size="md" variant="cyan" />
              </div>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="font-semibold mb-4">Scroll Animations</h3>
              <p className="text-slate-400 mb-4">
                Elements animate in as you scroll: fade-in-up, staggered-text, scroll-reveal
              </p>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-20">
          <h2 className="heading-lg mb-8">Tabs</h2>
          <div className="glass-effect p-6 rounded-xl">
            <Tabs items={tabItems} defaultValue="python" />
          </div>
        </section>

        {/* Accordion */}
        <section className="mb-20">
          <h2 className="heading-lg mb-8">Accordion</h2>
          <Accordion items={accordionItems} />
        </section>

        {/* Modal */}
        <section className="mb-20">
          <h2 className="heading-lg mb-8">Modal</h2>
          <button onClick={() => setShowModal(true)} className="glow-button">
            Open Modal
          </button>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Modal Example"
          >
            <p className="text-slate-300 mb-4">
              This is a modal dialog component. It displays content in an overlay with a backdrop.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 font-semibold rounded-lg border border-cyan-500/30 hover:bg-cyan-400/10 transition-all"
            >
              Close
            </button>
          </Modal>
        </section>

        {/* Usage Examples */}
        <section className="mb-20">
          <h2 className="heading-lg mb-8">Component Usage</h2>
          <div className="glass-effect p-6 rounded-xl">
            <h3 className="font-semibold mb-4">Feature Card Example</h3>
            <CodeBlock
              code={`<FeatureCard
  icon={<Eye className="w-6 h-6" />}
  title="Lip-Reading AI"
  description="Advanced vision transformers..."
  badge="Primary Feature"
/>`}
              language="jsx"
              title="JSX"
            />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
