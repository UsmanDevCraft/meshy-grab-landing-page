import {
  ACTIVE_SALE_ID,
  SALES_DATA,
  SaleConfig,
} from "@/constants/salesConfig";

/**
 * Evaluates whether a seasonal sale is currently active based on 3 criteria:
 * 1. process.env.NEXT_PUBLIC_IS_DISCOUNTED_PRICES === 'true'
 * 2. Current timestamp >= sale.startDate
 * 3. Current timestamp <= sale.endDate
 *
 * If any criterion is not satisfied, it automatically returns { isActive: false, saleData: null }.
 *
 * This function has no React dependencies and can be safely executed in both
 * Server Components (like generateMetadata or page.tsx) and Client Components.
 */
export function getActiveSale(now: Date = new Date()): {
  isActive: boolean;
  saleData: SaleConfig | null;
} {
  const isFlagActive = process.env.NEXT_PUBLIC_IS_DISCOUNTED_PRICES === "true";
  const currentSale = SALES_DATA[ACTIVE_SALE_ID];

  if (!isFlagActive || !currentSale) {
    return { isActive: false, saleData: null };
  }

  const start = new Date(currentSale.startDate);
  const end = new Date(currentSale.endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { isActive: false, saleData: null };
  }

  const isWithinWindow =
    now.getTime() >= start.getTime() && now.getTime() <= end.getTime();

  if (!isWithinWindow) {
    return { isActive: false, saleData: null };
  }

  return { isActive: true, saleData: currentSale };
}

/**
 * Formats the end date for display in sale banners and callouts.
 * Uses sale.endDateDisplay if provided, otherwise derives a clean formatted string like "November 2nd at midnight".
 */
export function formatSaleEndDate(sale: SaleConfig): string {
  if (sale.endDateDisplay) {
    return sale.endDateDisplay;
  }
  const date = new Date(sale.endDate);
  if (isNaN(date.getTime())) {
    return "";
  }
  const day = date.getUTCDate();
  const month = date.toLocaleDateString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const suffix = ["th", "st", "nd", "rd"][
    day % 10 > 3 || Math.floor((day % 100) / 10) === 1 ? 0 : day % 10
  ];
  return `${month} ${day}${suffix} at midnight`;
}
