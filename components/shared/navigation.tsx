"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Scroll animations
  const navHeight = useTransform(scrollY, [0, 50], ["6rem", "5rem"]);
  const navBgOpacity = useTransform(scrollY, [0, 50], [0.5, 0.85]);
  const navBorderOpacity = useTransform(scrollY, [0, 50], [0.05, 0.1]);
  const navBackdropBlur = useTransform(scrollY, [0, 50], ["12px", "20px"]);

  const navLinks = [
    { label: "Technology", href: "/technology" },
    { label: "Solutions", href: "/solutions" },
    { label: "Contact", href: "/contact" },
    { label: "Developers", href: "/developers" },
    { label: "Pricing", href: "/pricing" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <motion.nav
      style={{
        height: navHeight,
        backgroundColor: `rgba(5, 5, 5, ${navBgOpacity.get()})`,
        backdropFilter: `blur(${navBackdropBlur.get()})`,
        borderBottom: `1px solid rgba(255, 255, 255, ${navBorderOpacity.get()})`,
      }}
      className='fixed top-0 left-0 right-0 z-50 transition-colors duration-300'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
        <div className='flex items-center justify-between h-full'>
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-1'>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg group",
                    isActive
                      ? "text-cyan-electric"
                      : "text-slate-400 hover:text-white",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId='nav-active'
                      className='absolute inset-0 bg-cyan-electric/5 border border-cyan-electric/20 rounded-lg -z-10'
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {link.label}
                  <span className='absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-electric/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500' />
                </Link>
              );
            })}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className='flex items-center gap-4'>
            <div className='hidden sm:flex items-center gap-3'>
              {/* CTA: always visible. If user logged in -> Dashboard, otherwise -> Try VisionSpeak AI */}
              {user ? (
                <Link
                  href='/dashboard'
                  className='px-6 py-2.5 text-sm font-bold rounded-xl glow-button'
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href='/demo'
                  className='px-6 py-2.5 text-sm font-bold rounded-xl glow-button'
                >
                  Try VisionSpeak AI
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className='md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors relative z-50'
              aria-label='Toggle menu'
            >
              <AnimatePresence mode='wait'>
                {isOpen ? (
                  <motion.div
                    key='close'
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key='menu'
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-40 bg-obsidian/60 backdrop-blur-2xl md:hidden'
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className='absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-obsidian border-l border-white/5 p-8 flex flex-col shadow-2xl'
            >
              <div className='flex flex-col gap-6 mt-12'>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-2xl font-bold transition-colors block",
                        pathname === link.href
                          ? "text-cyan-electric"
                          : "text-white/60 hover:text-white",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className='mt-8 pt-8 border-t border-white/5 space-y-4'
                >
                  {user ? (
                    <>
                      <Link
                        href='/dashboard'
                        className='w-full py-4 text-center block text-sm font-bold rounded-xl glow-button'
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href='/auth/logout'
                        className='w-full py-4 text-center block text-sm font-bold rounded-xl border border-white/10 hover:bg-white/5 transition-colors opacity-0 pointer-events-none'
                        onClick={() => setIsOpen(false)}
                      >
                        Login to Portal
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href='/auth/signup'
                        className='w-full py-4 text-center block text-sm font-bold rounded-xl glow-button'
                        onClick={() => setIsOpen(false)}
                      >
                        Get Started Free
                      </Link>
                      <Link
                        href='/auth/login'
                        className='w-full py-4 text-center block text-sm font-bold rounded-xl border border-white/10 hover:bg-white/5 transition-colors'
                        onClick={() => setIsOpen(false)}
                      >
                        Login to Portal
                      </Link>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Decorative element */}
              <div className='mt-auto opacity-20'>
                <div className='h-px bg-gradient-to-r from-transparent via-cyan-electric to-transparent mb-4' />
                <p className='text-[10px] text-center uppercase tracking-widest text-slate-500 font-bold'>
                  VisionSpeakAI Precision Core v1.0
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
