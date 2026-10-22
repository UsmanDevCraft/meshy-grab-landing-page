import { PlanItem } from "@/types/types";

export const faqs = [
  {
    q: "What is MeshyGrab?",
    a: "MeshyGrab is an all-in-one 3D asset toolkit combining an interactive 3D model viewer and renderer, a universal model format converter (GLB, OBJ, FBX, STL, 3MF), an AI PBR texture upscaler (up to 4K and 8K), workspace model exports from Meshy AI, and community model downloads from Meshy Discover and Tripo3D Studio.",
  },
  {
    q: "Does MeshyGrab generate 3D models?",
    a: "No. MeshyGrab does not generate 3D models. It is a post-generation and asset utility designed for 3D creators: bringing existing files into an online workspace, previewing, converting formats, upscaling textures, and exporting files from supported platforms.",
  },
  {
    q: "What 3D formats can MeshyGrab view and convert?",
    a: "MeshyGrab supports the primary industry-standard 3D formats: GLB, OBJ, FBX, STL, and 3MF. You can import existing files into the 3D workspace for real-time inspection or convert between supported formats for game engines (Unreal, Unity), DCC tools (Blender, Maya), or 3D slicers (Bambu Studio, Cura, PrusaSlicer).",
  },
  {
    q: "How does the 4K and 8K PBR Texture Upscaler work?",
    a: "The PBR Texture Upscaler uses specialized neural enhancement to increase texture resolution from standard 2K outputs up to crisp 4K and 8K. It preserves and sharpens critical material maps—including Base Color (Albedo), Normal maps, Roughness, Metallic, Height, and Ambient Occlusion—without introducing blurred artifacts.",
  },
  {
    q: "Can I download PBR texture maps separately?",
    a: "Yes. MeshyGrab allows you to extract individual high-resolution PNG texture maps directly from supported 3D assets, making it seamless to plug them into your custom material shaders or render pipelines.",
  },
  {
    q: "What is the difference between Meshy Workspace models and Community downloads?",
    a: "Meshy Workspace models are 3D assets generated in your own Meshy account, which can be exported in all supported formats (GLB, OBJ, FBX, STL, 3MF) and texture maps. Community models are pre-generated assets from Meshy Discover or Tripo3D Studio, which have separate monthly or annual quotas depending on your plan tier.",
  },
  {
    q: "What is the Tripo3D Studio integration?",
    a: "Tripo3D support is included with Pro Max, Pro Annual, and Lifetime plans. It allows you to access and download community models from Tripo3D Studio and convert them through MeshyGrab's universal format pipeline.",
  },
  {
    q: "How many free downloads and conversions do I get?",
    a: "The Free plan provides 2 workspace model downloads total across all supported formats, 8 texture PNG downloads total, and 1 community model download, along with full access to the 3D workspace model viewer.",
  },
  {
    q: "What are the available plans and pricing?",
    a: "We offer Free ($0), Pro Monthly ($0.99/month for unlimited workspace exports & texture downloads), Pro Max ($3.99/month promotional price, with 3 linked Meshy accounts and Tripo3D support), Pro Annual ($9.99/year promotional price), and Lifetime ($19.99 promotional one-time purchase with 5 linked Meshy accounts and zero recurring fees).",
  },
  {
    q: "Is MeshyGrab an official Meshy or Tripo3D product?",
    a: "No. MeshyGrab is an independent third-party product and is not affiliated with, endorsed by, authorized by, or sponsored by Meshy (Meshy AI) or Tripo3D.",
  },
  {
    q: "Do I need to supply an API key?",
    a: "No. MeshyGrab does not require you to configure API credentials, manage developer tokens, or reveal sensitive passwords.",
  },
];

export const checks = [
  "Interactive 3D model viewer with real-time materials",
  "Universal format converter: GLB, OBJ, FBX, STL, 3MF",
  "AI PBR texture upscaling up to 4K & 8K resolution",
  "Full PBR texture maps extraction (PNG)",
  "Meshy AI workspace & Discover community downloads",
  "Tripo3D Studio community asset support",
];

