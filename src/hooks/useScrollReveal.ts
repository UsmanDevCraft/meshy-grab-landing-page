"use client";

import { useEffect, useRef } from "react";

let sharedObserver: IntersectionObserver | null = null;
const observedElements = new Set<Element>();

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (sharedObserver) {
              sharedObserver.unobserve(entry.target);
              observedElements.delete(entry.target);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
  }

  return sharedObserver;
}

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already visible or reduced motion is preferred, reveal immediately
    if (
      el.classList.contains("visible") ||
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      el.classList.add("visible");
      return;
    }

    const observer = getSharedObserver();
    if (!observer) {
      el.classList.add("visible");
      return;
    }

    observedElements.add(el);
    observer.observe(el);

    return () => {
      if (sharedObserver) {
        sharedObserver.unobserve(el);
        observedElements.delete(el);
      }
    };
  }, []);

  return ref;
}
