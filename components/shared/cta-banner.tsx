import Link from 'next/link'
import { ReactNode } from 'react'

interface CTABannerProps {
  title: string
  description?: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  icon?: ReactNode
  variant?: 'default' | 'highlight'
}

export function CTABanner({
  title,
  description,
  primaryCta,
  secondaryCta,
  icon,
  variant = 'default',
}: CTABannerProps) {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div
        className={`max-w-4xl mx-auto rounded-2xl p-12 md:p-16 ${
          variant === 'highlight'
            ? 'glass-effect-strong border border-cyan-400/30'
            : 'glass-effect border border-cyan-500/20'
        }`}
      >
        <div className="text-center">
          {icon && <div className="flex justify-center mb-6">{icon}</div>}

          <h2 className="heading-lg mb-4 text-pretty">{title}</h2>

          {description && (
            <p className="body-text max-w-2xl mx-auto mb-8">{description}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryCta.href} className="glow-button">
              {primaryCta.text}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="px-6 py-3 font-semibold rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all"
              >
                {secondaryCta.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
