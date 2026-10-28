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
            your browser to help users export 3D model files (GLB, OBJ, FBX,
            3MF, STL &amp; textures) of models they generated. No user data is
            harvested, stolen, or shared, and no external attacks or scraping
            are conducted.
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
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/apple-touch-icon.png"
                alt="MeshyGrab Logo"
                width={42}
                height={42}
                className="rounded-xl"
              />
              <span className="font-extrabold text-lg text-text-primary">
                MeshyGrab
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed mt-3">
              All-in-one 3D asset toolkit: interactive model viewing, universal
              format conversion, 4K &amp; 8K PBR texture upscaling, and
              frictionless exports.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-5">
              Toolkit
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/#viewer"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                3D Model Viewer
              </Link>
              <Link
                href="/#converter"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                Format Converter
              </Link>
              <Link
                href="/#upscaler"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                4K &amp; 8K Upscaler
              </Link>
              <Link
                href="/#integrations"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                Meshy &amp; Tripo3D
              </Link>
              <Link
                href="/#pricing"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                Pricing &amp; Plans
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
              <Link
                href="/terms"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                Terms of Use
              </Link>
              <Link
                href="/refund-policy"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-5">
              Extensions
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="https://chromewebstore.google.com/detail/jkddfapkjenldpiacoccgheimcokhmcc?utm_source=item-share-cb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-lime transition-colors cursor-pointer"
              >
                Chrome Web Store Extension
              </Link>
              <Link
                href="/#faq"
                className="text-sm text-text-secondary hover:text-lime transition-colors"
              >
                Help &amp; FAQ
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border-subtle pt-8 flex flex-col gap-3">
          <p className="text-xs text-text-muted leading-relaxed max-w-4xl">
            <strong>Educational &amp; Legal Disclaimer:</strong> MeshyGrab is an
            independent third-party productivity toolkit designed to help 3D
            artists, game developers, designers, and enthusiasts view, convert,
            upscale, and export 3D models (GLB, OBJ, FBX, 3MF, STL &amp;
            textures). We strictly respect user privacy: no credential
            harvesting, API token logging, or external scraping are performed.
          </p>
          <p className="text-xs text-text-muted leading-relaxed max-w-4xl">
            <strong>Trademark Notice:</strong> MeshyGrab is an independent
            third-party product and is not affiliated with, authorized, endorsed
            by, or sponsored by Meshy (Meshy AI) or Tripo3D. All product names,
            logos, brands, and trademarks belong strictly to their respective
            owners.
          </p>
          <p className="text-xs text-text-muted mt-2">
            &copy; 2026 MeshyGrab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
