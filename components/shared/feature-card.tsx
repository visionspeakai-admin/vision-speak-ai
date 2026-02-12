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
      className={`relative group p-8 rounded-2xl transition-all duration-500 overflow-hidden ${isHighlighted
          ? 'glass-effect-strong border-cyan-electric/40 bg-cyan-electric/5'
          : 'glass-effect hover:border-cyan-electric/30'
        }`}
    >
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-[80px] bg-gradient-to-br from-cyan-electric/20 via-transparent to-lime-bio/10" />

      {/* Badge */}
      {badge && (
        <div className="inline-block mb-6 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-cyan-electric bg-cyan-electric/10 border border-cyan-electric/20 shadow-[0_0_15px_rgba(0,242,255,0.1)]">
          {badge}
        </div>
      )}

      {/* Icon */}
      <div className="mb-6 w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-cyan-electric/10 flex items-center justify-center border border-white/5 group-hover:border-cyan-electric/30 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg">
        <div className="text-3xl text-cyan-electric drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]">{icon}</div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-black mb-3 text-white uppercase tracking-tight group-hover:text-cyan-electric transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed text-sm md:text-base">
        {description}
      </p>

      {/* Bottom Interactive Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-bio to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0" />
    </div>
  )
}
