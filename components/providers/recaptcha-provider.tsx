'use client';

import React, { useEffect } from 'react';

declare global {
    interface Window {
        grecaptcha: any;
    }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LfO2GgsAAAAAAe3-vODuuc5KCqB6lNmkwcuk7Dh'; // Placeholder

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            const scripts = document.querySelectorAll(`script[src^="https://www.google.com/recaptcha/api.js"]`);
            scripts.forEach((s) => s.remove());
        };
    }, []);

    return <>{children}</>;
}

export const getRecaptchaToken = async (action: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined' || !window.grecaptcha) {
            reject('reCAPTCHA not loaded');
            return;
        }

        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(RECAPTCHA_SITE_KEY, { action })
                .then((token: string) => {
                    resolve(token);
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    });
};
