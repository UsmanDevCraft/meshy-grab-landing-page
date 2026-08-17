"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useRef, useSyncExternalStore } from "react";

type CometCardProps = {
  rotateDepth?: number;
  translateDepth?: number;
  glareOpacity?: number;
  scaleFactor?: number;
  className?: string;
  children: React.ReactNode;
};

const SPRING = {
  stiffness: 180,
  damping: 20,
  mass: 0.45,
};

function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query],
  );

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => serverFallback;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function CometCard({
  rotateDepth = 17.5,
  translateDepth = 20,
  glareOpacity = 0.4,
  scaleFactor = 1.05,
  className = "",
  children,
}: CometCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)", false);
  const reducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
    false,
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  /*
   * This is the important part.
   *
   * Explicit spring physics makes the card much more responsive
   * than relying on Motion's default spring configuration.
   */
  const mouseXSpring = useSpring(x, SPRING);
  const mouseYSpring = useSpring(y, SPRING);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`],
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`],
  );

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`],
  );

  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${translateDepth}px`, `-${translateDepth}px`],
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [-60, 60]);

  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [-60, 60]);

  const glareBackground = useMotionTemplate`
    radial-gradient(
      circle at ${glareX}px ${glareY}px,
      rgba(255, 255, 255, 0.35),
      transparent 55%
    )
  `;

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || !canHover || reducedMotion) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();

      const xPercent = (event.clientX - rect.left) / rect.width - 0.5;

      const yPercent = (event.clientY - rect.top) / rect.height - 0.5;

      x.set(xPercent);
      y.set(yPercent);
    },
    [canHover, reducedMotion, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <LazyMotion features={domAnimation} strict={false}>
      <div
        className={`relative w-full ${className}`}
        style={{
          perspective: "1200px",
        }}
      >
        <m.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full rounded-2xl will-change-transform"
          initial={{
            scale: 1,
            z: 0,
          }}
          whileHover={
            canHover && !reducedMotion
              ? {
                  scale: scaleFactor,
                  z: 50,
                  transition: {
                    duration: 0.22,
                    ease: "easeOut",
                  },
                }
              : undefined
          }
          style={{
            rotateX: canHover && !reducedMotion ? rotateX : 0,

            rotateY: canHover && !reducedMotion ? rotateY : 0,

            translateX: canHover && !reducedMotion ? translateX : 0,

            translateY: canHover && !reducedMotion ? translateY : 0,

            transformStyle: "preserve-3d",
          }}
        >
          {children}

          {/* Mouse-following glare */}

          {canHover && !reducedMotion && (
            <m.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                z-50
                overflow-hidden
                rounded-[inherit]
              "
            >
              <m.div
                className="
                  absolute
                  -inset-32
                  rounded-full
                  blur-3xl
                "
                style={{
                  x: glareX,
                  y: glareY,
                  opacity: glareOpacity,
                  background: glareBackground,
                }}
              />
            </m.div>
          )}
        </m.div>
      </div>
    </LazyMotion>
  );
}
