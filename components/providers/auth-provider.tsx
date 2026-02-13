'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, ApiResponse } from '@/lib/api';

interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string | null;
    email_verified_at: string | null;
    current_plan: string | null;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password_hash: string, captcha_token?: string) => Promise<void>;
    register: (data: any, captcha_token?: string) => Promise<void>;
    logout: () => Promise<void>;
    setAuthToken: (token: string) => void;
    updateUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
            setToken(storedToken);
            fetchUser(storedToken);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchUser = async (authToken: string) => {
        try {
            const response = await api.get<any>('/user');
            if (response.status === 'success' && response.data) {
                // The API reference says the user is in response.data.user
                const userData = response.data.user || response.data;
                setUser(userData);
            } else {
                console.warn('User fetch successful but returned unexpected format:', response);
            }
        } catch (error: any) {
            console.error('Failed to fetch user profile:', {
                message: error.message,
                status: error.status,
                code: error.code,
                error
            });
            // If unauthorized or error, clear token to prevent loop
            localStorage.removeItem('auth_token');
            setToken(null);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const setAuthToken = (newToken: string) => {
        localStorage.setItem('auth_token', newToken);
        setToken(newToken);
        fetchUser(newToken);
    };

    const login = async (email: string, password_hash: string, captcha_token?: string) => {
        const response = await api.post<{ user: User; token: string }>('/auth/login', {
            email,
            password_hash,
            captcha_token,
        });
        if (response.status === 'success' && response.data) {
            setAuthToken(response.data.token);
        }
    };

    const register = async (data: any, captcha_token?: string) => {
        const response = await api.post<{ user: User; token: string }>('/auth/register', {
            ...data,
            captcha_token,
        });
        if (response.status === 'success' && response.data) {
            setAuthToken(response.data.token);
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('auth_token');
            setToken(null);
            setUser(null);
        }
    };

    const updateUser = async () => {
        if (token) await fetchUser(token);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                isLoading,
                login,
                register,
                logout,
                setAuthToken,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
