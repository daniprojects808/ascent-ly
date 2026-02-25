"use client";

import { useEffect, useState, useRef } from "react";

interface MetricCardProps {
  label: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
  subtitle?: string;
  delay?: number;
  size?: "default" | "large";
}

function useCountUp(target: number, duration: number = 1200, delay: number = 0) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const animationFrame = useRef<number | undefined>(undefined);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime.current) startTime.current = timestamp;
        const progress = Math.min((timestamp - startTime.current) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));

        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(animate);
        }
      };
      animationFrame.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [target, duration, delay]);

  return count;
}

export default function MetricCard({
  label,
  value,
  color,
  icon,
  subtitle,
  delay = 0,
  size = "default",
}: MetricCardProps) {
  const count = useCountUp(value, 1200, delay);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#1e2028] backdrop-blur-sm transition-all duration-500 hover:border-gray-300 dark:hover:border-white/[0.15] hover:shadow-md hover:scale-[1.02] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${size === "large" ? "p-8" : "p-6"}`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Gradient glow background */}
      <div
        className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${color}, transparent 70%)`,
        }}
      />

      {/* Inner shadow effect */}
      <div className="absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400 font-medium">
            {label}
          </span>
          {icon && (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color}15` }}
            >
              <div style={{ color }}>{icon}</div>
            </div>
          )}
        </div>

        <div className="flex items-end gap-2">
          <span
            className={`font-bold tracking-tight ${
              size === "large" ? "text-6xl" : "text-4xl"
            }`}
            style={{ color }}
          >
            {count}
          </span>
        </div>

        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
