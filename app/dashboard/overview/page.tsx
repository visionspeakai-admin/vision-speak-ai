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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Chart Placeholder */}
        <div className="lg:col-span-2 glass-effect p-8 rounded-xl">
          <h2 className="text-lg font-bold text-white mb-6">API Usage (30 days)</h2>
          <div className="h-64 bg-black/20 rounded-lg flex items-center justify-center text-slate-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />
            <p className="relative z-10 font-mono text-sm">Real-time usage metrics coming soon</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="glass-effect p-6 rounded-xl">
            <h3 className="font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/api-keys"
                className="block w-full px-4 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all text-center text-sm font-semibold text-white"
              >
                Manage API Keys
              </Link>
              <Link
                href="/documentation"
                className="block w-full px-4 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all text-center text-sm font-semibold text-white"
              >
                API Docs
              </Link>
              <Link
                href="/dashboard/settings"
                className="block w-full px-4 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all text-center text-sm font-semibold text-white"
              >
                Account Settings
              </Link>
            </div>
          </div>

          {/* Usage Summary */}
          <div className="glass-effect p-6 rounded-xl">
            <h3 className="font-bold text-white mb-4">Plan: <span className="text-cyan-400 uppercase">{user?.current_plan || 'Free'}</span></h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">API Calls</span>
                  <span className="text-sm font-bold text-cyan-300">2.4M / 3M</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-cyan-400 to-cyan-600" />
                </div>
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
