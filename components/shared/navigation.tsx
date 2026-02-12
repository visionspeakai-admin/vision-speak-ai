'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Technology', href: '/technology' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Demo', href: '/demo' },
    { label: 'Developers', href: '/developers' },
    { label: 'Pricing', href: '/pricing' },
  ]

  return (
    <nav className="sticky top-0 z-50 glass-effect-strong border-b border-white/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 font-black text-2xl group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-electric to-cyan-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-transform group-hover:rotate-12">
              <span className="text-obsidian font-black text-sm">VS</span>
            </div>
            <span className="text-white group-hover:text-cyan-electric transition-colors hidden sm:inline tracking-tighter uppercase">VisionSpeak</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="hidden sm:inline-block px-6 py-2 font-semibold text-sm rounded-lg glow-button"
            >
              Get Started
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 animate-fade-down">
            <div className="flex flex-col gap-3 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-semibold rounded-lg glow-button mx-auto w-full text-center mt-2"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
