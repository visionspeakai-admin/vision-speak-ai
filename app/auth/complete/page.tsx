"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { AuthBackButton } from "@/components/shared/back-to-home";

function AuthCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuthToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setAuthToken(token);
      // Wait a moment for the AuthProvider to fetch the user before redirecting
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } else {
      router.push("/auth/login?error=oauth_failed");
    }
  }, [searchParams, setAuthToken, router]);

  return (
    <div className='flex h-screen w-full items-center justify-center bg-background'>
      <AuthBackButton />
      <div className='text-center'>
        <div className='mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto'></div>
        <h2 className='text-xl font-semibold text-foreground'>
          Completing authentication...
        </h2>
        <p className='text-muted-foreground mt-2'>Setting up your session</p>
      </div>
    </div>
  );
}

export default function AuthCompletePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCompleteContent />
    </Suspense>
  );
}
