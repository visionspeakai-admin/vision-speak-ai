'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  LayoutDashboard,
  BarChart3,
  Key,
  Cpu,
  Settings,
  Book,
  LogOut,
  Menu,
  X,
  User,
  Bell,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/overview' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Key, label: 'API Keys', href: '/dashboard/api-keys' },
  { icon: Cpu, label: 'Integrations', href: '/dashboard/integrations' },
  { icon: Book, label: 'Documentation', href: '/dashboard/documentation' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen glass-effect border-r border-white/10 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2 font-bold">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <span className="text-obsidian-dark font-black text-sm">VS</span>
              </div>
              <span className="text-glow">VisionSpeak</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 transition-colors group"
              title={!sidebarOpen ? item.label : ''}
            >
              <item.icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              {sidebarOpen && <span className="text-sm font-medium text-slate-300">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-500/10 text-slate-300 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 glass-effect border-b border-white/10 h-20">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex-1" />

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                <Bell size={20} className="text-slate-400 hover:text-white" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-white">John Doe</p>
                  <p className="text-xs text-slate-400">Professional Plan</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
