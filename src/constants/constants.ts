import { PlanItem } from "@/types/types";

export const faqs = [
  {
    q: "What is MeshyGrab?",
    a: "MeshyGrab is a Chrome extension that helps Meshy users preview and download their 3D models in all formats: GLB, OBJ, FBX, 3MF, STL, and texture exports.",
  },
  {
    q: "Does MeshyGrab generate 3D models?",
    a: "No. MeshyGrab does not generate models. You create your model in Meshy, and MeshyGrab focuses on helping you access and export the generated model files.",
  },
  {
    q: "What formats does MeshyGrab download?",
    a: "MeshyGrab is designed to download generated Meshy models in all popular 3D formats (GLB, OBJ, FBX, 3MF, STL) as well as full texture maps (PNG).",
  },
  {
    q: "How many free downloads do I get?",
    a: "The Free plan includes 2 free downloads across all supported formats.",
  },
  {
    q: "How much is Pro?",
    a: "Pro starts at $0.99/month and provides unlimited downloads for all 3D formats and texture exports.",
  },
  {
    q: "Do I need to provide a Meshy API key?",
    a: "MeshyGrab is designed so users do not need to manually configure or provide a Meshy API token.",
  },
  {
    q: "Is MeshyGrab an official Meshy product?",
    a: "No. MeshyGrab is an independent third-party product and is not affiliated with, endorsed by, or sponsored by Meshy.",
  },
];

export const checks = [
  "Model preview before download",
  "All 3D formats (GLB, OBJ, FBX, 3MF, STL)",
  "Full texture maps & PNG exports",
  "Download entitlement tracking",
];

export const plans = [
  {
    name: "Free",
    badge: "Free",
    price: "$0",
    period: "",
    features: [
      "2 free downloads (all formats)",
      "GLB, OBJ, FBX, 3MF, STL & textures",
      "Model preview before download",
    ],
    cta: "Try MeshyGrab Free",
    primary: false,
  },
  {
    name: "Pro",
    badge: "Pro",
    price: "$0.99",
    period: "/month",
    features: [
      "Unlimited 3D downloads",
      "GLB, OBJ, FBX, 3MF, STL & textures",
      "Full extension functionality",
    ],
    cta: "Get Pro",
    primary: true,
  },
];

export const valueProps = [
  {
    title: "Download what you generated",
    desc: "Get the model you've already created in Meshy in any format.",
  },
  {
    title: "All formats & texture exports",
    desc: "Export as GLB, OBJ, FBX, 3MF, STL, and extract high-quality PNG texture maps.",
  },
  {
    title: "Preview before downloading",
    desc: "See the available model preview before starting the download.",
  },
  {
    title: "Simple Chrome extension",
    desc: "No complicated setup or developer workflow.",
  },
  {
    title: "No manual API-token setup",
    desc: "The product is designed around a simple user workflow rather than requiring users to manually configure API credentials.",
  },
  {
    title: "Unlimited with Pro",
    desc: "Upgrade to Pro for unlimited downloads across all format types.",
  },
];

export const audienceList = [
  "3D creators",
  "Game developers",
  "Indie developers",
  "Designers",
  "Prototyping workflows",
  "3D printing workflows (STL / 3MF)",
  "Creators experimenting with AI-generated 3D assets",
];

export const checks_privacy = [
  "Independent third-party extension",
  "Does not ask users to manually provide their Meshy API token",
  "Backend exists for registration, entitlement & subscription accounting",
  "Actual model download remains client-side",
];

export const steps = [
  {
    num: "1",
    title: "Generate",
    desc: "Create your 3D model in Meshy.",
  },
  {
    num: "2",
    title: "Select",
    desc: "Open and select the generated model in your Meshy workspace.",
  },
  {
    num: "3",
    title: "Grab",
    desc: "Open MeshyGrab while viewing your model.",
  },
  {
    num: "4",
    title: "Download",
    desc: "Select GLB, OBJ, FBX, 3MF, STL, or Texture export and download instantly.",
  },
];

