'use client'

export default function DashboardAnalytics() {
  const models = [
    { name: 'Lip-Reading v2.1', usage: '1.8M', percentage: 75 },
    { name: 'Gesture Recognition v2.0', usage: '600K', percentage: 25 },
  ]

  const endpoints = [
    { path: '/api/v1/lip-read', calls: '1.2M', avgLatency: '76ms', errors: '342' },
    { path: '/api/v1/gestures', calls: '800K', avgLatency: '82ms', errors: '156' },
    { path: '/api/v1/stream', calls: '400K', avgLatency: '54ms', errors: '89' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="heading-lg text-white mb-2">Analytics</h1>
        <p className="text-slate-400">Detailed insights into your API usage and performance.</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {['7d', '30d', '90d', '1y', 'Custom'].map((range) => (
          <button
            key={range}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              range === '30d'
                ? 'glass-effect-strong border-cyan-400/50 text-white'
                : 'glass-effect text-slate-400 hover:text-white'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage by Model */}
        <div className="glass-effect p-8 rounded-xl">
          <h2 className="text-lg font-bold text-white mb-6">Usage by Model</h2>
          <div className="space-y-4">
            {models.map((model, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">{model.name}</span>
                  <span className="text-sm font-bold text-cyan-300">{model.usage}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600"
                    style={{ width: `${model.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="glass-effect p-8 rounded-xl">
          <h2 className="text-lg font-bold text-white mb-6">Performance Metrics</h2>
          <div className="space-y-4">
            {[
              { label: 'Avg Response Time', value: '73ms', color: 'text-lime-400' },
              { label: 'P95 Latency', value: '142ms', color: 'text-cyan-400' },
              { label: 'P99 Latency', value: '287ms', color: 'text-purple-400' },
              { label: 'Uptime', value: '99.97%', color: 'text-green-400' },
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-slate-400 text-sm">{metric.label}</span>
                <span className={`font-bold ${metric.color}`}>{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Endpoints Table */}
      <div className="glass-effect p-8 rounded-xl">
        <h2 className="text-lg font-bold text-white mb-6">Top Endpoints</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-4 py-3 font-semibold text-slate-300">Endpoint</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-300">Calls</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-300">Avg Latency</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-300">Errors</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((endpoint, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-cyan-300">{endpoint.path}</td>
                  <td className="text-right px-4 py-3 text-slate-300">{endpoint.calls}</td>
                  <td className="text-right px-4 py-3">
                    <span className="text-lime-400 font-semibold">{endpoint.avgLatency}</span>
                  </td>
                  <td className="text-right px-4 py-3">
                    <span className="text-red-400">{endpoint.errors}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Error Trends */}
      <div className="glass-effect p-8 rounded-xl">
        <h2 className="text-lg font-bold text-white mb-6">Error Distribution</h2>
        <div className="space-y-4">
          {[
            { code: '429 (Rate Limited)', count: '342', percentage: 45 },
            { code: '400 (Bad Request)', count: '156', percentage: 20 },
            { code: '500 (Server Error)', count: '89', percentage: 12 },
            { code: '403 (Forbidden)', count: '71', percentage: 9 },
            { code: 'Other', count: '42', percentage: 14 },
          ].map((error, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">{error.code}</span>
                <span className="text-sm font-bold text-red-400">{error.count}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-400 to-red-600"
                  style={{ width: `${error.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
