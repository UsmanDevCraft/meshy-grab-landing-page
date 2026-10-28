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
    default: "MeshyGrab — 3D Model Viewer, Converter & Texture Upscaler",
    template: "%s | MeshyGrab",
  },

  description:
    "View and render 3D models, convert files between GLB, OBJ, FBX, STL, and 3MF, upscale PBR textures to 4K and 8K, and export models and textures from Meshy AI and supported community sources.",

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
    "MeshyGrab",
    "Meshy",
    "Meshy model downloader",
    "Meshy 3D model downloader",
    "download Meshy models",
    "download Meshy 3D models",
    "Meshy download",
    "Meshy GLB",
    "Meshy OBJ",
    "Meshy FBX",
    "Meshy 3MF",
    "Meshy STL",
    "Meshy texture export",
    "Meshy GLB downloader",
    "download Meshy model as GLB",
    "Meshy model download",
    "Meshy model preview",
    "Meshy model exporter",
    "Meshy export",
    "Meshy Chrome extension",
    "Meshy browser extension",
    "3D model downloader",
    "3D model GLB OBJ FBX 3MF STL download",
    "AI 3D model downloader",
    "3D model viewer",
    "3D model converter",
    "3D file converter",
    "AI texture upscaler",
    "4K and 8K texture upscaling",
    "online 3D model viewer",
    "3D model preview",
    "3D workspace",
    "GLB converter",
    "OBJ converter",
    "FBX converter",
    "STL converter",
    "3MF converter",
    "GLB to OBJ",
    "FBX to GLB",
    "OBJ to STL",
    "PBR texture maps",
    "PNG texture export",
    "PBR textures",
    "Meshy AI model downloader",
    "Meshy model export",
    "Meshy texture export",
    "Tripo3D community models",
    "AI-generated 3D assets",
    "downloadable 3D models",
  ],

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "MeshyGrab",
    title: "MeshyGrab — 3D Model Viewer, Converter & Texture Upscaler",
    description:
      "All-in-one 3D asset toolkit: 3D model viewing & rendering, universal format conversion (GLB, OBJ, FBX, STL, 3MF), 4K & 8K PBR texture upscaling, and seamless Meshy & Tripo3D exports.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeshyGrab — 3D Model Viewer, Converter & Texture Upscaler",
      },
    ],
  },

  verification: {
    google: "9PbdoRzqApvTZ5ax4Vx_RVhsUe9OWlDNIfVNPKlw1ho",
  },

  twitter: {
    card: "summary_large_image",
    title: "MeshyGrab — 3D Model Viewer, Converter & Texture Upscaler",
    description:
      "All-in-one 3D asset toolkit: 3D model viewing, format conversion (GLB, OBJ, FBX, STL, 3MF), 4K/8K texture upscaling, and Meshy & Tripo3D exports.",
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
    applicationCategory: "DesignApplication",
    operatingSystem: "Web, Chrome, Edge, Brave",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "19.99",
      priceCurrency: "USD",
      offerCount: "5",
      offers: [
        {
          "@type": "Offer",
          name: "Free",
          price: "0",
          priceCurrency: "USD",
          description:
            "2 model downloads, 8 texture PNG downloads, and 1 community model download.",
        },
        {
          "@type": "Offer",
          name: "Pro Monthly",
          price: "0.99",
          priceCurrency: "USD",
          description:
            "Unlimited 3D model exports, unlimited texture PNG exports, 2 community downloads/mo.",
        },
      ],
    },
    description:
      "MeshyGrab is an all-in-one 3D asset toolkit featuring interactive 3D model viewing, universal file conversion (GLB, OBJ, FBX, STL, 3MF), 4K & 8K PBR texture upscaling, and model/texture exports from Meshy AI and Tripo3D.",
    url: siteUrl,
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://i.ytimg.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
