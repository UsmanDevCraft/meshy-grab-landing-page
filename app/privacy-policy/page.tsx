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
              Last updated: August 27, 2026
            </p>

            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                1. Educational Project & Overview
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MeshyGrab is an independent browser extension developed to
                assist users in inspecting and downloading 3D assets. We are
                dedicated to maintaining strict user privacy and transparency.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                2. Data Collection and Usage
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                To function properly and manage licensing, MeshyGrab processes
                specific categories of data:
              </p>
              <ul className="list-disc pl-5 mb-4 text-text-secondary space-y-2">
                <li>
                  <strong>Financial & Payment Information:</strong> We use
                  Paddle as our Merchant of Record to handle checkout, payment
                  processing, tax compliance, and subscription management. When
                  you purchase a license, payment details and transaction
                  records (such as license key status and billing email) are
                  securely managed by Paddle in accordance with Paddle&apos;s
                  Privacy Policy. We do not store or process raw credit card
                  numbers on our servers.
                </li>
                <li>
                  <strong>Website Content & Host Permissions:</strong> The
                  extension requires host permissions strictly for{" "}
                  <code>*.meshy.ai</code> subdomains to detect, inspect, and
                  download user-generated 3D assets (GLB files). This content is
                  processed locally within your browser.
                </li>
              </ul>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                3. Local Storage Data
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                The extension uses standard Chrome Local Storage solely on your
                browser to maintain operational state, cache UI preferences, and
                store active license verification tokens locally on your device.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                4. Third-Party Data Sharing
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We do not sell, rent, or trade your personal data to third
                parties. User data is shared strictly with third-party
                infrastructure providers necessary to run the service:
              </p>
              <ul className="list-disc pl-5 mb-4 text-text-secondary space-y-2">
                <li>
                  <strong>Paddle (Merchant of Record):</strong> For managing
                  checkout flows, processing payments, handling billing support,
                  and verifying active feature access.
                </li>
              </ul>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                5. Information We Do NOT Collect
              </h2>
              <ul className="list-disc pl-5 mb-4 text-text-secondary space-y-2">
                <li>
                  Your third-party passwords or private authentication
                  credentials.
                </li>
                <li>
                  Your browsing history outside of active extension interactions
                  on target hosts.
                </li>
                <li>
                  Your physical location or device-level tracking markers.
                </li>
              </ul>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                6. Third-Party Disclaimers & Non-Affiliation
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MeshyGrab is an independent third-party tool and is not
                affiliated, authorized, maintained, sponsored, or endorsed by
                Meshy (Meshy AI) or any of its affiliates. All product names and
                trademarks belong to their respective owners.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                7. User Control & Data Rights
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                You retain complete control over your extension data. Removing
                or uninstalling the extension instantly clears all associated
                local storage data from your machine.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                8. Contact & Support
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                If you have questions regarding this Privacy Policy or
                MeshyGrab, please contact us at:{" "}
                <a
                  href="mailto:support.meshygrab@gmail.com"
                  className="text-lime underline underline-offset-2 hover:opacity-80"
                >
                  support.meshygrab@gmail.com
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
