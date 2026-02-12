'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export function CodeBlock({ code, language = 'javascript', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-effect rounded-xl overflow-hidden border border-cyan-500/20 mb-4">
      {title && (
        <div className="px-6 py-3 bg-cyan-500/5 border-b border-cyan-500/20 flex justify-between items-center">
          <span className="text-sm font-semibold text-cyan-400">{title}</span>
          <span className="text-xs text-slate-500">{language}</span>
        </div>
      )}

      <div className="relative">
        <pre className="p-6 overflow-x-auto">
          <code className="text-slate-300 text-sm leading-relaxed font-mono">{code}</code>
        </pre>

        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 rounded-lg glass-effect hover:bg-cyan-500/20 transition-all duration-200"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} className="text-slate-400" />
          )}
        </button>
      </div>
    </div>
  )
}
