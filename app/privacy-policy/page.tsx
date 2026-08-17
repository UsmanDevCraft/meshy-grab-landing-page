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
              Last updated: August 15, 2026
            </p>

            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                1. Introduction
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MeshyGrab (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, and safeguard your information
                when you use our browser extension and related services.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                By using MeshyGrab, you agree to the collection and use of
                information in accordance with this policy.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                2. Information We Collect
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We collect only the information necessary to provide and improve
                our service:
              </p>
              <ul className="list-disc pl-5 mb-4 text-text-secondary space-y-2">
                <li>
                  <strong>Extension usage data:</strong> Information about how
                  you interact with the extension, such as download requests, to
                  manage entitlements and usage limits.
                </li>
                <li>
                  <strong>Account information:</strong> If you create an account
                  or subscribe to Pro, we collect basic account details required
                  for authentication and subscription management.
                </li>
                <li>
                  <strong>Technical data:</strong> Browser type, extension
                  version, and error logs to help us diagnose and fix issues.
                </li>
              </ul>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                3. Information We Do Not Collect
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We do not collect:
              </p>
              <ul className="list-disc pl-5 mb-4 text-text-secondary space-y-2">
                <li>Your Meshy password or login credentials</li>
                <li>Your 3D model files (downloads are client-side)</li>
                <li>
                  Your Meshy API tokens (the extension handles authentication
                  internally)
                </li>
                <li>Browsing history outside of Meshy</li>
              </ul>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                4. How Information Is Used
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We use the collected information for:
              </p>
              <ul className="list-disc pl-5 mb-4 text-text-secondary space-y-2">
                <li>Providing and maintaining the extension functionality</li>
                <li>Managing download entitlements and subscription status</li>
                <li>Improving the extension based on usage patterns</li>
                <li>
                  Communicating with you about your account or subscription
                </li>
              </ul>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                5. Download Entitlements
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MeshyGrab tracks download usage to enforce free-tier limits and
                validate Pro subscriptions. This tracking is necessary to
                operate the service fairly for all users.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                6. Subscription and Payment Information
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MeshyGrab Pro subscriptions are processed through Stripe, a
                secure payment processor. We do not directly store your full
                payment card details. Stripe handles all payment processing in
                accordance with their own security standards and privacy policy.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                7. Data Storage
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Your data is stored on secure servers. We implement reasonable
                security measures to protect against unauthorized access,
                alteration, or destruction of your personal information.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                8. Third-Party Services
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MeshyGrab interacts with Meshy&apos;s services to facilitate
                model downloads. We are not responsible for Meshy&apos;s privacy
                practices. We also use Stripe for payment processing.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                9. Cookies and Analytics
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MeshyGrab does not currently use cookies or third-party
                analytics. If this changes in the future, we will update this
                policy and notify users.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                10. Data Retention
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We retain your information only for as long as necessary to
                provide our services and fulfill the purposes outlined in this
                policy. You may request deletion of your account data by
                contacting us.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                11. Data Security
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We take reasonable precautions to protect your information.
                However, no method of transmission over the internet or
                electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                12. Your Rights
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Depending on your location, you may have rights to:
              </p>
              <ul className="list-disc pl-5 mb-4 text-text-secondary space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Withdraw consent where applicable</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mb-4">
                To exercise these rights, please contact us using the
                information below.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                13. Children&apos;s Privacy
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                MeshyGrab is not intended for use by individuals under the age
                of 13. We do not knowingly collect personal information from
                children under 13.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                14. Changes to This Policy
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the &quot;Last updated&quot; date.
              </p>

              <h2 className="text-xl font-bold mt-10 mb-4 text-text-primary">
                15. Contact
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please
                contact us at:{" "}
                <a
                  href="mailto:privacy@meshygrab.com"
                  className="text-lime underline underline-offset-2 hover:opacity-80"
                >
                  privacy@meshygrab.com
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
