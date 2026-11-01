"use client";

import SeasonalSaleBanner, {
  SeasonalSaleBannerProps,
} from "./SeasonalSaleBanner";

export type FallSaleBannerProps = SeasonalSaleBannerProps;

/**
 * FallSaleBanner - Backwards-compatible wrapper for SeasonalSaleBanner.
 * Dynamically renders the seasonal sale banner and countdown timer from centralized configuration.
 */
export default function FallSaleBanner(props: FallSaleBannerProps) {
  return <SeasonalSaleBanner {...props} />;
}
