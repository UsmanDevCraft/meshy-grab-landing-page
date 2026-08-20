import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terms of Service — MeshyGrab",
  description: "Terms of Service for MeshyGrab.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative overflow-hidden pt-36 pb-16">
          {/* Background glows */}
          <div className="pointer-events-none absolute right-[-80px] top-[10%] h-[300px] w-[300px] bg-gradient-radial-lime opacity-40 blur-3xl sm:right-0 sm:h-[400px] sm:w-[400px]" />
          <div className="pointer-events-none absolute bottom-[5%] left-[-80px] h-[250px] w-[250px] bg-gradient-radial-pink opacity-30 blur-3xl sm:left-0 sm:h-[320px] sm:w-[320px]" />

          <div className="container relative z-10 mx-auto max-w-3xl px-6">
            {/* Logo image */}
            <div className="mb-10 flex justify-center">
              <Image
                src="/apple-touch-icon.png"
                alt="Logo"
                width={150}
                height={150}
              />
            </div>

            <h1 className="mb-2 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
              Terms of Service
            </h1>
            <p className="mb-12 text-center text-sm text-text-muted">
              Last Updated: August 2026
            </p>

            <div className="prose prose-invert max-w-none">
              <h2 className="mb-4 mt-10 text-xl font-bold text-text-primary">
                1. Acceptance of Terms
              </h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                By accessing or using MeshyGrab (https://meshygrab.vercel.app/)
                and its associated browser extension, you agree to be bound by
                these Terms of Service. If you do not agree to these terms,
                please do not use our service.
              </p>

              <h2 className="mb-4 mt-10 text-xl font-bold text-text-primary">
                2. Description of Service
              </h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                MeshyGrab provides software tools and a browser extension
                designed to help users capture, export, and manage web assets
                and workflow metadata.
              </p>

              <h2 className="mb-4 mt-10 text-xl font-bold text-text-primary">
                3. User Responsibilities
              </h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                You are responsible for maintaining the confidentiality of your
                account details.
              </p>
              <p className="mb-4 leading-relaxed text-text-secondary">
                You agree not to use MeshyGrab for any illegal, unauthorized, or
                abusive purposes.
              </p>
              <p className="mb-4 leading-relaxed text-text-secondary">
                You are solely responsible for ensuring you have the legal right
                to capture and use any assets processed through the extension.
              </p>

              <h2 className="mb-4 mt-10 text-xl font-bold text-text-primary">
                4. Subscriptions and Payments
              </h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                Payments are processed securely by our third-party payment
                partners.
              </p>
              <p className="mb-4 leading-relaxed text-text-secondary">
                By subscribing to a paid tier, you authorize us or our payment
                processor to charge the applicable subscription fees to your
                payment method.
              </p>

              <h2 className="mb-4 mt-10 text-xl font-bold text-text-primary">
                5. Intellectual Property
              </h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                MeshyGrab, its original code, design, features, and brand are
                owned exclusively by us. Purchasing a license grants you a
                non-exclusive, non-transferable right to use the software.
              </p>

              <h2 className="mb-4 mt-10 text-xl font-bold text-text-primary">
                6. Termination
              </h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                We reserve the right to suspend or terminate access to our
                service at our discretion if these terms are violated.
              </p>

              <h2 className="mb-4 mt-10 text-xl font-bold text-text-primary">
                7. Contact
              </h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                For any questions regarding these Terms, please contact us at{" "}
                <a
                  href="mailto:support.meshygrab@gmail.com"
                  className="text-lime underline underline-offset-2 hover:opacity-80"
                >
                  support.meshygrab@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer minimal />
    </>
  );
}
