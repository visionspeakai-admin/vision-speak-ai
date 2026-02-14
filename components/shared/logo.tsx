"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  showText?: boolean;
  href?: string;
  src?: string; // Allow passing an image source
}

export function Logo({
  className,
  imageClassName,
  textClassName,
  showText = false,
  href = "/",
  src = "images/logo.webp",
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("flex items-center group", className)}
    >
      <motion.div
        className={cn(
          // size by height and let width follow the logo aspect ratio; allow hover glow to overflow
          "relative inline-flex h-10 md:h-12 lg:h-16 rounded-xl items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.3)] overflow-visible transition-all",
          imageClassName,
        )}
        // prefer a 3:1 aspect by default (matches previous w-60 h-20); container height controls rendered size
        style={{ aspectRatio: "3 / 1" }}
      >
        {src ? (
          <Image
            src={src}
            alt='VisionSpeak Logo'
            // provide intrinsic dimensions so Image preserves aspect ratio while we control CSS height
            width={800}
            height={600}
            className='h-full w-auto object-contain'
          />
        ) : (
          <span className='text-obsidian font-black text-sm relative z-10'>
            VS
          </span>
        )}

        {/* Subtle glow effect (no clipping) */}
        <div className='absolute -inset-3 rounded-xl bg-white/10 opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none' />
      </motion.div>

      {showText && (
        <span
          className={cn(
            "text-white group-hover:text-cyan-electric transition-colors tracking-tighter uppercase font-black",
            textClassName,
          )}
        >
          VisionSpeak
        </span>
      )}
    </Link>
  );
}
