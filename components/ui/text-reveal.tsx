"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TextRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  threshold?: number
}

export function TextReveal({ className, children, threshold = 0.1, ...props }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add("animate-in")
          observer.disconnect()
        }
      },
      {
        threshold,
      },
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return (
    <div ref={ref} className={cn("opacity-0 translate-y-8 transition-all duration-700 ease-out", className)} {...props}>
      {children}
    </div>
  )
}
