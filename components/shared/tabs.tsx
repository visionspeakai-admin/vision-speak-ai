'use client'

import { ReactNode, useState } from 'react'

export interface TabItem {
  label: string
  content: ReactNode
  value: string
}

interface TabsProps {
  items: TabItem[]
  defaultValue?: string
}

export function Tabs({ items, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || items[0]?.value || '')

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-cyan-500/20 overflow-x-auto">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => setActiveTab(item.value)}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-all duration-200 border-b-2 ${
              activeTab === item.value
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {items.map((item) =>
          activeTab === item.value ? (
            <div key={item.value} className="animate-fade-in">
              {item.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}
