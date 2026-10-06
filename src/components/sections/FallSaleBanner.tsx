"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2026-10-20T23:59:59").getTime();

function calculateTimeLeft(): TimeLeft {
  const now = Date.now();
  const difference = TARGET_DATE - now;

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export default function FallSaleBanner() {
  const isClient = useIsClient();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return null;
  }

  const format = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="relative max-w-4xl mx-auto mb-6 sm:mb-8 overflow-hidden rounded-2xl p-3.5 sm:p-4 bg-gradient-to-r from-pink/20 via-bg-card to-lime/20 border border-pink/40 shadow-[0_0_30px_rgba(255,62,143,0.2)] ring-1 ring-pink/30">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-lime/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-pink/20 border border-pink/40 rounded-full text-[11px] font-bold text-pink mb-1 shadow-[0_0_10px_rgba(255,62,143,0.3)] animate-pulse">
            <span>🍁</span>
            <span>FALL FLASH SALE — UP TO 67% OFF</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-primary tracking-tight">
            Limited Time Price Discounts!
          </h2>
          <p className="text-xs text-text-secondary mt-0.5 max-w-lg leading-snug">
            Huge price cuts on Pro Max, Annual, and Lifetime. Offer ends{" "}
            <strong className="text-pink">October 20th at midnight</strong>!
          </p>
        </div>

        {/* Timer Blocks */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <div className="flex flex-col items-center">
            <div className="w-11 sm:w-13 h-11 sm:h-13 rounded-xl bg-bg-card/90 border border-pink/50 flex items-center justify-center text-base sm:text-lg font-black text-pink font-mono shadow-[0_0_10px_rgba(255,62,143,0.2)]">
              {format(timeLeft.days)}
            </div>
            <span className="text-[9px] uppercase font-bold text-text-muted mt-0.5 tracking-wider">
              Days
            </span>
          </div>

          <span className="text-base sm:text-lg font-black text-pink/60 pb-3 font-mono">
            :
          </span>

          <div className="flex flex-col items-center">
            <div className="w-11 sm:w-13 h-11 sm:h-13 rounded-xl bg-bg-card/90 border border-pink/50 flex items-center justify-center text-base sm:text-lg font-black text-pink font-mono shadow-[0_0_10px_rgba(255,62,143,0.2)]">
              {format(timeLeft.hours)}
            </div>
            <span className="text-[9px] uppercase font-bold text-text-muted mt-0.5 tracking-wider">
              Hours
            </span>
          </div>

          <span className="text-base sm:text-lg font-black text-pink/60 pb-3 font-mono">
            :
          </span>

          <div className="flex flex-col items-center">
            <div className="w-11 sm:w-13 h-11 sm:h-13 rounded-xl bg-bg-card/90 border border-lime/50 flex items-center justify-center text-base sm:text-lg font-black text-lime font-mono shadow-[0_0_10px_rgba(197,249,85,0.2)]">
              {format(timeLeft.minutes)}
            </div>
            <span className="text-[9px] uppercase font-bold text-text-muted mt-0.5 tracking-wider">
              Mins
            </span>
          </div>

          <span className="text-base sm:text-lg font-black text-lime/60 pb-3 font-mono">
            :
          </span>

          <div className="flex flex-col items-center">
            <div className="w-11 sm:w-13 h-11 sm:h-13 rounded-xl bg-bg-card/90 border border-lime/50 flex items-center justify-center text-base sm:text-lg font-black text-lime font-mono shadow-[0_0_10px_rgba(197,249,85,0.2)] animate-pulse">
              {format(timeLeft.seconds)}
            </div>
            <span className="text-[9px] uppercase font-bold text-text-muted mt-0.5 tracking-wider">
              Secs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
