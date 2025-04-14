"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AnimatedGradient({ className, children, ...props }: AnimatedGradientProps) {
  return (
    <div className={cn("relative overflow-hidden group", className)} {...props}>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-purple-500/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-x" />
      {children}
    </div>
  )
}
