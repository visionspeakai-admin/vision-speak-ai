import { Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApiKey } from "@/hooks/use-api-keys";

interface GeneratedKeyModalProps {
  isOpen: boolean;
  newKey: ApiKey | null;
  onClose: () => void;
}

export function GeneratedKeyModal({
  isOpen,
  newKey,
  onClose,
}: GeneratedKeyModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[550px] glass-effect-strong border-lime-bio/30 bg-obsidian-dark text-white p-0 overflow-hidden'>
        {/* Success Header */}
        <div className='relative h-24 bg-gradient-to-r from-lime-bio/20 to-cyan-electric/20 flex items-center justify-center'>
          <div className='absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]' />
          <CheckCircle2
            size={48}
            className='text-lime-bio animate-pulse relative z-10'
          />
        </div>

        <div className='p-8'>
          <DialogHeader className='mb-6'>
            <DialogTitle className='text-2xl font-black uppercase tracking-tighter text-lime-bio'>
              API Key Generated
            </DialogTitle>
            <DialogDescription className='text-slate-400'>
              Save this key in a secure location. You won't be able to see it
              again.
            </DialogDescription>
          </DialogHeader>

          {newKey && (
            <div className='space-y-6'>
              {/* Key Name */}
              <div>
                <p className='text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2'>
                  Key Name
                </p>
                <div className='px-4 py-3 rounded-lg bg-white/5 border border-white/10'>
                  <p className='font-mono text-sm text-white'>{newKey.name}</p>
                </div>
              </div>

              {/* Full Key */}
              <div>
                <p className='text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2'>
                  Full API Key (Save Securely)
                </p>
                <div className='flex gap-2'>
                  <div className='flex-1 px-4 py-3 rounded-lg bg-cyan-electric/10 border border-cyan-electric/30 relative overflow-hidden group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                    <p className='font-mono text-xs text-cyan-300 break-all relative z-10'>
                      {newKey.fullKey}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(newKey.fullKey)}
                    className='px-4 py-3 rounded-lg bg-lime-bio/20 hover:bg-lime-bio/30 border border-lime-bio/40 flex items-center justify-center transition-all group'
                  >
                    {copied ? (
                      <span className='text-xs font-black text-lime-bio'>
                        COPIED!
                      </span>
                    ) : (
                      <Copy
                        size={18}
                        className='text-lime-bio group-hover:scale-110 transition-transform'
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Key Details Grid */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='px-4 py-3 rounded-lg bg-white/5 border border-white/10'>
                  <p className='text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1'>
                    Created
                  </p>
                  <p className='text-sm text-white font-mono'>
                    {newKey.created}
                  </p>
                </div>
                <div className='px-4 py-3 rounded-lg bg-white/5 border border-white/10'>
                  <p className='text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1'>
                    Status
                  </p>
                  <span className='inline-block px-2 py-1 rounded bg-lime-bio/20 text-xs font-bold text-lime-bio'>
                    {newKey.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Security Warning */}
              <div className='p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-3'>
                <AlertCircle
                  size={20}
                  className='text-amber-400 flex-shrink-0'
                />
                <div>
                  <p className='text-xs font-black text-amber-300 uppercase tracking-widest mb-1'>
                    Security Notice
                  </p>
                  <p className='text-xs text-amber-200'>
                    Store this key safely. Never commit it to version control or
                    share it publicly.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className='mt-8'>
            <button
              onClick={onClose}
              className='w-full px-6 py-3 rounded-lg bg-lime-bio text-obsidian-dark font-black uppercase tracking-widest text-sm hover:bg-lime-bio/90 transition-all'
            >
              I've Saved My Key
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
