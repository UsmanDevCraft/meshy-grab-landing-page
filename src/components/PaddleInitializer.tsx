"use client";

import { useEffect, useRef } from "react";
import { initializePaddle } from "@paddle/paddle-js";

export default function PaddleInitializer() {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    const token = process.env.NEXT_PUBLIC_PADDLE_SANDBOX_CLIENT_TOKEN;

    if (!token) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Paddle client token is missing. Please set NEXT_PUBLIC_PADDLE_SANDBOX_CLIENT_TOKEN.",
        );
      }
      return;
    }

    initializedRef.current = true;

    initializePaddle({
      environment: "sandbox",
      token: token,
    }).catch((err) => {
      console.error("Failed to initialize Paddle.js:", err);
    });
  }, []);

  return null;
}
