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
  name: string;
  badge: string;
  price: string;
  period?: string;
  originalPrice?: string;
  savings?: string;
  subtitle?: string;
  features: string[];
  cta: string;
  href: string;
  isBestValue?: boolean;
  isPremium?: boolean;
}
