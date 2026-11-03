"use client";

import { useEffect, useRef, useCallback } from "react";

interface HalloweenCardInteractionProps {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

const HALLOWEEN_EMOJIS = ["🎃", "👻", "🦇", "🕸️", "🕷️", "✨"];

export default function HalloweenCardInteraction({
  children,
  isActive = true,
  className = "",
}: HalloweenCardInteractionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleOverlayRef = useRef<HTMLDivElement>(null);
  const lastSpawnTimeRef = useRef<number>(0);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const activeParticlesCountRef = useRef<number>(0);
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());

  // Check prefers-reduced-motion
  const isReducedMotion = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isActive || isReducedMotion()) return;

      const now = Date.now();
      // Throttle: max 1 particle per 75ms
      if (now - lastSpawnTimeRef.current < 75) return;

      const container = containerRef.current;
      const overlay = particleOverlayRef.current;
      if (!container || !overlay) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Distance check: ensure cursor has moved at least 15px
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 15 && lastSpawnTimeRef.current !== 0) return;

      // Cap concurrent particles
      if (activeParticlesCountRef.current >= 16) {
        const first = overlay.firstElementChild;
        if (first) {
          first.remove();
          activeParticlesCountRef.current = Math.max(
            0,
            activeParticlesCountRef.current - 1,
          );
        }
      }

      lastSpawnTimeRef.current = now;
      lastPosRef.current = { x, y };

      const emoji =
        HALLOWEEN_EMOJIS[Math.floor(Math.random() * HALLOWEEN_EMOJIS.length)];
      const driftX = (Math.random() - 0.5) * 44; // -22px to +22px
      const driftY = -(38 + Math.random() * 32); // -38px to -70px
      const rotate = (Math.random() - 0.5) * 45; // -22deg to +22deg
      const size = 16 + Math.floor(Math.random() * 8); // 16px - 24px

      const particle = document.createElement("span");
      particle.textContent = emoji;
      particle.className = "halloween-particle";
      particle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        font-size: ${size}px;
        pointer-events: none;
        user-select: none;
        z-index: 40;
        --drift-x: ${driftX}px;
        --drift-y: ${driftY}px;
        --rotate: ${rotate}deg;
      `;

      overlay.appendChild(particle);
      activeParticlesCountRef.current += 1;

      const timeoutId = setTimeout(() => {
        particle.remove();
        activeParticlesCountRef.current = Math.max(
          0,
          activeParticlesCountRef.current - 1,
        );
        timeoutsRef.current.delete(timeoutId);
      }, 750);

      timeoutsRef.current.add(timeoutId);
    },
    [isActive, isReducedMotion],
  );

  // Cleanup on unmount
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    const overlay = particleOverlayRef.current;
    return () => {
      timeouts.forEach((id) => clearTimeout(id));
      timeouts.clear();
      if (overlay) {
        overlay.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative ${
        isActive ? "seasonal-halloween-cursor" : ""
      } ${className}`}
    >
      {/* Particle Overlay Container (pointer-events-none ensures buttons remain clickable) */}
      <div
        ref={particleOverlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden z-30 select-none"
      />

      {children}
    </div>
  );
}
