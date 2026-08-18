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
    default: "MeshyGrab — Preview & Download Meshy 3D Models as GLB",
    template: "%s | MeshyGrab",
  },

  description:
    "MeshyGrab is a Chrome extension that helps Meshy users preview and download the 3D models they've generated as GLB files. 2 free downloads, then $0.99/month.",

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
    "Meshy GLB downloader",
    "download Meshy model as GLB",
    "Meshy model download",
    "Meshy model preview",
    "Meshy model exporter",
    "Meshy export",
    "Meshy Chrome extension",
    "Meshy browser extension",
    "3D model downloader",
    "3D model GLB download",
    "AI 3D model downloader",
  ],

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "MeshyGrab",
    title: "MeshyGrab — Preview & Download Meshy 3D Models as GLB",
    description:
      "MeshyGrab is a Chrome extension that helps Meshy users preview and download the 3D models they've generated as GLB files.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeshyGrab — Preview & Download Meshy 3D Models as GLB",
      },
    ],
  },

  verification: {
    google: "9PbdoRzqApvTZ5ax4Vx_RVhsUe9OWlDNIfVNPKlw1ho",
  },

  twitter: {
    card: "summary_large_image",
    title: "MeshyGrab — Preview & Download Meshy 3D Models as GLB",
    description:
      "MeshyGrab is a Chrome extension that helps Meshy users preview and download the 3D models they've generated as GLB files.",
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
      "MeshyGrab is a Chrome extension that helps Meshy users preview and download the 3D models they've generated as GLB files.",
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
