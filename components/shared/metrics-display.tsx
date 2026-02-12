interface MetricsDisplayProps {
  metrics: Array<{
    value: string | number
    label: string
    unit?: string
    icon?: React.ReactNode
  }>
}

export function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="glass-effect p-4 md:p-6 rounded-lg text-center hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300 group"
        >
          {metric.icon && (
            <div className="flex justify-center mb-3 text-cyan-400 text-2xl group-hover:scale-110 transition-transform">
              {metric.icon}
            </div>
          )}
          <div className="text-2xl md:text-3xl font-bold text-cyan-300 mb-1">
            {metric.value}
            {metric.unit && <span className="text-lg text-slate-400">{metric.unit}</span>}
          </div>
          <p className="text-xs md:text-sm text-slate-400">{metric.label}</p>
        </div>
      ))}
    </div>
  )
}
