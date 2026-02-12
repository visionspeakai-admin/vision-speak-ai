import { ReactNode } from 'react'

interface GradientTextProps {
  children: ReactNode
  className?: string
  variant?: 'cyan-purple' | 'cyan-lime' | 'lime-cyan'
}

const variants = {
  'cyan-purple':
    'bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent',
  'cyan-lime':
    'bg-gradient-to-r from-cyan-400 via-cyan-300 to-lime-300 bg-clip-text text-transparent',
  'lime-cyan':
    'bg-gradient-to-r from-lime-300 via-lime-400 to-cyan-400 bg-clip-text text-transparent',
}

export function GradientText({
  children,
  className = '',
  variant = 'cyan-purple',
}: GradientTextProps) {
  return <span className={`${variants[variant]} ${className}`}>{children}</span>
}
