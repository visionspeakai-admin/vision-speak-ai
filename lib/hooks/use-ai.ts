'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function useAI() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (content: string) => {
        const userMessage: Message = { role: 'user', content };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await api.post('/tools/chat', {
                message: content,
                history: messages, // Send history if backend supports it
            });

            if (response.status === 'success' && response.data) {
                const assistantMessage: Message = {
                    role: 'assistant',
                    content: response.data.message || response.data.response,
                };
                setMessages((prev) => [...prev, assistantMessage]);
            }
        } catch (error) {
            console.error('AI Chat error:', error);
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again later.',
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return {
        messages,
        isLoading,
        sendMessage,
        clearChat,
    };
}
