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
    features: [
      "2 free downloads (GLB, OBJ, FBX, 3MF, STL)",
      "Texture PNG downloads included",
      "Basic extension functionality",
    ],
    cta: "Get Started Free",
    href: "https://chromewebstore.google.com/detail/jkddfapkjenldpiacoccgheimcokhmcc?utm_source=item-share-cb",
  },
  {
    id: "pro",
    planKey: "pro_monthly",
    name: "Pro",
    badge: "Monthly",
    price: "$0.99",
    period: "/month",
    subtitle: "Flexible monthly subscription",
    features: [
      "Unlimited GLB, OBJ, FBX downloads",
      "Unlimited 3MF & STL 3D printing formats",
      "Unlimited texture PNG downloads",
      "Full Pro features",
    ],
    cta: "Get Pro",
    href: "/checkout?plan=pro_monthly",
  },
  {
    id: "pro-annual",
    planKey: "pro_annual",
    name: "Pro Annual ⭐",
    badge: "Best Value ⭐",
    price: "$9.99",
    period: "/year",
    originalPrice: "$12/year",
    savings: "Save ~17%",
    subtitle: "Recommended for active creators",
    features: [
      "Everything in Pro (all 3D & texture formats)",
      "New updates shared with you first",
      "New features shared with you first",
    ],
    cta: "Get Annual",
    href: "/checkout?plan=pro_annual",
    isBestValue: true,
  },
  {
    id: "lifetime",
    planKey: "lifetime",
    name: "Lifetime 🔥",
    badge: "Lifetime 🔥",
    price: "$49",
    period: "one-time",
    subtitle: "Pay once, use forever",
    features: [
      "Everything in Pro (all 3D & texture formats)",
      "New updates shared with you first",
      "New features shared with you first",
      "No recurring payments",
    ],
    cta: "Get Lifetime",
    href: "/checkout?plan=lifetime",
    isPremium: true,
  },
];
