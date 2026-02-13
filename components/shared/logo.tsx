'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LogoProps {
    className?: string
    imageClassName?: string
    textClassName?: string
    showText?: boolean
    href?: string
    src?: string // Allow passing an image source
}

export function Logo({
    className,
    imageClassName,
    textClassName,
    showText = true,
    href = "/",
    src
}: LogoProps) {
    return (
        <Link href={href} className={cn("flex items-center gap-3 group", className)}>
            <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className={cn(
                    "relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-electric to-cyan-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.3)] overflow-hidden",
                    imageClassName
                )}
            >
                {src ? (
                    <Image
                        src={src}
                        alt="VisionSpeak Logo"
                        fill
                        className="object-cover"
                    />
                ) : (
                    <span className="text-obsidian font-black text-sm relative z-10">VS</span>
                )}

                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.div>

            {showText && (
                <span className={cn(
                    "text-white group-hover:text-cyan-electric transition-colors tracking-tighter uppercase font-black",
                    textClassName
                )}>
                    VisionSpeak
                </span>
            )}
        </Link>
    )
}
