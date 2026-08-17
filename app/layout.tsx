import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://meshygrab.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "MeshyGrab — Free & Low-Cost Meshy 3D GLB Downloader",
    template: "%s | MeshyGrab",
  },

  description:
    "Bypass expensive download limits on Meshy AI. Download your generated 3D models as GLB files instantly with MeshyGrab. Free trial available, then $0.99/mo.",

  applicationName: "MeshyGrab",

  authors: [
    {
      name: "MeshyGrab",
      url: siteUrl,
    },
  ],

  creator: "MeshyGrab",
  publisher: "MeshyGrab",

  keywords: [
    "Meshy",
    "MeshyGrab",
    "Meshy free download GLB",
    "Meshy 3D model downloader",
    "download Meshy models without paying",
    "Meshy GLB downloader",
    "download Meshy model as GLB",
    "Meshy GLB exporter",
    "AI 3D model downloader",
    "Meshy Chrome extension",
    "3D model GLB download",
  ],

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "MeshyGrab",
    title: "MeshyGrab — Download Meshy 3D Models as GLB easily",
    description:
      "Get your AI-generated Meshy 3D models directly as GLB files. 2 free downloads, then unlimited for just $0.99/month.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeshyGrab — Download Meshy 3D Models as GLB",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MeshyGrab — Download Meshy 3D Models as GLB easily",
    description:
      "Get your AI-generated Meshy 3D models directly as GLB files. 2 free downloads, then unlimited for $0.99/month.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#181818",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) for Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MeshyGrab",
    operatingSystem: "Chrome, Edge, Brave",
    applicationCategory: "BrowserExtension",
    offers: {
      "@type": "Offer",
      price: "0.99",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      description:
        "2 free downloads, then unlimited downloads for $0.99/month.",
    },
    description:
      "MeshyGrab allows creators to quickly download generated 3D models from Meshy workspace directly as GLB files.",
    url: siteUrl,
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
