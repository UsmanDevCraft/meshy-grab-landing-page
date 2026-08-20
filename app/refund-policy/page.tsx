import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy — MeshyGrab",
  description: "Refund and Cancellation Policy for MeshyGrab.",
};

export default function RefundPolicyPage() {
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
              Refund and Cancellation Policy
            </h1>
            <p className="mb-12 text-center text-sm text-text-muted">
              Last Updated: August 2026
            </p>

            <div className="prose prose-invert max-w-none">
              <h2 className="mb-4 mt-10 text-xl font-bold text-text-primary">
                1. Refund Eligibility
              </h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                We want you to be completely satisfied with MeshyGrab. We offer
                a 14-day money-back guarantee for all new subscription plans and
                license purchases.
              </p>
              <p className="mb-4 leading-relaxed text-text-secondary">
                To be eligible for a refund:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-5 text-text-secondary">
                <li>
                  Your refund request must be submitted within 14 days of your
                  initial purchase date.
                </li>
                <li>
                  You must provide the order email or receipt number associated
                  with your purchase.
                </li>
              </ul>

              <h2 className="mb-4 mt-10 text-xl font-bold text-text-primary">
                2. How to Request a Refund
              </h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                To request a refund, please send an email to{" "}
                <a
                  href="mailto:support.meshygrab@gmail.com"
                  className="text-lime underline underline-offset-2 hover:opacity-80"
                >
                  support.meshygrab@gmail.com
                </a>{" "}
                with the subject line{" "}
                <strong>Refund Request - [Your Order ID]</strong>. We process
                all eligible refund requests within 3 business days.
              </p>

              <h2 className="mb-4 mt-10 text-xl font-bold text-text-primary">
                3. Cancellations
              </h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                You can cancel your recurring subscription at any time directly
                through your account billing portal or by contacting customer
                support. Once canceled, you will retain access to paid features
                until the end of your current billing cycle, and you will not be
                charged again.
              </p>

              <h2 className="mb-4 mt-10 text-xl font-bold text-text-primary">
                4. Exceptions
              </h2>
              <p className="mb-4 leading-relaxed text-text-secondary">
                Refund requests made after the 14-day window will be evaluated
                on a case-by-case basis at our discretion.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer minimal />
    </>
  );
}
