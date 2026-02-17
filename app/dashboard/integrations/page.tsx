"use client";

import {
  Plus,
  CheckCircle2,
  Zap,
  Loader2,
  Link2,
  Settings2,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function IntegrationsPage() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [configValue, setConfigValue] = useState("");

  const connectedIntegrations = [
    {
      name: "Webhooks",
      description: "Send events to your application",
      status: "configured",
      icon: "🔗",
    },
    {
      name: "Slack",
      description: "Receive alerts and notifications",
      status: "connected",
      icon: "💬",
    },
  ];

  const availableIntegrations = [
    {
      name: "Datadog",
      description: "Monitor and analyze API performance",
      icon: "📊",
      popular: true,
      configLabel: "Datadog API Key",
    },
    {
      name: "PagerDuty",
      description: "Incident response and alerting",
      icon: "🚨",
      popular: true,
      configLabel: "PagerDuty Integration Key",
    },
    {
      name: "AWS CloudWatch",
      description: "Native AWS monitoring",
      icon: "☁️",
      configLabel: "AWS IAM Role ARN",
    },
    {
      name: "Splunk",
      description: "Log aggregation and analysis",
      icon: "📈",
      configLabel: "HEC Token",
    },
    {
      name: "Supabase",
      description: "Database and authentication",
      icon: "🗄️",
      configLabel: "Project Reference ID",
    },
    {
      name: "Vercel",
      description: "Deploy and monitor deployments",
      icon: "▲",
      configLabel: "Vercel Personal Access Token",
    },
  ];

  const handleConnect = (integration: any) => {
    setSelectedIntegration(integration);
    setIsConnectModalOpen(true);
  };

  const handleConfirmConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnectModalOpen(false);
      setSelectedIntegration(null);
      setConfigValue("");
    }, 2000);
  };

  return (
    <div className='space-y-8 animate-fade-in'>
      {/* Header */}
      <div>
        <h1 className='heading-lg text-white mb-2'>Integrations</h1>
        <p className='text-slate-400'>
          Connect VSpeakX 1.0 with your favorite tools and services.
        </p>
      </div>

      {/* Connected Integrations */}
      {connectedIntegrations.length > 0 && (
        <div className='animate-fade-up'>
          <h2 className='text-lg font-bold text-white mb-4'>
            Connected Services
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {connectedIntegrations.map((integration, index) => (
              <div
                key={index}
                className='glass-effect p-6 rounded-xl flex items-start justify-between border border-white/5 hover:border-cyan-400/20 transition-all'
              >
                <div className='flex items-start gap-4'>
                  <div className='text-3xl'>{integration.icon}</div>
                  <div>
                    <h3 className='font-bold text-white'>{integration.name}</h3>
                    <p className='text-sm text-slate-400 mt-1'>
                      {integration.description}
                    </p>
                  </div>
                </div>
                <CheckCircle2
                  className='text-green-400 flex-shrink-0'
                  size={20}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Integrations */}
      <div className='animate-fade-up' style={{ animationDelay: "100ms" }}>
        <h2 className='text-lg font-bold text-white mb-4'>
          Available Integrations
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {availableIntegrations.map((integration, index) => (
            <div
              key={index}
              className='glass-effect p-6 rounded-xl hover:border-cyan-400/30 transition-all group'
            >
              <div className='flex items-start justify-between mb-4'>
                <div className='flex items-start gap-4'>
                  <div className='text-3xl'>{integration.icon}</div>
                  <div>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-bold text-white group-hover:text-cyan-electric transition-colors'>
                        {integration.name}
                      </h3>
                      {integration.popular && (
                        <span className='text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-black uppercase tracking-widest border border-cyan-500/20'>
                          Popular
                        </span>
                      )}
                    </div>
                    <p className='text-sm text-slate-400 mt-1'>
                      {integration.description}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleConnect(integration)}
                className='w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all text-white font-bold text-sm group-hover:shadow-[0_0_15px_rgba(0,242,255,0.2)]'
              >
                <Plus size={16} />
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Modal */}
      <Dialog open={isConnectModalOpen} onOpenChange={setIsConnectModalOpen}>
        <DialogContent className='sm:max-w-[425px] glass-effect-strong border-white/10 bg-obsidian-dark text-white'>
          <DialogHeader>
            <DialogTitle className='text-xl font-bold flex items-center gap-3'>
              <span className='text-2xl'>{selectedIntegration?.icon}</span>
              Connect {selectedIntegration?.name}
            </DialogTitle>
            <DialogDescription className='text-slate-400'>
              Configure your {selectedIntegration?.name} integration to start
              receiving telemetry data.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-6'>
            <div className='grid gap-2'>
              <Label
                htmlFor='config'
                className='text-[10px] font-black tracking-widest text-slate-500 uppercase'
              >
                {selectedIntegration?.configLabel || "Endpoint Configuration"}
              </Label>
              <div className='relative'>
                <Input
                  id='config'
                  placeholder='Paste credentials here...'
                  className='bg-white/5 border-white/10 focus:border-cyan-electric transition-all text-white pr-10'
                  value={configValue}
                  onChange={(e) => setConfigValue(e.target.value)}
                />
                <div className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500'>
                  <Settings2 size={16} />
                </div>
              </div>
              <p className='text-[10px] text-slate-600 mt-1'>
                Visit your {selectedIntegration?.name} dashboard to generate
                this key.
              </p>
            </div>
          </div>
          <DialogFooter className='flex flex-col sm:flex-row gap-3'>
            <button
              onClick={() => setIsConnectModalOpen(false)}
              className='px-6 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-xs font-black uppercase tracking-widest text-slate-400'
            >
              Back
            </button>
            <button
              disabled={!configValue || isConnecting}
              onClick={handleConfirmConnect}
              className='glow-button flex-1 flex items-center justify-center gap-2 disabled:opacity-50'
            >
              {isConnecting ? (
                <Loader2 className='animate-spin' size={16} />
              ) : (
                <CheckCircle2 size={16} />
              )}
              Confirm Connection
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Custom Integration */}
      <div
        className='glass-effect-strong border-cyan-400/50 shadow-[0_0_30px_rgba(0,242,255,0.3)] p-8 rounded-xl animate-fade-up'
        style={{ animationDelay: "200ms" }}
      >
        <div className='flex items-start gap-4'>
          <Zap className='text-cyan-400 flex-shrink-0 mt-1' size={24} />
          <div>
            <h3 className='font-bold text-white mb-2 underline decoration-cyan-400/30 underline-offset-4'>
              Need a Custom Integration?
            </h3>
            <p className='text-slate-400 mb-4 text-sm leading-relaxed'>
              We support webhooks and REST APIs for custom integrations. Check
              our API documentation for details.
            </p>
            <a
              href='/developers'
              className='inline-flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-all text-sm group'
            >
              View Integration Guide
              <Link2
                size={16}
                className='group-hover:translate-x-1 transition-transform'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
