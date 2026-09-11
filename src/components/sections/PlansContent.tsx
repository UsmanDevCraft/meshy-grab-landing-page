"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { plansList } from "@/constants/constants";
import { PlanItem } from "@/types/types";

const CHROME_WEB_STORE_URL =
  "https://chromewebstore.google.com/detail/jkddfapkjenldpiacoccgheimcokhmcc?utm_source=item-share-cb";

interface PlansContentProps {
  isPlanPage?: boolean;
}

export default function PlansContent({ isPlanPage = true }: PlansContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const installationId = isPlanPage ? searchParams.get("installationId") : null;
  const urlUserId = isPlanPage ? searchParams.get("userId") : null;
  const urlEmail = isPlanPage ? searchParams.get("email") : null;

  const [selectedPlanId, setSelectedPlanId] = useState<string>("free");
  const [activePlanId, setActivePlanId] = useState<string>("free");
  const [userId, setUserId] = useState<string | null>(urlUserId);
  const [email, setEmail] = useState<string | null>(urlEmail);

  const [submittingPlan, setSubmittingPlan] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isResolvingIdentity, setIsResolvingIdentity] =
    useState<boolean>(false);

  // Identity resolution helper
  const resolveIdentity = useCallback(async (targetInstallationId: string) => {
    setIsResolvingIdentity(true);
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const endpoint = `${baseUrl}/entitlement?installationId=${encodeURIComponent(
        targetInstallationId,
      )}`;

      const res = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        const fetchedUserId = data.userId || data.user?.id || data.id || null;
        const fetchedEmail = data.email || data.user?.email || null;

        if (fetchedUserId) setUserId(fetchedUserId);
        if (fetchedEmail) setEmail(fetchedEmail);

        if (data.isPaid === true && data.plan) {
          const matchingPlan = plansList.find(
            (p) => p.planKey === data.plan || p.id === data.plan,
          );
          if (matchingPlan) {
            setSelectedPlanId(matchingPlan.id);
            setActivePlanId(matchingPlan.id);
          } else {
            setActivePlanId("free");
          }
        } else {
          setActivePlanId("free");
        }

        return { userId: fetchedUserId, email: fetchedEmail };
      }
    } catch (err) {
      console.warn("Failed to resolve identity from entitlement API:", err);
    } finally {
      setIsResolvingIdentity(false);
    }
    return { userId: null, email: null };
  }, []);

  // Fetch identity on mount if installationId exists and userId/email are not in URL
  useEffect(() => {
    if (isPlanPage && installationId && (!urlUserId || !urlEmail)) {
      // Defer to a microtask to avoid synchronous setState within the effect body,
      // which React flags as a cascading render.
      queueMicrotask(() => {
        resolveIdentity(installationId);
      });
    }
  }, [isPlanPage, installationId, urlUserId, urlEmail, resolveIdentity]);

  // Handle plan purchase CTA click
  const handlePlanClick = async (plan: PlanItem) => {
    setSelectedPlanId(plan.id);

    // Homepage mode: all buttons go to Chrome Web Store
    if (!isPlanPage) {
      window.open(CHROME_WEB_STORE_URL, "_blank", "noopener,noreferrer");
      return;
    }

    // Free plan links out directly to Chrome store
    if (!plan.planKey) {
      if (plan.href) {
        window.open(plan.href, "_blank", "noopener,noreferrer");
      }
      return;
    }

    // Prevent duplicate submission
    if (submittingPlan) return;

    setCheckoutError(null);

    // Require installationId
    if (!installationId) {
      setCheckoutError(
        "Installation ID is missing. The Plans & Pricing page must be opened directly from your MeshyGrab Chrome Extension.",
      );
      return;
    }

    let activeUserId = userId || urlUserId;
    let activeEmail = email || urlEmail;

    // Retry identity resolution if missing
    if (!activeUserId || !activeEmail) {
      setSubmittingPlan(plan.id);
      const resolved = await resolveIdentity(installationId);
      activeUserId = activeUserId || resolved.userId;
      activeEmail = activeEmail || resolved.email;
    }

    if (!activeUserId || !activeEmail) {
      setSubmittingPlan(null);
      setCheckoutError(
        "Unable to verify Meshy account identity for this installation. Please ensure you open the Plans page from your MeshyGrab extension.",
      );
      return;
    }

    setSubmittingPlan(plan.id);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const endpoint = `${baseUrl}/api/checkout`;

      const payload = {
        plan: plan.planKey,
        userId: activeUserId,
        email: activeEmail,
        installationId: installationId,
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error ||
            `Checkout session creation failed (Status ${res.status}).`,
        );
      }

      const ptxn =
        data.transactionId || data._ptxn || data.transaction?.id || null;
      const checkoutUrl = data.url || null;

      if (ptxn) {
        // Navigate to existing /checkout page contract
        router.push(
          `/checkout?_ptxn=${encodeURIComponent(
            ptxn,
          )}&installationId=${encodeURIComponent(installationId)}`,
        );
      } else if (checkoutUrl) {
        window.location.assign(checkoutUrl);
      } else {
        throw new Error(
          "Checkout session was created, but transaction ID was missing from the server response.",
        );
      }
    } catch (err: unknown) {
      console.error("Checkout submission failed:", err);
      setCheckoutError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while creating checkout session.",
      );
      setSubmittingPlan(null);
    }
  };

  return (
    <div
      id="pricing"
      className="container mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-16"
    >
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-lime/10 border border-lime/25 rounded-full text-xs font-semibold text-lime mb-5">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          Plans & Pricing
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-4 leading-tight">
          Flexible plans for every 3D creator
        </h1>
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Start with 2 free downloads or upgrade to unlimited GLB, OBJ, FBX, and
          texture exports.
        </p>
      </div>

      {/* Missing InstallationId Warning State (Plans page only) */}
      {isPlanPage && !installationId && (
        <div className="max-w-2xl mx-auto mb-10 p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-bold mb-1 text-sm sm:text-base">
            <svg
              className="w-5 h-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Opened Outside MeshyGrab Extension
          </div>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            To upgrade to a paid plan, please open the Plans & Pricing page
            directly from inside your <strong>MeshyGrab</strong> Chrome
            Extension so your account identity is verified automatically.
          </p>
        </div>
      )}

      {/* Checkout / Identity Error Banner */}
      {checkoutError && (
        <div className="max-w-2xl mx-auto mb-10 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-center flex items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-red-400 font-medium text-left">
            ⚠️ {checkoutError}
          </div>
          <button
            onClick={() => setCheckoutError(null)}
            className="text-xs font-bold text-red-400 underline underline-offset-2 hover:opacity-80 flex-shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Visual Progression Strip */}
      <div className="max-w-2xl mx-auto mb-12 p-3 bg-bg-card border border-border-subtle rounded-2xl flex flex-wrap items-center justify-around gap-2 text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-lime" />
          <span>
            Free: <strong className="text-text-primary">2 Downloads</strong>
          </span>
        </div>
        <span className="text-text-muted font-bold">&rarr;</span>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-lime" />
          <span>
            Pro: <strong className="text-lime">$0.99/mo</strong>
          </span>
        </div>
        <span className="text-text-muted font-bold">&rarr;</span>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-lime" />
          <span>
            Annual: <strong className="text-lime">$9.99/yr</strong>
          </span>
        </div>
        <span className="text-text-muted font-bold">&rarr;</span>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-pink" />
          <span>
            Lifetime: <strong className="text-pink">$49 once</strong>
          </span>
        </div>
      </div>

      {/* 4 Pricing Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-16">
        {plansList.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isActive = activePlanId === plan.id;
          const isLoadingThisPlan = submittingPlan === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "bg-bg-card ring-2 ring-lime shadow-[0_0_35px_rgba(197,249,85,0.18)] scale-[1.02]"
                  : "bg-bg-card/80 hover:bg-bg-card hover:-translate-y-1 border border-border-subtle hover:border-lime/30"
              } ${
                plan.isBestValue
                  ? "border-lime/40 bg-gradient-to-b from-lime/5 via-bg-card to-bg-card shadow-[0_0_40px_rgba(197,249,85,0.12)]"
                  : ""
              } ${
                plan.isPremium
                  ? "border-pink/40 bg-gradient-to-b from-pink/5 via-bg-card to-bg-card shadow-[0_0_40px_rgba(255,62,143,0.12)]"
                  : ""
              }`}
            >
              {/* Highlight Gradient Borders */}
              {plan.isBestValue && (
                <div
                  className="absolute inset-0 rounded-3xl p-px pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(197,249,85,0.5), rgba(197,249,85,0.1))",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              )}

              {plan.isPremium && (
                <div
                  className="absolute inset-0 rounded-3xl p-px pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,62,143,0.5), rgba(197,249,85,0.2))",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              )}

              <div>
                {/* Header Row: Badge, Activated & Selected Indicators */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      plan.isBestValue
                        ? "bg-lime text-deep-black shadow-[0_0_15px_rgba(197,249,85,0.4)]"
                        : plan.isPremium
                          ? "bg-pink/20 text-pink border border-pink/30"
                          : "bg-lime/10 text-lime border border-lime/20"
                    }`}
                  >
                    {plan.badge}
                  </span>

                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {isActive && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <svg
                          className="w-3 h-3 text-emerald-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Activated
                      </span>
                    )}

                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-lime bg-lime/10 border border-lime/30 px-2.5 py-0.5 rounded-full">
                        <svg
                          className="w-3.5 h-3.5 text-lime"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Selected
                      </span>
                    ) : (
                      plan.savings && (
                        <span className="text-xs font-bold text-lime bg-lime/10 border border-lime/20 px-2 py-0.5 rounded-full">
                          {plan.savings}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-extrabold text-text-primary mb-1">
                  {plan.name}
                </h3>
                {plan.subtitle && (
                  <p className="text-xs text-text-muted mb-4 min-h-[32px] leading-relaxed">
                    {plan.subtitle}
                  </p>
                )}

                {/* Price Display */}
                <div className="mb-6 pt-2 border-t border-border-subtle/50">
                  {plan.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="line-through text-text-muted text-sm font-semibold">
                        {plan.originalPrice}
                      </span>
                      {plan.savings && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-lime bg-lime/15 px-1.5 py-0.5 rounded">
                          {plan.savings}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm font-sans font-medium text-text-secondary">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {plan.id === "lifetime" && (
                    <p className="text-xs font-bold text-pink mt-1">
                      Pay once, use forever
                    </p>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-text-secondary leading-snug"
                    >
                      <svg
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          plan.isPremium ? "text-pink" : "text-lime"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA Button */}
              <div>
                <button
                  type="button"
                  disabled={Boolean(submittingPlan) || isResolvingIdentity}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanClick(plan);
                  }}
                  className={`btn w-full text-center text-sm font-bold py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.isBestValue
                      ? "btn-primary"
                      : plan.isPremium
                        ? "bg-gradient-to-r from-pink to-rose-500 text-white shadow-[0_4px_20px_rgba(255,62,143,0.3)] hover:brightness-110 hover:-translate-y-0.5"
                        : isSelected
                          ? "btn-primary"
                          : "btn-secondary"
                  }`}
                >
                  {isLoadingThisPlan ? (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="w-4 h-4 animate-spin text-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          strokeDasharray="32"
                          strokeDashoffset="12"
                        />
                      </svg>
                      Preparing Checkout...
                    </span>
                  ) : (
                    plan.cta
                  )}
                </button>

                {plan.id === "free" && (
                  <p className="text-[11px] text-center text-text-muted mt-2">
                    Default free tier — No credit card needed
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Homepage upgrade hint */}
      {!isPlanPage && (
        <p className="text-center text-sm text-text-secondary mb-10">
          Already have MeshyGrab? Open the extension and click Plans to upgrade.
        </p>
      )}

      {/* Feature Matrix / Guarantee Box */}
      <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 sm:p-10 max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
          All Paid Tiers Include Full Pro Rights
        </h2>
        <p className="text-sm text-text-secondary max-w-xl mx-auto mb-8">
          Whether you choose Pro Monthly, Pro Annual, or Lifetime, you get
          unlimited access with no hidden restrictions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-4 bg-bg-elevated/50 border border-border-subtle rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-lime/10 text-lime flex items-center justify-center font-bold text-sm mb-3">
              100%
            </div>
            <h4 className="font-semibold text-text-primary text-sm mb-1">
              Instant Activation
            </h4>
            <p className="text-xs text-text-muted">
              License unlocks automatically inside your Chrome extension after
              checkout.
            </p>
          </div>
          <div className="p-4 bg-bg-elevated/50 border border-border-subtle rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-lime/10 text-lime flex items-center justify-center font-bold text-sm mb-3">
              ⚡
            </div>
            <h4 className="font-semibold text-text-primary text-sm mb-1">
              Priority Model Support
            </h4>
            <p className="text-xs text-text-muted">
              Get access to new export formats and feature updates before
              everyone else.
            </p>
          </div>
          <div className="p-4 bg-bg-elevated/50 border border-border-subtle rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-pink/10 text-pink flex items-center justify-center font-bold text-sm mb-3">
              🛡️
            </div>
            <h4 className="font-semibold text-text-primary text-sm mb-1">
              Cancel Anytime
            </h4>
            <p className="text-xs text-text-muted">
              No long term lock-in for subscriptions. Lifetime plan has zero
              recurring fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