export const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#features", label: "Benefits" },
  { href: "/#audience", label: "Who It's For" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export const plansList: PlanItem[] = [
  {
    id: "free",
    planKey: null,
    name: "Free",
    badge: "Free",
    price: "$0",
    period: "",
    subtitle: "Ideal for trying out MeshyGrab",
    communityAllowance: "1 total",
    communityReset: "One-time",
    accountsTotal: 1,
    accountsAdditional: 0,
    features: [
      "2 model downloads total (GLB, OBJ, FBX, STL, 3MF)",
      "8 texture PNG downloads total",
      "1 Community model download — one-time",
    ],
    cta: "Get Started Free",
    href: "https://chromewebstore.google.com/detail/jkddfapkjenldpiacoccgheimcokhmcc?utm_source=item-share-cb",
  },
  {
    id: "pro",
    planKey: "pro_monthly",
    name: "Pro Monthly",
    badge: "Monthly",
    price: "$0.99",
    period: "/month",
    subtitle: "Flexible monthly subscription",
    communityAllowance: "2 / month",
    communityReset: "Every month",
    accountsTotal: 1,
    accountsAdditional: 0,
    features: [
      "Unlimited GLB, OBJ, FBX, STL & 3MF",
      "Unlimited texture PNG downloads",
      "2 Community model downloads / month",
    ],
    cta: "Get Pro",
    href: "/checkout?plan=pro_monthly",
  },
  {
    id: "pro-max",
    planKey: "pro_max_monthly",
    name: "Pro Max",
    badge: "🔥 HOT — Best Value ⭐",
    price: "$3.99",
    period: "/month",
    originalPrice: "$5.99/mo",
    savings: "Save ~33%",
    subtitle: "Power option for active creators & small teams",
    communityAllowance: "8 / month",
    communityReset: "Every month",
    accountsTotal: 3,
    accountsAdditional: 2,
    accountsBenefit: "3 total Meshy accounts under 1 subscription",
    hasUpcomingPerks: true,
    features: [
      "Unlimited GLB, OBJ, FBX, STL & 3MF",
      "Unlimited texture PNG downloads",
      "8 Community model downloads / month",
      "✨ Tripo 3D Support Included",
      "Expanded Community download formats",
      "🔑 Multi-Account: 3 Meshy accounts (+2 extra)",
    ],
    cta: "Get Pro Max 🔥",
    href: "/checkout?plan=pro_max_monthly",
    isBestValue: true,
    isRecommended: true,
  },
  {
    id: "pro-annual",
    planKey: "pro_annual",
    name: "Pro Annual",
    badge: "Annual Savings",
    price: "$9.99",
    period: "/year",
    originalPrice: "$12/year",
    savings: "Save ~17%",
    subtitle: "Best annual rate for solo creators",
    communityAllowance: "40 / year",
    communityReset: "Every year",
    accountsTotal: 1,
    accountsAdditional: 0,
    hasUpcomingPerks: true,
    features: [
      "Unlimited GLB, OBJ, FBX, STL & 3MF",
      "Unlimited texture PNG downloads",
      "40 Community model downloads / year",
      "✨ Tripo 3D Support Included",
      "Expanded Community download formats",
      "Save ~17% compared to monthly",
    ],
    cta: "Get Annual",
    href: "/checkout?plan=pro_annual",
  },
  {
    id: "lifetime",
    planKey: "lifetime",
    name: "Lifetime 🔥",
    badge: "🔥 Users' Favourite — Limited Sale",
    price: "$19.99",
    period: "one-time",
    originalPrice: "$29.99",
    savings: "Save ~33%",
    subtitle: "Pay once, keep forever. Priority updates & zero recurring fees.",
    communityAllowance: "Unlimited",
    communityReset: "Unlimited",
    accountsTotal: 5,
    accountsAdditional: 4,
    accountsBenefit: "5 total Meshy accounts under 1 purchase",
    hasUpcomingPerks: true,
    features: [
      "Unlimited GLB, OBJ, FBX, STL & 3MF",
      "Unlimited texture PNG downloads",
      "Unlimited Community model downloads",
      "✨ Tripo 3D Support Included",
      "Expanded Community download formats",
      "🔥 Multi-Account: 5 Meshy accounts (+4 extra)",
      "Always priority access to all updates & beta features",
      "Zero recurring subscription fees",
    ],
    cta: "Grab Lifetime Deal 🔥",
    href: "/checkout?plan=lifetime",
    isPremium: true,
  },
];

export function getPlansList(isDiscounted: boolean = false): PlanItem[] {
  if (!isDiscounted) {
    return plansList;
  }

  return plansList.map((plan) => {
    if (plan.id === "pro-max") {
      return {
        ...plan,
        badge: "🍁 Fall Sale — 50% OFF 🔥",
        price: "$2.99",
        originalPrice: "$5.99/mo",
        savings: "Save ~50%",
        cta: "Get Pro Max ($2.99) 🔥",
      };
    }
    if (plan.id === "pro-annual") {
      return {
        ...plan,
        badge: "🍁 Fall Sale — 40% OFF",
        price: "$5.99",
        originalPrice: "$9.99/yr",
        savings: "Save 40%",
        cta: "Get Annual ($5.99)",
        features: plan.features.map((f) =>
          f.includes("Save ~17%") ? "Save 40% compared to monthly" : f,
        ),
      };
    }
    if (plan.id === "lifetime") {
      return {
        ...plan,
        badge: "🍁 Fall Sale — 67% OFF 🔥",
        price: "$9.99",
        originalPrice: "$29.99",
        savings: "Save 67%",
        cta: "Grab Lifetime\n($9.99) 🔥",
      };
    }
    return plan;
  });
}