export const plans = [
  {
    name: "Free",
    badge: "Free",
    price: "$0",
    period: "",
    features: [
      "2 workspace model downloads (all formats)",
      "8 texture PNG downloads total",
      "1 Community model download",
      "Interactive 3D workspace & model viewer",
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
      "Unlimited workspace model exports",
      "Unlimited texture PNG downloads",
      "Universal format converter (GLB, OBJ, FBX, STL, 3MF)",
      "4K & 8K PBR texture upscaling",
      "2 Community model downloads / month",
    ],
    cta: "Get Pro",
    primary: true,
  },
];

export const valueProps = [
  {
    title: "3D Workspace & Model Viewer",
    desc: "Inspect, rotate, and render 3D models with real-time lighting, material preview, and wireframe view inside MeshyGrab.",
  },
  {
    title: "Universal 3D Format Converter",
    desc: "Seamlessly convert assets between GLB, OBJ, FBX, STL, and 3MF for Blender, Unreal Engine, Unity, and 3D printing slicers.",
  },
  {
    title: "4K & 8K PBR Texture Upscaler",
    desc: "AI neural upscaling sharpens 2K textures to ultra-high 4K and 8K, preserving normals, roughness, metallic, and displacement maps.",
  },
  {
    title: "Meshy AI Workspace Exports",
    desc: "Directly export your generated Meshy models in any format with full client-side security and zero API hassle.",
  },
  {
    title: "Community Model Downloads",
    desc: "Access and export community models from Meshy Discover and Tripo3D Studio with built-in format conversion.",
  },
  {
    title: "Separate PBR Texture Extraction",
    desc: "Extract individual high-resolution PNG texture maps (Albedo, Normal, Roughness, Metallic, AO) ready for your game shaders.",
  },
];

export const audienceList = [
  "Game Developers (Unreal & Unity)",
  "3D Printing Enthusiasts (STL / 3MF)",
  "VFX & 3D Environment Artists",
  "Indie Game Studios & Solo Creators",
  "Digital Product Designers",
  "AI 3D Asset Creators & Modelers",
  "Material & Texture Artists",
  "Architectural Visualizers",
];

export const checks_privacy = [
  "Independent third-party toolkit and extension",
  "No Meshy or Tripo3D API tokens or passwords requested",
  "Backend handles entitlement accounting, usage quotas & billing",
  "Model file rendering and downloads remain client-side and secure",
];

export const steps = [
  {
    num: "1",
    title: "Import or Connect",
    desc: "Bring your existing 3D files into the workspace, or open MeshyGrab on Meshy AI and Tripo3D.",
  },
  {
    num: "2",
    title: "Inspect & Render",
    desc: "Preview models in real time with interactive lighting, wireframe mode, and material inspection.",
  },
  {
    num: "3",
    title: "Convert & Upscale",
    desc: "Convert formats between GLB, OBJ, FBX, STL, and 3MF, and upscale PBR textures to 4K or 8K.",
  },
  {
    num: "4",
    title: "Export Clean Files",
    desc: "Download production-ready 3D geometry and crisp PNG texture maps ready for game engines or 3D printers.",
  },
];

