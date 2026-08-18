import type { Metadata } from "next";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — MeshyGrab",
  description: "How MeshyGrab handles your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <main id="main-content">
        <section className="pt-36 pb-16">
          <div className="container mx-auto max-w-3xl px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
              Privacy Policy
            </h1>
            <p className="text-text-muted text-sm mb-12">
              Last updated: August 17, 2026
            </p>

            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                1. Educational Project & Overview
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MeshyGrab is an independent browser extension developed for
                educational, learning, and personal workflow demonstration
                purposes. We are dedicated to maintaining strict user privacy
                and transparency.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                This Privacy Policy outlines how MeshyGrab operates locally on
                your machine and explains our zero-data-harvesting architecture.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                2. Local-Only Processing (No Data Stealing)
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MeshyGrab operates 100% client-side inside your browser
                environment. When you use MeshyGrab to inspect or download 3D
                models you generated:
              </p>
              <ul className="list-disc pl-5 mb-4 text-text-secondary space-y-2">
                <li>
                  Your 3D model files (GLB) are downloaded directly to your
                  local computer.
                </li>
                <li>
                  No model geometry, texture data, or prompt text is sent to
                  third-party servers.
                </li>
                <li>
                  No network attacks, port scans, or malicious background
                  scripts are performed.
                </li>
              </ul>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                3. Information We Do NOT Collect
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                To guarantee your privacy, MeshyGrab strictly refrains from
                collecting or storing:
              </p>
              <ul className="list-disc pl-5 mb-4 text-text-secondary space-y-2">
                <li>
                  Your Meshy account password or authentication credentials.
                </li>
                <li>
                  Your browsing history outside of active extension
                  interactions.
                </li>
                <li>Your personal identity, location, or private file data.</li>
              </ul>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                4. Minimal Local Storage Data
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                The extension uses standard Chrome Local Storage solely on your
                browser to maintain basic operational state (such as counting
                local download entitlements and caching UI preferences). This
                data remains strictly stored on your own device and can be
                cleared at any time through your browser settings.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                5. Third-Party Disclaimers & Non-Affiliation
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MeshyGrab is an independent third-party tool and is not
                affiliated, authorized, maintained, sponsored, or endorsed by
                Meshy (Meshy AI) or any of its affiliates. All product names,
                trademarks, and registered trademarks remain the property of
                their respective owners.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                6. Cookies & Tracking
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MeshyGrab does not use tracking cookies, analytics web beacons,
                or third-party advertising scripts.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                7. User Control & Data Rights
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                You retain complete control over your browser extension data.
                Removing or uninstalling the extension instantly clears all
                associated local state from your device.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                8. Contact & Support
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                If you have questions regarding this Privacy Policy or the
                educational scope of MeshyGrab, please contact us at:{" "}
                <a
                  href="mailto:usmanaugust28@gmail.com"
                  className="text-lime underline underline-offset-2 hover:opacity-80"
                >
                  usmanaugust28@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer minimal />
    </>
  );
}
