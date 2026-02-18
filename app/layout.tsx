import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { BackgroundEffects } from "@/components/shared/background-effects";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "VisionSpeakAI - AI Lip-Reading & Gesture Recognition API - VSpeakX 1.0",
  description:
    "Revolutionize communication with AI-driven Lip-Reading and Gesture Recognition powered by NVIDIA technology. Enterprise-grade API for accessibility, security, and retail applications.",
  keywords: [
    "AI",
    "Lip Reading",
    "Gesture Recognition",
    "API",
    "NVIDIA",
    "Accessibility",
  ],
  authors: [{ name: "VisionSpeakAI" }],
  creator: "VisionSpeakAI",
  icons: {
    icon: "/images/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://visionspeakai.com",
    title: "VisionSpeakAI - AI Lip-Reading & Gesture Recognition - VSpeakX 1.0",
    description:
      "Revolutionize communication with AI-driven capabilities powered by NVIDIA technology.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050505",
};

import { AuthProvider } from "@/components/providers/auth-provider";
import { RecaptchaProvider } from "@/components/providers/recaptcha-provider";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { ChatbotWidget } from "@/components/shared/chatbot-widget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <head />
      <body
        className={`${inter.className} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          <RecaptchaProvider>
            <BackgroundEffects />
            {children}
            <CookieConsent />
            <ChatbotWidget />
          </RecaptchaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
