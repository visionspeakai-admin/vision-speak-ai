'use client'

import { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  badge?: string
  isHighlighted?: boolean
}

export function FeatureCard({
  icon,
  title,
  description,
  badge,
  isHighlighted = false,
}: FeatureCardProps) {
  return (
    <div
      className={`relative group p-6 md:p-8 rounded-xl transition-all duration-500 ${
        isHighlighted
          ? 'glass-effect-strong border-cyan-400/50 shadow-[0_0_30px_rgba(0,242,255,0.3)]'
          : 'glass-effect hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,242,255,0.2)]'
      }`}
    >
      {/* Background Glow on Hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />

      {/* Badge */}
      {badge && (
        <div className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30">
          {badge}
        </div>
      )}

      {/* Icon */}
      <div className="mb-4 p-3 rounded-lg w-fit bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
        <div className="text-2xl md:text-3xl text-cyan-400">{icon}</div>
      </div>

      {/* Content */}
      <h3 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">
        {title}
      </h3>
      <p className="text-sm md:text-base text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
        {description}
      </p>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
