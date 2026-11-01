export interface SaleConfig {
  id: string; // e.g., 'halloween_2026', 'fall_2026', 'winter_2026'
  title: string; // e.g., "Halloween Spooktacular Sale!"
  bannerText: string;
  badgeText?: string;
  startDate: string; // ISO format: YYYY-MM-DDTHH:mm:ssZ
  endDate: string; // ISO format: YYYY-MM-DDTHH:mm:ssZ
  themeKey?: string; // Optional identifier for UI styling/themes
  emoji?: string; // Visual icon/emoji representing the season (e.g. 🎃, 🍁, ❄️)
  discountPercentageText?: string; // e.g. "UP TO 67% OFF"
  endDateDisplay?: string; // Optional human-readable end date string for UI display
}

export const ACTIVE_SALE_ID = "halloween_2026"; // Easily change current season target

export const SALES_DATA: Record<string, SaleConfig> = {
  fall_2026: {
    id: "fall_2026",
    title: "Fall Savings Event",
    bannerText: "Enjoy major discounts across all plans this Fall!",
    badgeText: "FALL SALE",
    startDate: "2026-09-01T00:00:00Z",
    endDate: "2026-10-25T23:59:59Z",
    emoji: "🍁",
    themeKey: "fall",
    discountPercentageText: "UP TO 67% OFF",
    endDateDisplay: "October 25th at midnight",
  },
  halloween_2026: {
    id: "halloween_2026",
    title: "Spooktacular Halloween Sale",
    bannerText: "Treat yourself to screaming good prices before midnight!",
    badgeText: "HALLOWEEN SPECIAL",
    startDate: "2026-11-01T00:00:00Z",
    endDate: "2026-11-21T23:59:59Z",
    emoji: "🎃",
    themeKey: "halloween",
    discountPercentageText: "UP TO 67% OFF",
    endDateDisplay: "November 21st at midnight",
  },
  winter_2026: {
    id: "winter_2026",
    title: "Winter Wonderland Sale",
    bannerText: "Warm up your 3D workflow with freezing-cold prices!",
    badgeText: "WINTER SALE",
    startDate: "2026-12-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    emoji: "❄️",
    themeKey: "winter",
    discountPercentageText: "UP TO 67% OFF",
    endDateDisplay: "December 31st at midnight",
  },
};
