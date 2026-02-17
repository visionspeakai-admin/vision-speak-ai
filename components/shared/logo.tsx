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
  text?: string;
}

export function Logo({
  className,
  imageClassName,
  textClassName,
  showText = false,
  href = "/",
  src = "/images/logo.webp",
  text = "VSpeakX",
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("flex items-center space-x-3 group", className)}
    >
      <motion.div
        className={cn(
          // size by height and let width follow the logo aspect ratio; left-align on large widths
          "relative inline-flex h-10 md:h-12 lg:h-16 items-center justify-center lg:justify-start pl-0 lg:pl-2 overflow-visible transition-all",
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
            "text-white group-hover:text-cyan-electric transition-colors tracking-tighter font-black",
            textClassName,
          )}
        >
          {text}
        </span>
      )}
    </Link>
  );
}
