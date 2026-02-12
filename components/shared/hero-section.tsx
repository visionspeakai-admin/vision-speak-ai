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
    <section className="relative min-h-screen flex items-center justify-center py-20 md:py-28 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        {backgroundVariant === 'gradient' && (
          <>
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
          </>
        )}
        {backgroundVariant === 'grid' && (
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 242, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        )}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        {badgeText && (
          <div className="inline-block mb-6 px-4 py-2 rounded-full glass-effect animate-fade-up">
            <span className="text-cyan-400 text-sm font-medium">{badgeText}</span>
          </div>
        )}

        {/* Title */}
        <StaggeredText
          text={title}
          className="heading-xl mb-6 block animate-fade-up"
          staggerDelay={0.08}
          delay={0.1}
        />

        {/* Description */}
        <p
          className="body-text text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          {description}
        </p>

        {/* CTA Buttons */}
        {(primaryCta || secondaryCta) && (
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-up"
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
                className="px-6 py-3 font-semibold rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              >
                {secondaryCta.text}
              </Link>
            )}
          </div>
        )}

        {/* Custom Content */}
        {children && (
          <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
