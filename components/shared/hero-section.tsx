'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { StaggeredText } from '@/components/animations/staggered-text'

interface HeroSectionProps {
  badgeText?: string
  title: string
  description: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  children?: ReactNode
  backgroundVariant?: 'gradient' | 'particles' | 'grid'
}

export function HeroSection({
  badgeText,
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
  backgroundVariant = 'gradient',
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-obsidian" />
        {backgroundVariant === 'gradient' && (
          <>
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-electric/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-float" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-lime-bio/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 animate-float" style={{ animationDelay: '3s' }} />
          </>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        {badgeText && (
          <div className="inline-block mb-8 px-5 py-2 rounded-2xl glass-effect-strong animate-fade-up border-cyan-electric/20 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
            <span className="text-cyan-electric text-xs font-black uppercase tracking-[0.3em]">{badgeText}</span>
          </div>
        )}

        {/* Title */}
        <StaggeredText
          text={title}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 block animate-fade-up tracking-tighter leading-none text-white"
          staggerDelay={0.08}
          delay={0.1}
        />

        {/* Description */}
        <p
          className="body-text text-xl md:text-2xl mb-12 max-w-3xl mx-auto animate-fade-up text-white/70"
          style={{ animationDelay: '200ms' }}
        >
          {description}
        </p>

        {/* CTA Buttons */}
        {(primaryCta || secondaryCta) && (
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            {primaryCta && (
              <Link href={primaryCta.href} className="glow-button">
                {primaryCta.text}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="glow-button-secondary"
              >
                {secondaryCta.text}
              </Link>
            )}
          </div>
        )}

        {/* Custom Content */}
        {children && (
          <div className="animate-fade-up relative z-10" style={{ animationDelay: '400ms' }}>
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
