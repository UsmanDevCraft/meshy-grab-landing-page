import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MeshyGrab — Download Your Meshy 3D Models as GLB",
  description:
    "MeshyGrab makes it simple to download your generated Meshy 3D models as GLB files. A lightweight independent browser extension for Meshy users.",
  metadataBase: new URL("https://meshygrab.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MeshyGrab — Download Your Meshy 3D Models as GLB",
    description:
      "MeshyGrab makes it simple to download your generated Meshy 3D models as GLB files.",
    type: "website",
    url: "https://meshygrab.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeshyGrab — Download Your Meshy 3D Models as GLB",
    description:
      "MeshyGrab makes it simple to download your generated Meshy 3D models as GLB files.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
