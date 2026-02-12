import { ReactNode } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  unit?: string
  change?: {
    value: number
    direction: 'up' | 'down'
  }
  icon?: ReactNode
  trend?: 'positive' | 'negative' | 'neutral'
}

export function StatsCard({
  title,
  value,
  unit,
  change,
  icon,
  trend = 'neutral',
}: StatsCardProps) {
  const trendColor = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-cyan-400',
  }

  return (
    <div className="glass-effect p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        {icon && <div className="text-cyan-400">{icon}</div>}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold text-cyan-300 mb-2">
            {value}
            {unit && <span className="text-lg text-slate-400 ml-1">{unit}</span>}
          </div>
        </div>

        {change && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trendColor[trend]}`}>
            {change.direction === 'up' ? (
              <ArrowUp size={16} />
            ) : (
              <ArrowDown size={16} />
            )}
            {change.value}%
          </div>
        )}
      </div>
    </div>
  )
}
