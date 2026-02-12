'use client'

import { Plus, CheckCircle2, Zap } from 'lucide-react'

export default function IntegrationsPage() {
  const connectedIntegrations = [
    {
      name: 'Webhooks',
      description: 'Send events to your application',
      status: 'configured',
      icon: '🔗',
    },
    {
      name: 'Slack',
      description: 'Receive alerts and notifications',
      status: 'connected',
      icon: '💬',
    },
  ]

  const availableIntegrations = [
    {
      name: 'Datadog',
      description: 'Monitor and analyze API performance',
      icon: '📊',
      popular: true,
    },
    {
      name: 'PagerDuty',
      description: 'Incident response and alerting',
      icon: '🚨',
      popular: true,
    },
    {
      name: 'AWS CloudWatch',
      description: 'Native AWS monitoring',
      icon: '☁️',
    },
    {
      name: 'Splunk',
      description: 'Log aggregation and analysis',
      icon: '📈',
    },
    {
      name: 'Supabase',
      description: 'Database and authentication',
      icon: '🗄️',
    },
    {
      name: 'Vercel',
      description: 'Deploy and monitor deployments',
      icon: '▲',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="heading-lg text-white mb-2">Integrations</h1>
        <p className="text-slate-400">Connect VisionSpeakAI with your favorite tools and services.</p>
      </div>

      {/* Connected Integrations */}
      {connectedIntegrations.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Connected Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectedIntegrations.map((integration, index) => (
              <div key={index} className="glass-effect p-6 rounded-xl flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{integration.icon}</div>
                  <div>
                    <h3 className="font-bold text-white">{integration.name}</h3>
                    <p className="text-sm text-slate-400 mt-1">{integration.description}</p>
                  </div>
                </div>
                <CheckCircle2 className="text-green-400 flex-shrink-0" size={20} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Integrations */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Available Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableIntegrations.map((integration, index) => (
            <div key={index} className="glass-effect p-6 rounded-xl hover:border-cyan-400/30 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{integration.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{integration.name}</h3>
                      {integration.popular && (
                        <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{integration.description}</p>
                  </div>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all text-white font-semibold text-sm group-hover:shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                <Plus size={16} />
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Integration */}
      <div className="glass-effect-strong border-cyan-400/50 shadow-[0_0_30px_rgba(0,242,255,0.3)] p-8 rounded-xl">
        <div className="flex items-start gap-4">
          <Zap className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-white mb-2">Need a Custom Integration?</h3>
            <p className="text-slate-400 mb-4">
              We support webhooks and REST APIs for custom integrations. Check our API documentation for details.
            </p>
            <a href="/developers" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
              View Integration Guide →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
