"use client"

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  fill?: string;
  size?: number;
}

export function Spotlight({
  className,
  fill = "white",
  size = 500,
  ...props
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.current = e.clientX - rect.left;
      mouseY.current = e.clientY - rect.top;

      containerRef.current.style.setProperty('--mouse-x', `${mouseX.current}px`);
      containerRef.current.style.setProperty('--mouse-y', `${mouseY.current}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none fixed inset-0 z-30 transition duration-300 opacity-0 md:opacity-100",
        className
      )}
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
      } as React.CSSProperties}
      {...props}
    >
      <div
        className="absolute opacity-70 blur-[80px]"
        style={{
          background: fill === "white" ? "white" : `var(--${fill}-500, #10b981)`,
          borderRadius: "50%",
          width: `${size}px`,
          height: `${size}px`,
          left: 'calc(var(--mouse-x) - 250px)',
          top: 'calc(var(--mouse-y) - 250px)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
