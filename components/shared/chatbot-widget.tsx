'use client';

import { useState } from 'react';
import { MessageSquare, X, Send, Cpu, ShieldCheck } from 'lucide-react';

export function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<{ role: 'ai' | 'user', text: string }[]>([
        { role: 'ai', text: 'Hello! I am the VisionSpeak assistant. How can I help you today?' }
    ]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setChat(prev => [...prev, { role: 'user', text: message }]);
        setMessage('');

        // Mock AI response
        setTimeout(() => {
            setChat(prev => [...prev, { role: 'ai', text: 'Thank you for your inquiry. Our specialized models are analyzing your request. How else can I assist?' }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-400 text-obsidian-dark shadow-[0_0_20px_rgba(0,242,255,0.3)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
                >
                    <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="w-80 md:w-96 glass-effect border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-300 origin-bottom-right">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 bg-cyan-500/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-obsidian-dark">
                                <Cpu size={18} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">VS Assistant</h3>
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                                    <span className="text-[10px] text-lime-400 font-bold uppercase tracking-widest">Online</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="h-96 overflow-y-auto p-4 space-y-4 flex flex-col">
                        {chat.map((m, i) => (
                            <div
                                key={i}
                                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${m.role === 'ai'
                                        ? 'bg-white/5 text-slate-300 self-start rounded-tl-none'
                                        : 'bg-cyan-500 text-obsidian-dark self-end rounded-tr-none font-medium'
                                    }`}
                            >
                                {m.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-white/10 flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                        />
                        <button
                            type="submit"
                            className="w-10 h-10 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-obsidian-dark flex items-center justify-center transition-all"
                        >
                            <Send size={16} />
                        </button>
                    </form>

                    {/* Legal Footer */}
                    <div className="px-4 py-2 bg-black/60 border-t border-white/5 flex items-center gap-1.5">
                        <ShieldCheck size={10} className="text-slate-500" />
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Secure AI Processing</span>
                    </div>
                </div>
            )}
        </div>
    );
}
