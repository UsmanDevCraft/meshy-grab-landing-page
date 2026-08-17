export const faqs = [
  {
    q: "What is MeshyGrab?",
    a: "MeshyGrab is an independent browser extension designed to make downloading generated Meshy models as GLB files easier. It provides a simple interface for grabbing your 3D models without needing to understand APIs or manage tokens.",
  },
  {
    q: "Is MeshyGrab an official Meshy product?",
    a: "No. MeshyGrab is an independent third-party product and is not affiliated with, endorsed by, or sponsored by Meshy. Meshy and its trademarks remain the property of their respective owners.",
  },
  {
    q: "Do I need a Meshy API key?",
    a: "The product is designed not to require users to manually provide an API token. MeshyGrab handles the technical integration so you can focus on downloading your models.",
  },
  {
    q: "What file format does MeshyGrab download?",
    a: "GLB. This is the standard binary format for glTF 3D models, widely supported by 3D software, game engines, and web viewers.",
  },
  {
    q: "How many free downloads do I get?",
    a: "The current plan provides 2 free model downloads. After that, you can upgrade to Pro for unlimited downloads.",
  },
  {
    q: "What does Pro include?",
    a: "Pro provides unlimited downloads for the current monthly subscription price of $0.99/month. You also get continued access to all MeshyGrab features without usage limits.",
  },
  {
    q: "Does MeshyGrab store my 3D models?",
    a: "No. The backend is used for entitlement and usage accounting only. The actual model download remains client-side, meaning the file goes directly from Meshy to your device.",
  },
  {
    q: "Can I cancel Pro?",
    a: "Yes. You can cancel your Pro subscription at any time through your payment provider. Your access will continue until the end of the current billing period.",
  },
];

export const checks = [
  "Model preview before download",
  "GLB format confirmation",
  "Download entitlement tracking",
];

export const plans = [
  {
    name: "Free",
    badge: "Free",
    price: "$0",
    period: "",
    features: [
      "2 model downloads",
      "No subscription required",
      "Core MeshyGrab functionality",
    ],
    cta: "Start Free",
    primary: false,
  },
  {
    name: "Pro",
    badge: "Pro",
    price: "$0.99",
    period: "/month",
    features: [
      "Unlimited downloads",
      "No free-download limit",
      "Continued access to MeshyGrab",
    ],
    cta: "Get Pro",
    primary: true,
  },
];

export const checks_privacy = [
  "MeshyGrab does not ask for your Meshy password",
  "No manual API token required from users",
  "Backend used for entitlement and usage accounting only",
  "GLB download remains client-side",
  "Only collect information required to operate the service",
];

export const problems = [
  "Understanding APIs",
  "Managing tokens",
  "Copying complicated URLs",
  "Dealing with technical workflows",
];

export const steps = [
  {
    num: "1",
    title: "Generate",
    desc: "Create your 3D model in Meshy using text prompts, images, or sketch-to-3D.",
  },
  {
    num: "2",
    title: "Select",
    desc: "Open the model in your Meshy workspace and view it in the preview.",
  },
  {
    num: "3",
    title: "Grab",
    desc: "Open MeshyGrab and download the GLB file directly to your device.",
  },
];

export const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];
