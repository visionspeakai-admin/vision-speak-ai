'use client'

import Link from 'next/link'
import { Book, Code, FileText, Video, ExternalLink } from 'lucide-react'

export default function DocumentationPage() {
  const docs = [
    {
      category: 'Getting Started',
      icon: <Book className="w-6 h-6" />,
      items: [
        { title: 'Quick Start Guide', link: '/developers', description: 'Get up and running in 5 minutes' },
        { title: 'Authentication', link: '#', description: 'Learn how to authenticate API requests' },
        { title: 'Rate Limiting', link: '#', description: 'Understanding rate limits and quotas' },
      ],
    },
    {
      category: 'API Reference',
      icon: <Code className="w-6 h-6" />,
      items: [
        {
          title: 'REST API',
          link: '/developers#api-reference',
          description: 'Complete REST API documentation',
        },
        {
          title: 'WebSocket API',
          link: '#',
          description: 'Real-time streaming API for live inference',
        },
        {
          title: 'SDKs & Libraries',
          link: '#',
          description: 'Official SDKs in 6+ languages',
        },
      ],
    },
    {
      category: 'Guides & Tutorials',
      icon: <FileText className="w-6 h-6" />,
      items: [
        {
          title: 'Lip-Reading Integration',
          link: '#',
          description: 'Step-by-step guide to integrate lip-reading',
        },
        {
          title: 'Gesture Recognition Setup',
          link: '#',
          description: 'Configure gesture recognition for your app',
        },
        {
          title: 'Webhook Configuration',
          link: '#',
          description: 'Set up webhooks for event notifications',
        },
      ],
    },
    {
      category: 'Video Tutorials',
      icon: <Video className="w-6 h-6" />,
      items: [
        {
          title: 'API Overview',
          link: '#',
          description: 'Watch a 10-minute overview of our APIs',
        },
        {
          title: 'Building Your First App',
          link: '#',
          description: 'Complete walkthrough building an app',
        },
        {
          title: 'Performance Optimization',
          link: '#',
          description: 'Tips for optimizing your integration',
        },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="heading-lg text-white mb-2">Documentation</h1>
        <p className="text-slate-400">Access comprehensive guides and API reference documentation.</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'API Docs', href: '/developers', icon: '📚' },
          { label: 'Code Examples', href: '/developers', icon: '💻' },
          { label: 'GitHub', href: '#', icon: '🐙' },
          { label: 'Community', href: '#', icon: '💬' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="glass-effect p-4 rounded-lg text-center hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all"
          >
            <div className="text-3xl mb-2">{link.icon}</div>
            <p className="font-semibold text-white text-sm">{link.label}</p>
          </a>
        ))}
      </div>

      {/* Documentation Categories */}
      <div className="space-y-8">
        {docs.map((docGroup, index) => (
          <div key={index}>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-cyan-400">{docGroup.icon}</div>
              <h2 className="text-lg font-bold text-white">{docGroup.category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {docGroup.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href={item.link}
                  className="glass-effect p-6 rounded-xl hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <ExternalLink
                      size={16}
                      className="text-slate-400 group-hover:text-cyan-400 transition-colors flex-shrink-0"
                    />
                  </div>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Search Docs */}
      <div className="glass-effect p-8 rounded-xl">
        <h3 className="font-bold text-white mb-4">Search Documentation</h3>
        <input
          type="text"
          placeholder="Search guides, API references, and tutorials..."
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
        />
      </div>

      {/* Help Section */}
      <div className="glass-effect-strong border-cyan-400/50 shadow-[0_0_30px_rgba(0,242,255,0.3)] p-8 rounded-xl">
        <h3 className="font-bold text-white mb-3">Can't find what you're looking for?</h3>
        <p className="text-slate-400 mb-4">
          Our support team is ready to help. Check out our community forums or contact support directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="#" className="px-4 py-2 rounded-lg glow-button text-sm font-semibold">
            Contact Support
          </a>
          <a
            href="#"
            className="px-4 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all text-white text-sm font-semibold text-center"
          >
            Join Community
          </a>
        </div>
      </div>
    </div>
  )
}
