'use client';

import { useState, useRef, useEffect } from 'react';
import { Navigation } from '@/components/shared/navigation';
import { Footer } from '@/components/shared/footer';
import { HeroSection } from '@/components/shared/hero-section';
import { FadeInUp } from '@/components/animations/fade-in-up';
import { Send, Bot, User, Trash2, Loader2 } from 'lucide-react';
import { useAI } from '@/lib/hooks/use-ai';

export default function ChatPage() {
    const { messages, isLoading, sendMessage, clearChat } = useAI();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        const msg = input;
        setInput('');
        await sendMessage(msg);
    };

    return (
        <main className="min-h-screen bg-obsidian flex flex-col relative overflow-hidden">
            <Navigation />

            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-electric/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 -z-10 animate-float" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-lime-bio/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 -z-10 animate-float" style={{ animationDelay: '3s' }} />

            <section className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 py-12 md:py-20 mt-20 relative z-10">
                <FadeInUp>
                    <div className="text-center mb-12">
                        <div className="inline-block mb-6 px-4 py-1.5 rounded-xl glass-effect-strong border-cyan-electric/20">
                            <span className="text-cyan-electric text-[10px] font-black uppercase tracking-[0.3em]">AI-Powered Visual Intelligence</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">VISION <span className="text-cyan-electric">ASSISTANT</span></h1>
                        <p className="text-slate-500 max-w-2xl mx-auto text-xs font-bold uppercase tracking-widest leading-relaxed">
                            Natural language interface for deep model analysis and gesture recognition telemetry.
                        </p>
                    </div>
                </FadeInUp>

                {/* Chat Interface */}
                <div className="flex-1 flex flex-col glass-effect-strong rounded-3xl overflow-hidden border-white/5 shadow-2xl relative min-h-[600px] bg-black/40">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-xl sticky top-0 z-20">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-electric/10 flex items-center justify-center border border-cyan-electric/20 shadow-[0_0_20px_rgba(0,242,255,0.15)]">
                                <Bot size={24} className="text-cyan-electric animate-pulse-cyan" />
                            </div>
                            <div>
                                <h2 className="text-sm font-black text-white uppercase tracking-widest">COGNITIVE ENGINE V3</h2>
                                <p className="text-[10px] text-lime-bio font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-lime-bio animate-pulse shadow-[0_0_10px_rgba(204,255,0,0.5)]" />
                                    Subsystem Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={clearChat}
                            className="p-3 hover:bg-red-500/10 rounded-xl text-slate-500 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
                            title="Purge Response Buffer"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>

                    {/* Messages area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-20">
                                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group transition-all hover:scale-110 hover:border-cyan-electric/30">
                                    <Bot size={40} className="text-slate-700 group-hover:text-cyan-electric transition-colors" />
                                </div>
                                <div className="max-w-sm">
                                    <p className="text-white font-black uppercase tracking-widest mb-2">Awaiting Instructions</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Provide context for neural analysis or request model documentation.</p>
                                </div>
                            </div>
                        )}

                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex gap-6 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center border transition-all ${message.role === 'assistant'
                                    ? 'bg-cyan-electric/10 border-cyan-electric/30 text-cyan-electric shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                                    : 'bg-white/5 border-white/10 text-white'
                                    }`}>
                                    {message.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                                </div>
                                <div className={`max-w-[85%] px-6 py-4 rounded-3xl text-sm leading-relaxed transition-all ${message.role === 'assistant'
                                    ? 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5'
                                    : 'bg-cyan-electric text-obsidian font-bold rounded-tr-none shadow-[0_0_30px_rgba(0,242,255,0.2)]'
                                    }`}>
                                    {message.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-6">
                                <div className="w-10 h-10 rounded-2xl bg-cyan-electric/10 border border-cyan-electric/30 text-cyan-electric flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                                    <Bot size={20} />
                                </div>
                                <div className="bg-white/5 text-slate-200 px-6 py-4 rounded-3xl rounded-tl-none border border-white/5 flex items-center gap-3">
                                    <Loader2 size={20} className="animate-spin text-cyan-electric" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Processing...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input area */}
                    <div className="p-6 md:p-8 border-t border-white/5 bg-white/5 backdrop-blur-xl">
                        <form onSubmit={handleSubmit} className="relative flex gap-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="ENTER QUERY OR COMMAND..."
                                disabled={isLoading}
                                className="flex-1 bg-obsidian-dark/80 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-cyan-electric focus:ring-4 focus:ring-cyan-electric/10 transition-all placeholder:text-slate-700 font-bold"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="px-8 bg-cyan-electric hover:bg-cyan-400 text-obsidian rounded-2xl font-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,242,255,0.3)] flex items-center justify-center hover:scale-105 active:scale-95 group"
                            >
                                <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </button>
                        </form>
                        <div className="flex justify-between items-center mt-6">
                            <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em]">
                                Hardware Acceleration: <span className="text-lime-bio/70">NVIDIA TensorCore Active</span>
                            </p>
                            <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em]">
                                Pipeline Latency: <span className="text-cyan-electric/70">12ms</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