export const navLinks = [
  { href: "/#tools", label: "Toolkit" },
  { href: "/#viewer", label: "3D Viewer" },
  { href: "/#converter", label: "Format Converter" },
  { href: "/#upscaler", label: "4K/8K Upscaler" },
  { href: "/#integrations", label: "Integrations" },
  { href: "/#how-it-works", label: "How It Works" },
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
    subtitle: "Ideal for exploring MeshyGrab's 3D workspace toolkit",
    communityAllowance: "1 total",
    communityReset: "One-time",
    accountsTotal: 1,
    accountsAdditional: 0,
    features: [
      "2 workspace model downloads total (GLB, OBJ, FBX, STL, 3MF)",
      "8 texture PNG downloads total",
      "1 Community model download — one-time",
      "Standard resolution texture preview",
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
    subtitle: "Essential unlimited workspace exports for active 3D creators",
    communityAllowance: "2 / month",
    communityReset: "Every month",
    accountsTotal: 1,
    accountsAdditional: 0,
    features: [
      "Unlimited GLB, OBJ, FBX, STL & 3MF workspace exports",
      "Unlimited texture PNG downloads",
      "2 Community model downloads / month",
      "Full PBR, wireframe & normal inspection modes",
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
    subtitle:
      "Power suite with AI upscaling, format conversions & multi-account",
    communityAllowance: "8 / month",
    communityReset: "Every month",
    accountsTotal: 3,
    accountsAdditional: 2,
    accountsBenefit: "3 total Meshy accounts under 1 subscription",
    hasUpcomingPerks: true,
    upscalerAllowance: "3 upscales / month",
    converterAllowance: "5 conversions / month",
    features: [
      "3 AI texture upscales / month (4K & 8K)",
      "5 3D format conversions / month (GLB, OBJ, FBX, STL, 3MF)",
      "Unlimited GLB, OBJ, FBX, STL & 3MF workspace exports",
      "Unlimited texture PNG downloads",
      "8 Community model downloads / month",
      "✨ Tripo 3D Studio Support Included",
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
    subtitle:
      "Best value annual bundle with huge upscaling & conversion limits",
    communityAllowance: "40 / year",
    communityReset: "Every year",
    accountsTotal: 1,
    accountsAdditional: 0,
    hasUpcomingPerks: true,
    upscalerAllowance: "40 upscales / year",
    converterAllowance: "75 conversions / year",
    features: [
      "40 AI texture upscales / year (4K & 8K)",
      "75 3D format conversions / year (GLB, OBJ, FBX, STL, 3MF)",
      "Unlimited GLB, OBJ, FBX, STL & 3MF workspace exports",
      "Unlimited texture PNG downloads",
      "40 Community model downloads / year",
      "✨ Tripo 3D Studio Support Included",
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
    subtitle:
      "Pay once, keep forever. Unlimited AI upscales, conversions & updates.",
    communityAllowance: "Unlimited",
    communityReset: "Unlimited",
    accountsTotal: 5,
    accountsAdditional: 4,
    accountsBenefit: "5 total Meshy accounts under 1 purchase",
    hasUpcomingPerks: true,
    upscalerAllowance: "Unlimited (4K & 8K)",
    converterAllowance: "Unlimited",
    features: [
      "🔥 UNLIMITED AI Texture Upscales (4K & 8K PBR)",
      "🔥 UNLIMITED 3D Format Conversions (GLB, OBJ, FBX, STL, 3MF)",
      "Unlimited GLB, OBJ, FBX, STL & 3MF workspace exports",
      "Unlimited texture PNG downloads",
      "Unlimited Community model downloads",
      "✨ Tripo 3D Studio Support Included",
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

export function getPlansList(
  isDiscounted: boolean = false,
  isFavLifetime: boolean = false,
): PlanItem[] {
  const basePlans = !isDiscounted
    ? plansList
    : plansList.map((plan) => {
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

  if (!isFavLifetime) {
    return basePlans;
  }

  const favPrice = process.env.NEXT_PUBLIC_FAV_LIFETIME_PRICE || "$4.99";

  return basePlans.map((plan) => {
    if (plan.id === "lifetime") {
      return {
        ...plan,
        badge: "⭐ Fav Lifetime Deal 🔥",
        price: favPrice,
        originalPrice: "$29.99",
        savings: "Save ~83%",
        cta: `Grab Lifetime\n(${favPrice}) 🔥`,
      };
    }
    return plan;
  });
}
