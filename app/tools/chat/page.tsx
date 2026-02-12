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
        <main className="min-h-screen bg-background flex flex-col">
            <Navigation />

            <section className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 py-8 md:py-12 mt-16 md:mt-24">
                <FadeInUp>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Vision Assistant</h1>
                        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
                            Explore the possibilities of VisionSpeakAI. Ask about our lip-reading models, gesture recognition, or any technical integration details.
                        </p>
                    </div>
                </FadeInUp>

                {/* Chat Interface */}
                <div className="flex-1 flex flex-col glass-effect rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[500px]">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                                <Bot size={18} className="text-cyan-400" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-white">Vision Assistant</h2>
                                <p className="text-[10px] text-cyan-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={clearChat}
                            className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                            title="Clear Chat"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>

                    {/* Messages area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-black/20">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50 py-12">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <Bot size={32} className="text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Hello! I'm your Vision Assistant.</p>
                                    <p className="text-sm text-slate-400">How can I help you today?</p>
                                </div>
                            </div>
                        )}

                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${message.role === 'assistant'
                                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                                        : 'bg-white/10 border-white/20 text-white'
                                    }`}>
                                    {message.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                                </div>
                                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${message.role === 'assistant'
                                        ? 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5'
                                        : 'bg-cyan-500 text-white rounded-tr-none shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                                    }`}>
                                    {message.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-white/5 text-slate-200 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 min-w-[60px] flex items-center justify-center">
                                    <Loader2 size={18} className="animate-spin text-cyan-400" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input area */}
                    <div className="p-4 md:p-6 border-t border-white/10 bg-white/5 backdrop-blur-md">
                        <form onSubmit={handleSubmit} className="relative flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                disabled={isLoading}
                                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-500"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="px-4 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                        <p className="text-[10px] text-slate-500 mt-3 text-center">
                            Our AI is powered by Groq Llama 3 for ultra-low latency responses.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
