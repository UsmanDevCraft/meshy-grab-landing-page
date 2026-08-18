"use client";

import { FooterProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function Footer({ minimal = false }: FooterProps) {
  if (minimal) {
    return (
      <footer className="bg-bg-card border-t border-border-subtle py-8">
        <div className="container mx-auto max-w-6xl px-6">
          <p className="text-xs text-text-muted leading-relaxed max-w-4xl mb-3">
            <strong>Educational & Legal Disclaimer:</strong> MeshyGrab is an
            independent third-party tool built solely for educational and
            learning purposes. It is not affiliated with, endorsed by, or
            sponsored by Meshy (Meshy AI). MeshyGrab operates 100% locally in
            your browser to help users export GLB files of models they
            generated. No user data is harvested, stolen, or shared, and no
            external attacks or scraping are conducted.
          </p>
          <p className="text-xs text-text-muted">
            &copy; 2026 MeshyGrab. All rights reserved. Built for educational &
            research purposes.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-bg-card border-t border-border-subtle pt-16 pb-8">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="max-w-[280px]">
            <Link href="/">
              <Image
                src="/apple-touch-icon.png"
                alt="MeshyGrab Logo"
                width={50}
                height={50}
              />
            </Link>
            <p className="text-sm text-text-muted leading-relaxed mt-2">
              Simple model downloads and previews, without friction.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-5">
              Product
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/#features"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#pricing"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/#faq"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-5">
              Legal
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/privacy-policy"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-5">
              Links
            </h4>
            <div className="flex flex-col gap-3">
              <span
                className="text-sm text-text-secondary hover:text-lime transition-colors cursor-pointer"
                onClick={() => alert("Coming soon")}
              >
                Chrome Web Store
              </span>
              <span
                className="text-sm text-text-secondary hover:text-lime transition-colors cursor-pointer"
                onClick={() => alert("Coming soon")}
              >
                GitHub
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border-subtle pt-8 flex flex-col gap-3">
          <p className="text-xs text-text-muted leading-relaxed max-w-4xl">
            <strong>Educational & Fair Use Statement:</strong> MeshyGrab is an
            open educational utility and productivity helper designed to empower
            free tier users to preview and export GLB 3D models they generated.
            We strictly respect user privacy: no data harvesting, credential
            logging, or network attacks are performed.
          </p>
          <p className="text-xs text-text-muted leading-relaxed max-w-4xl">
            <strong>Trademark & Disclaimer:</strong> MeshyGrab is an independent
            third-party product and is not affiliated with, authorized, endorsed
            by, or sponsored by Meshy (Meshy AI). All product names, logos,
            brands, and trademarks belong strictly to their respective owners.
          </p>
          <p className="text-xs text-text-muted mt-2">
            &copy; 2026 MeshyGrab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
