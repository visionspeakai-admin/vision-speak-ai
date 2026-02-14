import { Check, Crown, Zap, Settings } from "lucide-react";
import Link from "next/link";
import { UserPlan } from "@/hooks/use-user-plan";

interface CurrentPlanCardProps {
  plan: UserPlan | null;
  isLoading: boolean;
}

export function CurrentPlanCard({ plan, isLoading }: CurrentPlanCardProps) {
  if (isLoading) {
    return (
      <div className='card-modern p-6 animate-pulse'>
        <div className='h-6 bg-white/10 rounded w-32 mb-4' />
        <div className='h-12 bg-white/10 rounded w-24 mb-4' />
        <div className='h-4 bg-white/10 rounded w-full' />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className='card-modern p-6 bg-gradient-to-br from-cyan-electric/10 to-lime-bio/10 border-cyan-electric/30'>
        <div className='flex items-start justify-between mb-4'>
          <div>
            <h3 className='text-xs font-black text-slate-400 uppercase tracking-widest mb-2'>
              Current Plan
            </h3>
            <p className='text-2xl font-black text-white'>No Plan Active</p>
          </div>
          <Crown size={20} className='text-cyan-electric' />
        </div>
        <p className='text-sm text-slate-400 mb-4'>
          Start using VisionSpeakAI by selecting a plan.
        </p>
        <Link
          href='/pricing'
          className='inline-block px-4 py-2 rounded-lg bg-cyan-electric/20 hover:bg-cyan-electric/30 text-xs font-black text-cyan-electric uppercase tracking-widest transition-all'
        >
          Browse Plans
        </Link>
      </div>
    );
  }

  const isPremium = plan.slug !== "basic";
  const icon = plan.slug === "enterprise" ? Crown : Zap;

  return (
    <div
      className={`card-modern p-6 border ${isPremium ? "border-lime-bio/40 bg-lime-bio/5" : "border-white/10"}`}
    >
      <div className='flex items-start justify-between mb-4'>
        <div>
          <h3 className='text-xs font-black text-slate-400 uppercase tracking-widest mb-1'>
            Current Plan
          </h3>
          <div className='flex items-center gap-2'>
            {icon === Crown ? (
              <Crown size={20} className='text-lime-bio' />
            ) : (
              <Zap size={20} className='text-cyan-electric' />
            )}
            <p className='text-2xl font-black text-white'>{plan.name}</p>
          </div>
        </div>
      </div>

      <p className='text-sm text-slate-400 mb-4'>{plan.description}</p>

      {plan.features && plan.features.length > 0 && (
        <div className='space-y-2 mb-6 py-4 border-t border-white/10'>
          {plan.features.slice(0, 3).map((feature, idx) => (
            <div
              key={idx}
              className='flex items-center gap-2 text-xs text-slate-300'
            >
              <Check size={14} className='text-lime-bio flex-shrink-0' />
              {feature}
            </div>
          ))}
          {plan.features.length > 3 && (
            <p className='text-xs text-slate-500 ml-5'>
              +{plan.features.length - 3} more features
            </p>
          )}
        </div>
      )}

      <div className='flex gap-2'>
        <Link
          href='/pricing'
          className='flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-black text-slate-300 uppercase tracking-widest text-center transition-all border border-white/10'
        >
          View All Plans
        </Link>
        {isPremium && (
          <Link
            href='/dashboard/settings'
            className='flex-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-black text-white uppercase tracking-widest text-center transition-all flex items-center justify-center gap-1'
          >
            <Settings size={14} />
            Manage
          </Link>
        )}
      </div>
    </div>
  );
}
