"use client";

import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Zap,
  Users,
  AlertCircle,
  Loader2,
  Upload,
  Play,
  /* Activity kept for accessibility (SVG fallback) */
  Activity,
  Cpu,
  /* Server icon replaced by image */
  /* CloudLightning replaced by image */
  /* Eye/FileCode replaced by images */
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useUserPlan } from "@/hooks/use-user-plan";
import { CurrentPlanCard } from "@/components/dashboard/current-plan-card";
import { useEffect, useState, useRef } from "react";

type SimulationState = "IDLE" | "UPLOADING" | "PROCESSING" | "COMPLETED";

export default function DashboardOverview() {
  const { user } = useAuth();
  const { plan, isLoading: isPlanLoading } = useUserPlan();
  // derived plan slug (fallback to user.current_plan or 'basic') and premium flag
  const currentPlanSlug = plan?.slug ?? user?.current_plan ?? "basic";
  const isPremium = currentPlanSlug !== "basic" && currentPlanSlug !== null;
  const [simState, setSimState] = useState<SimulationState>("IDLE");
  const [progress, setProgress] = useState(0);
  const [infraStats, setInfraStats] = useState({
    gpuLoad: 12,
    latency: 42,
    throughput: 1.2,
  });

  // Randomized Infra Stats
  useEffect(() => {
    const interval = setInterval(() => {
      setInfraStats((prev) => ({
        gpuLoad:
          Math.floor(Math.random() * 20) +
          (simState === "PROCESSING" ? 60 : 10),
        latency:
          Math.floor(Math.random() * 10) +
          (simState === "PROCESSING" ? 85 : 35),
        throughput: parseFloat(
          (
            Math.random() * 0.5 +
            (simState === "PROCESSING" ? 2.5 : 0.8)
          ).toFixed(2),
        ),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [simState]);

  const startSimulation = () => {
    setSimState("UPLOADING");
    let p = 0;
    const uploadInt = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(uploadInt);
        setSimState("PROCESSING");
        p = 0;
        const processInt = setInterval(() => {
          p += 2;
          setProgress(p);
          if (p >= 100) {
            clearInterval(processInt);
            setSimState("COMPLETED");
          }
        }, 100);
      }
    }, 50);
  };

  const resetSim = () => {
    setSimState("IDLE");
    setProgress(0);
  };

  return (
    <div className='space-y-8 animate-fade-in'>
      {/* Simulation Header */}
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
        <div>
          <h1 className='text-3xl font-black text-white uppercase tracking-tighter mb-2'>
            Unit-01 <span className='text-cyan-electric'>Active Terminal</span>
          </h1>
          <div className='flex items-center gap-3'>
            <p className='text-slate-500 text-xs font-bold uppercase tracking-[0.3em]'>
              Welcome back, {user?.first_name || "Operator"}
            </p>
            <span className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-slate-300 uppercase tracking-widest'>
              {plan?.name ?? user?.current_plan ?? "Free Plan"}
            </span>
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3'>
            <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]' />
            <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
              Mainframe Link Stable
            </span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
        {/* Main Simulation Area (Widget A & B) */}
        <div className='xl:col-span-2 space-y-8'>
          {/* Widget A & B Container */}
          <div className='card-modern !p-0 overflow-hidden relative group min-h-[500px] flex flex-col'>
            <div className='p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]'>
              <div className='flex items-center gap-3'>
                <Image
                  src='/images/neural_net_abstract_1770976031098.webp'
                  alt='Neural core'
                  width={20}
                  height={20}
                  className='rounded-sm object-contain'
                />
                <h2 className='text-[10px] font-black text-white uppercase tracking-[0.3em]'>
                  Vision Core Simulation
                </h2>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-[8px] font-black text-slate-500 uppercase tracking-widest'>
                  Powered by
                </span>
                <span className='text-[8px] font-black text-white uppercase tracking-widest border border-white/20 px-2 py-0.5 rounded'>
                  NVIDIA Riva SDK
                </span>
              </div>
            </div>

            <div className='flex-1 relative flex flex-col items-center justify-center p-8 transition-all duration-500'>
              {/* IDLE STATE */}
              {simState === "IDLE" && (
                <div className='text-center space-y-6 max-w-sm animate-fade-up'>
                  <div className='w-24 h-24 mx-auto rounded-3xl bg-cyan-electric/5 border-2 border-dashed border-cyan-electric/20 flex items-center justify-center group-hover:border-cyan-electric/50 transition-colors'>
                    <Upload
                      size={32}
                      className='text-cyan-electric/50 group-hover:text-cyan-electric transition-colors'
                    />
                  </div>
                  <div>
                    <h3 className='text-white font-black uppercase tracking-widest text-sm mb-2'>
                      Ingest Media Stream
                    </h3>
                    <p className='text-slate-500 text-xs leading-relaxed'>
                      Upload .MP4, .WAV or connect a live RTSP stream to begin
                      neural analysis.
                    </p>
                  </div>
                  <button
                    onClick={startSimulation}
                    className='glow-button w-full flex items-center justify-center gap-2'
                  >
                    <Play size={16} /> Init Sequence
                  </button>
                  {!isPremium && (
                    <p className='text-xs text-slate-400 mt-2'>
                      Advanced simulation features require <strong>Pro</strong>{" "}
                      or higher.{" "}
                      <Link
                        href='/pricing'
                        className='text-cyan-electric underline'
                      >
                        Upgrade
                      </Link>
                    </p>
                  )}
                </div>
              )}

              {/* UPLOADING STATE */}
              {simState === "UPLOADING" && (
                <div className='w-full max-w-md space-y-8 animate-fade-in'>
                  <div className='text-center'>
                    <Loader2
                      size={40}
                      className='mx-auto text-cyan-electric animate-spin mb-4'
                    />
                    <h3 className='text-white font-black uppercase tracking-[0.4em] text-xs'>
                      Synchronizing Buffers...
                    </h3>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-[10px] font-black text-cyan-electric uppercase tracking-widest'>
                      <span>UPLOADING DATA</span>
                      <span>{progress}%</span>
                    </div>
                    <div className='h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10'>
                      <div
                        className='h-full bg-cyan-electric rounded-full transition-all duration-300'
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PROCESSING STATE (Widget B Proper) */}
              {simState === "PROCESSING" && (
                <div className='w-full flex flex-col items-center animate-fade-in'>
                  {/* Neural Graph Visualizer Mock */}
                  <div className='relative w-full h-64 mb-12 flex items-center justify-center'>
                    <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.1)_0%,transparent_70%)] animate-pulse' />

                    {/* Concentric Circles */}
                    <div className='absolute w-48 h-48 border border-cyan-electric/20 rounded-full animate-[spin_10s_linear_infinite]' />
                    <div className='absolute w-64 h-64 border border-cyan-electric/10 rounded-full animate-[spin_15s_linear_infinite_reverse]' />

                    {/* Floating Nodes */}
                    <div className='grid grid-cols-4 gap-8 relative z-10 w-full max-w-md'>
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className='flex flex-col items-center gap-2'
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${progress > i * 12 ? "bg-cyan-electric shadow-[0_0_10px_rgba(0,242,255,1)]" : "bg-slate-800"} transition-all duration-500`}
                          />
                          <div className='h-12 w-0.5 bg-gradient-to-b from-cyan-electric/50 to-transparent' />
                        </div>
                      ))}
                    </div>

                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
                      <div className='text-[8px] font-black text-cyan-electric uppercase tracking-[1em] mb-2 pl-[1em]'>
                        PROCESSING
                      </div>
                      <div className='text-4xl font-black text-white'>
                        {progress}%
                      </div>
                    </div>
                  </div>

                  <div className='w-full max-w-sm space-y-4'>
                    <div className='flex items-center justify-between px-4 py-2 rounded-lg bg-white/5 border border-white/10'>
                      <span className='text-[10px] font-black text-slate-500 uppercase tracking-widest'>
                        Active Model
                      </span>
                      <span className='text-[10px] font-black text-white uppercase tracking-widest'>
                        TENSOR-PRO-V4
                      </span>
                    </div>
                    <div className='flex items-center justify-between px-4 py-2 rounded-lg bg-white/5 border border-white/10'>
                      <span className='text-[10px] font-black text-slate-500 uppercase tracking-widest'>
                        Compute Shards
                      </span>
                      <span className='text-[10px] font-black text-white uppercase tracking-widest'>
                        12/12 ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* COMPLETED STATE */}
              {simState === "COMPLETED" && (
                <div className='text-center space-y-8 animate-fade-up max-w-xl'>
                  <div className='w-20 h-20 mx-auto rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center text-green-500'>
                    <ShieldCheck size={40} />
                  </div>
                  <div>
                    <h3 className='text-2xl font-black text-white uppercase tracking-tighter mb-2'>
                      Neural Link Successful
                    </h3>
                    <p className='text-slate-500 text-sm'>
                      Synthetic analysis produced 482 points of interest.
                      Narrative output ready for review.
                    </p>
                  </div>

                  <div className='grid grid-cols-2 gap-4 text-left'>
                    <div className='p-4 rounded-xl bg-white/5 border border-white/10'>
                      <h4 className='text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1'>
                        Sentiment Accuracy
                      </h4>
                      <p className='text-xl font-bold text-white'>98.4%</p>
                    </div>
                    <div className='p-4 rounded-xl bg-white/5 border border-white/10'>
                      <h4 className='text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1'>
                        Ocular Keyframes
                      </h4>
                      <p className='text-xl font-bold text-white'>12,042</p>
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <button
                      onClick={resetSim}
                      className='flex-1 px-6 py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all'
                    >
                      Clear Cache
                    </button>
                    <button className='flex-1 glow-button'>
                      Export Report
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className='p-4 border-t border-white/5 bg-obsidian-dark flex items-center justify-between px-6'>
              <div className='flex items-center gap-6'>
                <div className='flex items-center gap-2'>
                  <div className='w-1.5 h-1.5 rounded-full bg-cyan-electric animate-pulse' />
                  <span className='text-[8px] font-black text-slate-500 uppercase tracking-widest'>
                    Core Status: ONLINE
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-1.5 h-1.5 rounded-full bg-slate-700' />
                  <span className='text-[8px] font-black text-slate-500 uppercase tracking-widest'>
                    Encrpytion: AES-256
                  </span>
                </div>
              </div>
              <div className='text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] font-mono'>
                VS-ID: {String(user?.id || "").slice(0, 8) || "COMM-ALPHA"}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets (Widget C & Info) */}
        <div className='space-y-8'>
          {/* Current Plan Card */}
          <CurrentPlanCard plan={plan} isLoading={isPlanLoading} />

          {/* Widget C: Infrastructure Health */}
          <div className='card-modern'>
            <h3 className='text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 border-b border-white/5 pb-4 flex items-center gap-2'>
              <Image src='/images/server_datacenter_setup_1770976158685.webp' alt='Datacenter' width={16} height={16} className='rounded-sm object-contain' /> Infrastructure
            </h3>

            <div className='space-y-6'>
              {/* GPU Load */}
              <div>
                <div className='flex justify-between items-end mb-2'>
                  <span className='text-[9px] font-black text-slate-500 uppercase tracking-widest'>
                    GPU Neural Load
                  </span>
                  <span
                    className={`text-xs font-black ${infraStats.gpuLoad > 50 ? "text-lime-bio" : "text-cyan-electric"}`}
                  >
                    {infraStats.gpuLoad}%
                  </span>
                </div>
                <div className='h-1.5 bg-white/5 rounded-full overflow-hidden'>
                  <div
                    className={`h-full transition-all duration-1000 ${infraStats.gpuLoad > 50 ? "bg-lime-bio" : "bg-cyan-electric"}`}
                    style={{ width: `${infraStats.gpuLoad}%` }}
                  />
                </div>
              </div>

              {/* Latency */}
              <div>
                <div className='flex justify-between items-end mb-2'>
                  <span className='text-[9px] font-black text-slate-500 uppercase tracking-widest'>
                    Process Latency
                  </span>
                  <span className='text-xs font-black text-white'>
                    {infraStats.latency}ms
                  </span>
                </div>
                <div className='h-1.5 bg-white/5 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-white/20 transition-all duration-1000'
                    style={{ width: `${(infraStats.latency / 150) * 100}%` }}
                  />
                </div>
              </div>

              {/* Throughput */}
              <div className='flex items-center justify-between pt-4 border-t border-white/5'>
                <span className='text-[9px] font-black text-slate-500 uppercase tracking-widest'>
                  Data Throughput
                </span>
                <span className='text-xs font-black text-white'>
                  {infraStats.throughput} GB/s
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='p-4 rounded-xl bg-white/[0.02] border border-white/5'>
              <Image src='/images/ai_lipread_action_1770975871688.webp' alt='Scenes' width={16} height={16} className='mb-2 object-contain' />
              <p className='text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1'>
                Total Scenes
              </p>
              <p className='text-lg font-bold text-white tracking-tighter'>
                1,204
              </p>
            </div>
            <div className='p-4 rounded-xl bg-white/[0.02] border border-white/5'>
              <Image src='/images/dev_workspace_code_1770975987598.webp' alt='API' width={16} height={16} className='mb-2 object-contain' />
              <p className='text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1'>
                API Calls
              </p>
              <p className='text-lg font-bold text-white tracking-tighter'>
                42.8k
              </p>
              <p className='text-xs text-slate-400 mt-1'>
                {plan?.name ?? user?.current_plan ?? "Free Plan"}
              </p>
            </div>
          </div>

          {/* Upgrade Alert (Mock Billing Link) */}
          <div className='p-6 rounded-2xl bg-gradient-to-br from-cyan-electric/20 to-purple-600/10 border border-cyan-electric/30 relative overflow-hidden group'>
            <div className='absolute top-0 right-0 p-3 opacity-10 group-hover:rotate-12 transition-transform'>
              <Image src='/images/gpu_performance_comparison_1770976140955.webp' alt='GPU comparison' width={48} height={48} className='object-contain' />
            </div> 
            {!plan || plan.slug === "basic" ? (
              <>
                <h4 className='text-sm font-black text-white uppercase tracking-tight mb-2'>
                  Upgrade to Pro
                </h4>
                <p className='text-[10px] text-slate-400 leading-relaxed mb-4'>
                  Unlimited neural streams and priority GPU queuing.
                </p>
                <Link
                  href='/pricing'
                  className='block w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-center text-[10px] font-black uppercase tracking-widest text-white transition-all border border-white/10'
                >
                  Review Billing
                </Link>
              </>
            ) : (
              <>
                <h4 className='text-sm font-black text-white uppercase tracking-tight mb-2'>
                  You&apos;re on {plan.name}
                </h4>
                <p className='text-[10px] text-slate-400 leading-relaxed mb-4'>
                  Thank you for supporting VisionSpeakAI. Manage billing or
                  explore enterprise options.
                </p>
                <Link
                  href='/dashboard/settings'
                  className='block w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-center text-[10px] font-black uppercase tracking-widest text-white transition-all border border-white/10'
                >
                  Manage Billing
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
