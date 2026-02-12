export function Spinner({
  size = 'md',
  variant = 'cyan',
}: {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'cyan' | 'lime'
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const colorClass = variant === 'cyan' ? 'border-cyan-500' : 'border-lime-500'

  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-2 border-slate-700 ${colorClass} border-t-2 animate-spin`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
