export interface FooterProps {
  minimal?: boolean;
}

export interface CometCardProps {
  children: React.ReactNode;
  className?: string;
  rotateDepth?: number;
  translateDepth?: number;
  glareOpacity?: number;
  scaleFactor?: number;
}

export interface PlanItem {
  id: string;
  planKey?:
    | "pro_monthly"
    | "pro_max_monthly"
    | "pro_annual"
    | "lifetime"
    | null;
  name: string;
  badge: string;
  price: string;
  period?: string;
  originalPrice?: string;
  savings?: string;
  subtitle?: string;
  communityAllowance: string;
  communityReset: string;
  accountsTotal: number;
  accountsAdditional: number;
  accountsBenefit?: string;
  features: string[];
  cta: string;
  href: string;
  isBestValue?: boolean;
  isRecommended?: boolean;
  isPremium?: boolean;
}
