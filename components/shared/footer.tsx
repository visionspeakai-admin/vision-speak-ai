import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Security', href: '#' },
      { label: 'Status', href: '#' },
    ],
    Company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    Developers: [
      { label: 'Documentation', href: '/developers' },
      { label: 'API Reference', href: '/developers#api' },
      { label: 'GitHub', href: '#' },
      { label: 'Community', href: '#' },
    ],
    Legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'License', href: '#' },
    ],
  }

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <span className="text-obsidian-dark font-black text-sm">VS</span>
              </div>
              <span className="text-glow">VisionSpeak</span>
            </Link>
            <p className="text-sm text-slate-400">
              AI-powered Lip-Reading & Gesture Recognition powered by NVIDIA technology.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4 text-white">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {currentYear} VisionSpeakAI. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Status Page
            </a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">
              System Status
            </a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Send Feedback
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
