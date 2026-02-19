"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./logo";

export function AuthBackButton({ className }: { className?: string }) {
  return (
    <div
      className={`absolute top-6 left-6 z-30 flex flex-col items-center gap-3 ${className ?? ""}`}
    >
      <Link
        href='/'
        className='inline-flex items-center gap-2 px-4 py-2 rounded-lg glow-button text-sm font-semibold shadow-sm'
      >
        <ArrowLeft className='w-4 h-4' />
        <span className='hidden sm:inline'>Back to home</span>
      </Link>

      {/* keep a compact logo for brand recognition */}
      <Logo imageClassName='w-36' />
    </div>
  );
}
