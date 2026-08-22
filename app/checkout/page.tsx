"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  initializePaddle,
  getPaddleInstance,
  PaddleEventData,
  CheckoutEventNames,
} from "@paddle/paddle-js";
import Link from "next/link";
import Footer from "@/components/ui/Footer";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ptxn = searchParams.get("_ptxn");
  const installationId = searchParams.get("installationId");

  const token = process.env.NEXT_PUBLIC_PADDLE_SANDBOX_CLIENT_TOKEN;

  const initialError = !ptxn
    ? "Invalid checkout link. Transaction ID (_ptxn) is missing."
    : !installationId
      ? "Invalid checkout link. Installation ID is missing."
      : !token
        ? "Paddle configuration error. Sandbox client token is missing."
        : null;

  const [sdkError, setSdkError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>(
    "Preparing secure checkout...",
  );
  const initializedRef = useRef(false);

  const error = initialError || sdkError;

  useEffect(() => {
    if (!ptxn || !installationId || !token) return;

    if (initializedRef.current) return;
    initializedRef.current = true;

    const handlePaddleEvent = (event: PaddleEventData) => {
      if (
        event.name === CheckoutEventNames.CHECKOUT_COMPLETED ||
        (event.name as string) === "checkout.completed"
      ) {
        router.push(
          `/thanks?installationId=${encodeURIComponent(installationId)}`,
        );
      } else if (
        (event.name as string) === "checkout.error" ||
        (event.name as string) === "checkout.failed"
      ) {
        setSdkError(
          "Checkout session is invalid or expired. Please try again.",
        );
      }
    };

    const startCheckout = async () => {
      try {
        let paddle = getPaddleInstance();
        if (!paddle || !paddle.Initialized) {
          paddle = await initializePaddle({
            environment: "sandbox",
            token: token,
            eventCallback: handlePaddleEvent,
          });
        } else {
          paddle.Update({
            eventCallback: handlePaddleEvent,
          });
        }

        if (paddle && paddle.Checkout) {
          setStatusMessage("Opening secure checkout...");
          await paddle.Checkout.open({
            transactionId: ptxn,
            settings: {
              allowLogout: false,
            },
          });
        } else {
          setSdkError("Failed to initialize Paddle Checkout SDK.");
        }
      } catch (err: unknown) {
        console.error("Failed to open Paddle Checkout:", err);
        setSdkError(
          "Checkout session is invalid or expired. Please try again.",
        );
      }
    };

    startCheckout();
  }, [ptxn, installationId, token, router]);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="container mx-auto max-w-md px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-3">Checkout Session Invalid</h1>
          <p className="text-text-secondary text-sm mb-8 leading-relaxed">
            {error}
          </p>
          <div className="flex justify-center">
            <Link href="/" className="btn btn-primary">
              Try again
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center pt-24 pb-16">
      <div className="container mx-auto max-w-md px-6 text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-lime/10 border border-lime/30 flex items-center justify-center relative">
          <div className="w-10 h-10 border-3 border-lime border-t-transparent rounded-full animate-spin" />
        </div>
        <h1 className="text-2xl font-bold mb-3">{statusMessage}</h1>
        <p className="text-text-secondary text-sm leading-relaxed">
          Please wait while we connect to Paddle&apos;s encrypted payment
          gateway.
        </p>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Suspense
        fallback={
          <main className="min-h-screen flex items-center justify-center pt-24 pb-16">
            <div className="container mx-auto max-w-md px-6 text-center">
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-lime/10 border border-lime/30 flex items-center justify-center relative">
                <div className="w-10 h-10 border-3 border-lime border-t-transparent rounded-full animate-spin" />
              </div>
              <h1 className="text-2xl font-bold mb-3">
                Preparing secure checkout...
              </h1>
            </div>
          </main>
        }
      >
        <CheckoutContent />
      </Suspense>
      <Footer minimal />
    </>
  );
}
