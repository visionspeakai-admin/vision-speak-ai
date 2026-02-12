'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ReactNode } from 'react'

export interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenIds = new Set(openIds)

    if (newOpenIds.has(id)) {
      newOpenIds.delete(id)
    } else {
      if (!allowMultiple) {
        newOpenIds.clear()
      }
      newOpenIds.add(id)
    }

    setOpenIds(newOpenIds)
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="glass-effect rounded-lg border border-cyan-500/20">
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-cyan-500/5 transition-colors duration-200"
          >
            <h3 className="text-left font-semibold text-white">{item.title}</h3>
            <ChevronDown
              size={20}
              className={`text-cyan-400 transition-transform duration-300 ${
                openIds.has(item.id) ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {openIds.has(item.id) && (
            <div className="px-6 py-4 border-t border-cyan-500/20 text-slate-300 animate-fade-in">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
