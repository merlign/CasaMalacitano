'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
  from?: 'bottom' | 'left' | 'right'
}

const getInitial = (from: string) => ({
  opacity: 0,
  x: from === 'left' ? -30 : from === 'right' ? 30 : 0,
  y: from === 'bottom' ? 20 : 0,
})

export default function FadeIn({ children, delay = 0, className = '', from = 'bottom' }: FadeInProps) {
  return (
    <motion.div
      initial={getInitial(from)}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
