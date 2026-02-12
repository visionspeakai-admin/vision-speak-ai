'use client'

import { motion } from 'framer-motion'

interface StaggeredTextProps {
  text: string
  className?: string
  staggerDelay?: number
  delay?: number
}

export function StaggeredText({
  text,
  className = '',
  staggerDelay = 0.05,
  delay = 0,
}: StaggeredTextProps) {
  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay + custom * 0.1,
      },
    }),
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      custom={0}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={wordVariants} className="inline-block mr-2">
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
