import Link from 'next/link'
import { useState } from 'react'
import { Github, Linkedin, Twitter, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { api } from '@/lib/api'
import { getRecaptchaToken } from '@/components/providers/recaptcha-provider'
import { Logo } from './logo'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isLoading) return
    setIsLoading(true)
    setStatus('idle')

    try {
      const captcha_token = await getRecaptchaToken('newsletter')
      const response = await api.post('/newsletter/subscribe', {
        email,
        captcha_token,
      })

      if (response.status === 'success') {
        setStatus('success')
        setEmail('')
      }
    } catch (error) {
      console.error('Newsletter error:', error)
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const footerLinks = {
    Product: [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/pricing' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    Developers: [
      { label: 'Documentation', href: '/developers' },
      { label: 'API Reference', href: '/developers#api' },
    ],
    Legal: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
  }

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-2 space-y-6">
            <Logo />
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              AI-powered Lip-Reading & Gesture Recognition powered by NVIDIA technology. Follow our journey.
            </p>

            <div className="pt-4">
              <h4 className="text-sm font-bold text-white mb-3">Subscribe to our newsletter</h4>
              <form onSubmit={handleSubscribe} className="relative flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-obsidian-dark rounded-lg font-bold transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </form>
              {status === 'success' && (
                <p className="text-[10px] text-lime-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  Subscription confirmed!
                </p>
              )}
              {status === 'error' && (
                <p className="text-[10px] text-red-400 mt-2">
                  Failed to subscribe. Please try again.
                </p>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/5">
                <Github size={18} className="text-slate-400 hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/5">
                <Linkedin size={18} className="text-slate-400 hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/5">
                <Twitter size={18} className="text-slate-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-bold text-xs uppercase tracking-widest mb-6 text-slate-500">{category}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
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
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
            © {currentYear} VisionSpeakAI. Engineered with NVIDIA TensorRT.
          </p>
          <div className="flex gap-6 text-[10px] text-slate-500 uppercase tracking-tighter">
            <Link href="/developers" className="hover:text-slate-300 transition-colors">Documentation</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
