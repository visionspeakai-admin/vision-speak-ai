import Link from 'next/link'
import { TrendingUp, Zap, Users, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function DashboardOverview() {
  const { user } = useAuth()
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get<any[]>('/payments')
        if (response.status === 'success' && response.data) {
          const activities = response.data.slice(0, 5).map(payment => ({
            event: `Payment for ${payment.plan_name}`,
            time: new Date(payment.paid_at).toLocaleDateString(),
            status: payment.status === 'paid' ? 'success' : 'info'
          }))
          setRecentActivity(activities)
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  const stats = [
    {
      label: 'API Calls (30d)',
      value: '2.4M',
      change: '+12.5%',
      positive: true,
      icon: TrendingUp,
      color: 'text-cyan-400',
    },
    {
      label: 'Avg Latency',
      value: '78ms',
      change: '-3.2%',
      positive: true,
      icon: Zap,
      color: 'text-lime-400',
    },
    {
      label: 'Active Users',
      value: '284',
      change: '+8.1%',
      positive: true,
      icon: Users,
      color: 'text-purple-400',
    },
    {
      label: 'Error Rate',
      value: '0.12%',
      change: '-0.05%',
      positive: true,
      icon: AlertCircle,
      color: 'text-red-400',
    },
  ]

  const defaultActivity = [
    { event: 'Account created', time: 'Just now', status: 'success' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="heading-lg text-white mb-2">Welcome back, {user?.first_name || 'Explorer'}</h1>
        <p className="text-slate-400">Here's what's happening with your account and API usage.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="glass-effect p-6 rounded-xl">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <span className={`text-xs font-semibold ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Usage Chart Placeholder */}
        <div className="lg:col-span-2 card-modern !p-0 overflow-hidden group">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xs font-black text-white uppercase tracking-[0.2em]">Neural Usage Matrix (30D)</h2>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-electric/50" />
              <div className="w-2 h-2 rounded-full bg-lime-bio/50" />
            </div>
          </div>
          <div className="h-[400px] bg-obsidian-dark/50 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="w-full h-full absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 animate-pulse">
                <TrendingUp size={32} className="text-cyan-electric" />
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-500">Telemetry Feed Incoming...</p>
            </div>
          </div>
        </div>

        {/* Quick Actions & Plan */}
        <div className="space-y-8">
          <div className="card-modern">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 border-b border-white/5 pb-4">Terminal Commands</h3>
            <div className="space-y-4">
              <Link
                href="/dashboard/api-keys"
                className="block w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-electric/40 hover:bg-cyan-electric/5 transition-all text-center text-[10px] font-black uppercase tracking-[0.3em] text-white group"
              >
                Manage API Keys
              </Link>
              <Link
                href="/documentation"
                className="block w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-lime-bio/40 hover:bg-lime-bio/5 transition-all text-center text-[10px] font-black uppercase tracking-[0.3em] text-white"
              >
                Access Documentation
              </Link>
              <Link
                href="/dashboard/settings"
                className="block w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white"
              >
                System Settings
              </Link>
            </div>
          </div>

          {/* Usage Summary */}
          <div className="card-modern border-cyan-electric/20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">CURRENT PLAN</h3>
              <span className="px-3 py-1 rounded-lg bg-cyan-electric/10 text-cyan-electric text-[10px] font-black uppercase tracking-widest">{user?.current_plan || 'COMMUNITY'}</span>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">API QUOTA USAGE</span>
                  <span className="text-xs font-black text-cyan-electric">80.0%</span>
                </div>
                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div className="h-full w-4/5 bg-gradient-to-r from-cyan-electric to-cyan-500 rounded-full shadow-[0_0_10px_rgba(0,242,255,0.4)]" />
                </div>
                <p className="mt-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">2.4M / 3M REQUESTS</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-effect p-8 rounded-xl">
        <h2 className="text-lg font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin text-cyan-400" />
            </div>
          ) : (recentActivity.length > 0 ? recentActivity : defaultActivity).map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
              <div>
                <p className="font-semibold text-white text-sm">{activity.event}</p>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${activity.status === 'success'
                  ? 'bg-green-500'
                  : activity.status === 'info'
                    ? 'bg-cyan-500'
                    : 'bg-yellow-500'
                  }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade CTA */}
      {!user?.current_plan && (
        <div className="glass-effect-strong border-cyan-400/50 shadow-[0_0_30px_rgba(0,242,255,0.3)] p-8 rounded-xl text-center">
          <h3 className="text-lg font-bold text-white mb-3">Scale your application</h3>
          <p className="text-slate-400 mb-6">Unlock higher rate limits and enterprise-grade features with our Pro plan.</p>
          <Link href="/pricing" className="inline-block px-8 py-3 glow-button">
            View Pricing
          </Link>
        </div>
      )}
    </div>
  )
}
