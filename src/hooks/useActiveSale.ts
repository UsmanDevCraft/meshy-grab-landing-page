"use client";

import { useState, useEffect } from "react";
import { SaleConfig } from "@/constants/salesConfig";
import { getActiveSale } from "@/utils/saleHelpers";

/**
 * Hydrated client hook for components to reactively subscribe to active sale state.
 * Evaluates getActiveSale() consistently across SSR and client hydration, with periodic interval checks
 * to seamlessly revert UI when a sale expires without requiring a hard refresh.
 */
export function useActiveSale(): {
  isActive: boolean;
  saleData: SaleConfig | null;
} {
  const [saleState, setSaleState] = useState(() => getActiveSale());

  useEffect(() => {
    // Check periodically in case the sale ends while the user has the page open
    const interval = setInterval(() => {
      const next = getActiveSale();
      setSaleState((prev) => {
        if (
          prev.isActive !== next.isActive ||
          prev.saleData?.id !== next.saleData?.id
        ) {
          return next;
        }
        return prev;
      });
    }, 15_000);

    return () => clearInterval(interval);
  }, []);

  return saleState;
}

