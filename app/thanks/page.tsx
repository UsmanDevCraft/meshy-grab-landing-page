"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import OpenExtensionButton from "@/components/ui/OpenExtensionButton";

type ActivationStatus = "activating" | "active" | "delayed";

function ThanksContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<ActivationStatus>("activating");
  const [attemptCount, setAttemptCount] = useState(0);

  const ptxn = searchParams.get("_ptxn");
  const userId = searchParams.get("userId");
  const email = searchParams.get("email");

  const checkEntitlement = useCallback(async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const params = new URLSearchParams();
      if (ptxn) params.set("_ptxn", ptxn);
      if (userId) params.set("userId", userId);
      if (email) params.set("email", email);

      const queryString = params.toString();
      const endpoint = `${baseUrl}/api/entitlement${
        queryString ? `?${queryString}` : ""
      }`;

      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (
          data.isPaid === true ||
          data.active === true ||
          data.isPro === true ||
          data.status === "active"
        ) {
          setStatus("active");
          return true;
        }
      }
    } catch (err) {
      console.warn("Entitlement check failed during polling:", err);
    }
    return false;
  }, [ptxn, userId, email]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let retries = 0;
    const maxRetries = 15; // Poll every 2 seconds for up to 30 seconds

    const poll = async () => {
      const isActivated = await checkEntitlement();
      if (isActivated) return;

      retries++;
      setAttemptCount(retries);

      if (retries < maxRetries) {
        timer = setTimeout(poll, 2000);
      } else {
        setStatus("delayed");
      }
    };

    poll();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [checkEntitlement]);

  const handleManualRetry = () => {
    setStatus("activating");
    setAttemptCount(0);
    checkEntitlement().then((isActivated) => {
      if (!isActivated) {
        let retries = 0;
        const maxRetries = 10;
        const interval = setInterval(async () => {
          retries++;
          setAttemptCount(retries);
          const active = await checkEntitlement();
          if (active || retries >= maxRetries) {
            clearInterval(interval);
            if (!active) setStatus("delayed");
          }
        }, 2000);
      }
    });
  };

  if (status === "activating") {
    return (
      <main
        id="main-content"
        className="min-h-screen flex items-center justify-center pt-24 pb-16"
      >
        <div className="container mx-auto max-w-xl px-6 text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-lime/10 border-2 border-lime/30 flex items-center justify-center relative">
            <div className="w-12 h-12 border-3 border-lime border-t-transparent rounded-full animate-spin" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/20 rounded-full text-xs font-semibold text-lime mb-6">
            <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
            Activating Pro Subscription
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            Activating your MeshyGrab Pro subscription...
          </h1>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto">
            Please wait a moment while our backend processes your payment and
            activates unlimited downloads for your account.
          </p>

          <div className="p-4 bg-bg-card border border-border-subtle rounded-2xl max-w-sm mx-auto mb-8 text-sm text-text-muted">
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 text-lime animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeDasharray="32"
                  strokeDashoffset="12"
                />
              </svg>
              <span>Checking entitlement status... ({attemptCount}/15)</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (status === "delayed") {
    return (
      <main
        id="main-content"
        className="min-h-screen flex items-center justify-center pt-24 pb-16"
      >
        <div className="container mx-auto max-w-xl px-6 text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-amber-400">
            <svg
              className="w-12 h-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-400 mb-6">
            Payment Received — Processing
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            Subscription is processing...
          </h1>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto">
            Your payment was successful! The payment confirmation webhook is
            taking a bit longer than expected to process.
          </p>

          <div className="p-4 bg-bg-card border border-border-subtle rounded-2xl max-w-md mx-auto mb-8 text-sm text-text-secondary text-left space-y-2">
            <p className="font-semibold text-text-primary">
              What happens next?
            </p>
            <p className="text-xs text-text-muted">
              Your MeshyGrab Pro status will automatically update in your
              extension within 1-2 minutes once Paddle finishes sending the
              confirmation.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={handleManualRetry} className="btn btn-primary">
              Check Status Again
            </button>
            <OpenExtensionButton />
            <Link href="/" className="btn btn-secondary">
              Back to MeshyGrab
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Active / Pro Success State
  return (
    <main
      id="main-content"
      className="min-h-screen flex items-center justify-center pt-24 pb-16"
    >
      <div className="container mx-auto max-w-xl px-6 text-center">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-lime/10 border-2 border-lime/30 flex items-center justify-center animate-pulse-glow">
          <svg
            className="w-12 h-12 text-lime"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          You are officially Pro.
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed mb-10">
          Your MeshyGrab Pro subscription is active. Unlimited downloads are now
          available for your account.
        </p>

        <div className="flex flex-col gap-3 max-w-sm mx-auto mb-10">
          <div className="flex items-center gap-3 px-4 py-3 bg-bg-card border border-border-subtle rounded-xl text-text-secondary text-[0.9375rem]">
            <svg
              className="w-5 h-5 text-lime flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Pro subscription active
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-bg-card border border-border-subtle rounded-xl text-text-secondary text-[0.9375rem]">
            <svg
              className="w-5 h-5 text-lime flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Unlimited downloads
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-bg-card border border-border-subtle rounded-xl text-text-secondary text-[0.9375rem]">
            <svg
              className="w-5 h-5 text-lime flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Ready to use MeshyGrab
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <OpenExtensionButton />
          <Link href="/" className="btn btn-secondary">
            Back to MeshyGrab
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ThanksPage() {
  return (
    <>
      <Suspense
        fallback={
          <main
            id="main-content"
            className="min-h-screen flex items-center justify-center pt-24 pb-16"
          >
            <div className="container mx-auto max-w-xl px-6 text-center">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-lime/10 border-2 border-lime/30 flex items-center justify-center relative">
                <div className="w-12 h-12 border-3 border-lime border-t-transparent rounded-full animate-spin" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                Activating your MeshyGrab Pro subscription...
              </h1>
            </div>
          </main>
        }
      >
        <ThanksContent />
      </Suspense>
      <Footer minimal />
    </>
  );
}
