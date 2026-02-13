'use client';

import { useState, useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-96 z-50 animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="glass-effect p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,242,255,0.15)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent" />

                <div className="relative flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
                        <ShieldCheck className="text-cyan-400 w-6 h-6" />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-white font-bold mb-1">Cookie Compliance</h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            We use cookies to enhance your experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                        </p>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleAccept}
                                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-obsidian-dark text-xs font-bold rounded-lg transition-all"
                            >
                                Accept All
                            </button>
                            <a href="/cookies" className="text-xs text-slate-500 hover:text-white transition-colors">
                                Learn More
                            </a>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-slate-500 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
