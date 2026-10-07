"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPlansList } from "@/constants/constants";
import { PlanItem } from "@/types/types";
import { isFavLifetimeUser as checkIsFavLifetimeUser } from "@/utils/allowlist";
import FallSaleBanner from "./FallSaleBanner";

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

  const [entitlementEmail, setEntitlementEmail] = useState<string | null>(null);

  const isFavLifetimeUser = useMemo(
    () => checkIsFavLifetimeUser(entitlementEmail),
    [entitlementEmail],
  );

  const favLifetimePrice =
    process.env.NEXT_PUBLIC_FAV_LIFETIME_PRICE || "$4.99";

  const isDiscounted = process.env.NEXT_PUBLIC_IS_DISCOUNTED_PRICES === "true";
  const effectivePlansList = useMemo(
    () => getPlansList(isDiscounted, isFavLifetimeUser),
    [isDiscounted, isFavLifetimeUser],
  );

  // Keep a ref of current plans to avoid re-creating callbacks when plans list changes
  const plansRef = useRef(effectivePlansList);
  useEffect(() => {
    plansRef.current = effectivePlansList;
  }, [effectivePlansList]);

  // Track fetched installationId to guarantee entitlement API is called at most once per installationId
  const fetchedInstallationIdRef = useRef<string | null>(null);

  const getPriceIdForPlan = (planId: string) => {
    if (planId === "lifetime" && isFavLifetimeUser) {
      const favPriceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_FAV_LIFETIME;
      if (favPriceId) return favPriceId;
    }
    if (isDiscounted) {
      if (planId === "pro-max") {
        return (
          process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_MONTHLY_PRO_MAX_DISCOUNTED ||
          process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_MONTHLY_PRO_MAX
        );
      }
      if (planId === "pro-annual") {
        return (
          process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_ANNUALLY_DISCOUNTED ||
          process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_ANNUALLY
        );
      }
      if (planId === "lifetime") {
        return (
          process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_LIFETIME_DISCOUNTED ||
          process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_LIFETIME
        );
      }
    }

    if (planId === "pro")
      return process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_MONTHLY;
    if (planId === "pro-max")
      return process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_MONTHLY_PRO_MAX;
    if (planId === "pro-annual")
      return process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_ANNUALLY;
    if (planId === "lifetime")
      return process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_LIFETIME;
    return undefined;
  };

  // Identity resolution helper
  const resolveIdentity = useCallback(async (targetInstallationId: string) => {
    setIsResolvingIdentity(true);
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const version = process.env.NEXT_PUBLIC_API_VERSION || "v3";
      const endpoint = `${baseUrl}/${version}/entitlement?installationId=${encodeURIComponent(
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
        if (fetchedEmail) {
          setEmail(fetchedEmail);
          setEntitlementEmail(fetchedEmail);
        }

        if (data.isPaid === true && data.plan) {
          const matchingPlan = plansRef.current.find(
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
      if (fetchedInstallationIdRef.current !== installationId) {
        fetchedInstallationIdRef.current = installationId;
        queueMicrotask(() => {
          resolveIdentity(installationId);
        });
      }
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

      const targetPriceId = getPriceIdForPlan(plan.id);
      const isFavLifetimeForRequest =
        plan.id === "lifetime" && isFavLifetimeUser;

      const payload = {
        plan: plan.planKey,
        ...(targetPriceId ? { priceId: targetPriceId } : {}),
        isDiscounted,
        isFavLifetime: isFavLifetimeForRequest,
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
      className={`container mx-auto max-w-7xl px-4 sm:px-6 pb-16 ${
        isPlanPage ? "pt-2 sm:pt-4" : "pt-10 sm:pt-14"
      }`}
    >
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/25 rounded-full text-xs font-semibold text-lime mb-2.5">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          {isDiscounted ? "🍁 Limited Time Fall Sale" : "Plans & Pricing"}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-2 leading-tight">
          {isDiscounted
            ? "Fall Sale: Huge Discounts on 3D Export Plans!"
            : "Flexible plans for every 3D creator"}
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">
          {isDiscounted
            ? "Start free with 2 downloads, or grab limited-time Fall Sale discounts on Pro Max ($2.99), Annual ($5.99), and Lifetime ($9.99)!"
            : "Start free with 2 workspace downloads, or upgrade for unlimited 3D exports, Community model allowances, and multi-account access."}
        </p>
      </div>

      {/* Fall Sale Countdown Banner */}
      {isDiscounted && <FallSaleBanner />}

      {/* Missing InstallationId Warning State (Plans page only) */}
      {isPlanPage && !installationId && (
        <div className="max-w-2xl mx-auto mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-bold mb-1 text-xs sm:text-sm">
            <svg
              className="w-4 h-4 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Opened Outside MeshyGrab Extension
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            To upgrade to a paid plan, please open the Plans & Pricing page
            directly from inside your <strong>MeshyGrab</strong> Chrome
            Extension so your account identity is verified automatically.
          </p>
        </div>
      )}

      {/* Checkout / Identity Error Banner */}
      {checkoutError && (
        <div className="max-w-2xl mx-auto mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-center flex items-center justify-between gap-4">
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
      <div className="max-w-4xl mx-auto mb-6 sm:mb-8 p-2.5 sm:p-3 bg-bg-card border border-border-subtle rounded-2xl flex flex-wrap items-center justify-around gap-2.5 text-xs font-medium">
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-lime" />
          <span>
            Free: <strong className="text-text-primary">2 Downloads</strong>
          </span>
        </div>
        <span className="text-text-muted font-bold hidden sm:inline">
          &rarr;
        </span>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-lime" />
          <span>
            Pro: <strong className="text-lime">$0.99/mo</strong>
          </span>
        </div>
        <span className="text-text-muted font-bold hidden sm:inline">
          &rarr;
        </span>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-lime" />
          <span>
            Pro Max:{" "}
            <strong className="text-lime font-bold">
              {isDiscounted ? "$2.99/mo 🍁 50% OFF" : "$3.99/mo 🔥 HOT"}
            </strong>
          </span>
        </div>
        <span className="text-text-muted font-bold hidden sm:inline">
          &rarr;
        </span>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-lime" />
          <span>
            Annual:{" "}
            <strong className="text-lime">
              {isDiscounted ? "$5.99/yr 🍁 40% OFF" : "$9.99/yr"}
            </strong>
          </span>
        </div>
        <span className="text-text-muted font-bold hidden sm:inline">
          &rarr;
        </span>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-pink animate-pulse" />
          <span className="bg-pink/15 px-2.5 py-0.5 rounded-full border border-pink/40 shadow-[0_0_10px_rgba(255,62,143,0.2)]">
            Lifetime:{" "}
            <strong className="text-pink font-extrabold">
              {isFavLifetimeUser
                ? `${favLifetimePrice} ONE-TIME ⭐ FAV DEAL`
                : isDiscounted
                  ? "$9.99 ONE-TIME 🍁 67% OFF"
                  : "$19.99 ONE-TIME 🔥"}
            </strong>
          </span>
        </div>
      </div>

      {/* 5 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch mb-16">
        {effectivePlansList.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isActive = activePlanId === plan.id;
          const isLoadingThisPlan = submittingPlan === plan.id;
          const isRecommended = plan.isBestValue || plan.isRecommended;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "bg-bg-card ring-2 ring-lime shadow-[0_0_35px_rgba(197,249,85,0.18)] scale-[1.02]"
                  : "bg-bg-card/80 hover:bg-bg-card hover:-translate-y-1 border border-border-subtle hover:border-lime/30"
              } ${
                isRecommended
                  ? "border-lime/60 bg-gradient-to-b from-lime/10 via-bg-card to-bg-card shadow-[0_0_40px_rgba(197,249,85,0.18)] ring-1 ring-lime/40"
                  : ""
              } ${
                plan.isPremium
                  ? "border-pink/40 bg-gradient-to-b from-pink/10 via-bg-card to-bg-card shadow-[0_0_45px_rgba(255,62,143,0.2)] ring-1 ring-pink/50"
                  : ""
              }`}
            >
              {/* Highlight Gradient Borders */}
              {isRecommended && (
                <div
                  className="absolute inset-0 rounded-3xl p-px pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(197,249,85,0.6), rgba(197,249,85,0.15))",
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
                      "linear-gradient(135deg, rgba(255,62,143,0.6), rgba(197,249,85,0.25))",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              )}

              <div>
                {/* Header Row: Badge, Activated & Selected Indicators */}
                <div className="flex items-center justify-between gap-1.5 mb-3 flex-wrap">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      plan.id === "lifetime"
                        ? "bg-gradient-to-r from-pink to-rose-500 text-white shadow-[0_0_18px_rgba(255,62,143,0.4)] animate-pulse"
                        : isRecommended
                          ? "bg-lime text-deep-black shadow-[0_0_15px_rgba(197,249,85,0.4)]"
                          : "bg-lime/10 text-lime border border-lime/20"
                    }`}
                  >
                    {plan.badge}
                  </span>

                  <div className="flex items-center gap-1 flex-wrap justify-end">
                    {isActive && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
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
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-lime bg-lime/10 border border-lime/30 px-2 py-0.5 rounded-full">
                        <svg
                          className="w-3 h-3 text-lime"
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
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            plan.id === "lifetime"
                              ? "text-pink bg-pink/15 border border-pink/30 shadow-[0_0_10px_rgba(255,62,143,0.2)]"
                              : "text-lime bg-lime/10 border border-lime/20"
                          }`}
                        >
                          {plan.savings}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary mb-1">
                  {plan.name}
                </h3>
                {plan.subtitle && (
                  <p className="text-xs text-text-muted mb-4 min-h-[32px] leading-relaxed">
                    {plan.subtitle}
                  </p>
                )}

                {/* Price Display */}
                <div className="mb-5 pt-2 border-t border-border-subtle/50">
                  {plan.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="line-through text-text-muted text-xs font-semibold">
                        {plan.originalPrice}
                      </span>
                      {plan.savings && (
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                            plan.id === "lifetime"
                              ? "text-pink bg-pink/15 border border-pink/30"
                              : "text-lime bg-lime/15"
                          }`}
                        >
                          {plan.savings}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && plan.id !== "lifetime" && (
                      <span className="text-xs sm:text-sm font-sans font-medium text-text-secondary">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Prominent One-Time Payment Badge on NEXT LINE for Lifetime Plan */}
                  {plan.id === "lifetime" ? (
                    <div className="mt-2.5 flex flex-col items-start gap-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-pink bg-pink/20 border border-pink/40 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(255,62,143,0.3)] animate-pulse">
                        <span>⚡</span>
                        <span className="uppercase tracking-wider">
                          ONE-TIME PAYMENT
                        </span>
                      </span>
                      <p className="text-[11px] font-semibold text-text-secondary mt-1 leading-snug">
                        Pay once, keep forever. Priority updates & zero renewal
                        fees.
                      </p>
                    </div>
                  ) : null}
                </div>

                {/* Prominent Multi-Account Highlight Banner (Pro Max & Lifetime only) */}
                {plan.accountsAdditional > 0 && (
                  <div
                    className={`mb-4 p-2.5 rounded-xl border text-xs font-semibold leading-tight ${
                      plan.id === "pro-max"
                        ? "bg-lime/10 border-lime/30 text-lime shadow-[0_0_12px_rgba(197,249,85,0.1)]"
                        : "bg-pink/15 border-pink/40 text-pink shadow-[0_0_15px_rgba(255,62,143,0.2)]"
                    }`}
                  >
                    <div className="font-extrabold mb-0.5 flex items-center gap-1.5 text-text-primary">
                      <span>🔑</span>
                      <span>
                        +{plan.accountsAdditional} Extra Meshy{" "}
                        {plan.accountsAdditional === 1 ? "Account" : "Accounts"}
                      </span>
                    </div>
                    <div className="text-[11px] opacity-90">
                      {plan.accountsBenefit ||
                        (plan.id === "pro-max"
                          ? "3 total Meshy accounts under 1 subscription"
                          : "5 total Meshy accounts under 1 purchase")}
                    </div>
                  </div>
                )}

                {/* Hot Additions Callout Box (Pro Max, Annual & Lifetime) */}
                {plan.hasUpcomingPerks && (
                  <div
                    className={`mb-4 p-2.5 rounded-xl border text-xs font-semibold leading-tight ${
                      plan.id === "lifetime"
                        ? "border-pink/40 bg-pink/10 text-pink shadow-[0_0_15px_rgba(255,62,143,0.15)]"
                        : "border-lime/30 bg-lime/10 text-lime shadow-[0_0_15px_rgba(197,249,85,0.12)]"
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center gap-1.5 text-text-primary">
                      <span className="text-sm">🔥</span>
                      <span className="tracking-wide">
                        Hot Features Included
                      </span>
                    </div>
                    <div className="text-[11px] text-text-secondary leading-snug font-normal">
                      <strong
                        className={
                          plan.id === "lifetime"
                            ? "text-pink font-bold"
                            : "text-lime font-bold"
                        }
                      >
                        ✨ Tripo 3D Support
                      </strong>{" "}
                      & expanded community download formats included!
                    </div>
                  </div>
                )}

                {/* Features list */}
                <div className="space-y-2.5 mb-6 text-xs sm:text-sm">
                  <div className="space-y-2 pt-1">
                    {plan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-text-secondary leading-snug"
                      >
                        <svg
                          className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                            plan.isPremium
                              ? "text-pink"
                              : isRecommended
                                ? "text-lime"
                                : "text-lime/80"
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
                        <span
                          className={
                            feature.includes("Tripo 3D") ||
                            feature.includes("Multi-Account")
                              ? "font-bold text-text-primary"
                              : ""
                          }
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
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
                  className={`btn w-full text-center text-xs sm:text-sm font-bold py-3 rounded-xl transition-all duration-300 whitespace-pre-line disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRecommended
                      ? "btn-primary shadow-[0_4px_20px_rgba(197,249,85,0.3)]"
                      : plan.isPremium
                        ? "bg-gradient-to-r from-pink via-rose-500 to-purple-600 text-white shadow-[0_4px_25px_rgba(255,62,143,0.4)] hover:brightness-110 hover:scale-[1.02]"
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
                      Preparing...
                    </span>
                  ) : (
                    plan.cta
                  )}
                </button>

                {plan.id === "free" && (
                  <p className="text-[10px] text-center text-text-muted mt-2">
                    Default free tier — No card required
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

      {/* Feature Comparison Table */}
      <div className="bg-bg-card border border-border-subtle rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto mb-16 overflow-hidden">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-2">
            Plan Feature Comparison
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary">
            Compare workspace export formats, Community model limits, and
            multi-account allowances side by side.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-border-subtle text-text-muted">
                <th className="pb-4 font-semibold w-1/4">Feature</th>
                <th className="pb-4 font-semibold text-center">Free</th>
                <th className="pb-4 font-semibold text-center">Pro Monthly</th>
                <th className="pb-4 font-semibold text-center text-lime font-bold">
                  Pro Max ⭐
                </th>
                <th className="pb-4 font-semibold text-center">Pro Annual</th>
                <th className="pb-4 font-semibold text-center text-pink font-bold">
                  Lifetime 🔥
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/50 text-text-secondary">
              {/* Category: Price */}
              <tr className="bg-bg-elevated/30">
                <td className="py-3.5 font-bold text-text-primary" colSpan={6}>
                  Pricing & Billing
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary pl-3">
                  Price
                </td>
                <td className="py-3 text-center text-text-primary font-mono font-semibold">
                  $0
                </td>
                <td className="py-3 text-center text-text-primary font-mono font-semibold">
                  $0.99/mo
                </td>
                <td className="py-3 text-center text-lime font-mono font-bold">
                  <span className="line-through text-text-muted text-xs block font-normal">
                    {isDiscounted ? "$4.99/mo" : "$5.99/mo"}
                  </span>
                  {isDiscounted ? "$2.99/mo" : "$3.99/mo"}
                </td>
                <td className="py-3 text-center text-text-primary font-mono font-semibold">
                  <span className="line-through text-text-muted text-xs block font-normal">
                    {isDiscounted ? "$9.99/yr" : "$12/yr"}
                  </span>
                  {isDiscounted ? "$5.99/yr" : "$9.99/yr"}
                </td>
                <td className="py-3 text-center text-pink font-mono font-bold">
                  <span className="line-through text-text-muted text-xs block font-normal">
                    $29.99
                  </span>
                  {isFavLifetimeUser
                    ? `${favLifetimePrice} once`
                    : isDiscounted
                      ? "$9.99 once"
                      : "$19.99 once"}
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary pl-3">
                  Billing Type
                </td>
                <td className="py-3 text-center text-text-muted">
                  Free forever
                </td>
                <td className="py-3 text-center">Monthly</td>
                <td className="py-3 text-center font-medium text-lime/90">
                  Monthly
                </td>
                <td className="py-3 text-center">Annual</td>
                <td className="py-3 text-center font-medium text-pink">
                  One-time purchase
                </td>
              </tr>

              {/* Category: Workspace Exports */}
              <tr className="bg-bg-elevated/30">
                <td className="py-3.5 font-bold text-text-primary" colSpan={6}>
                  Workspace Model & Texture Exports
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary pl-3">
                  GLB, OBJ, FBX
                </td>
                <td className="py-3 text-center">2 total</td>
                <td className="py-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary pl-3">
                  STL & 3MF (3D Printing)
                </td>
                <td className="py-3 text-center">2 total</td>
                <td className="py-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary pl-3">
                  Texture PNG Maps
                </td>
                <td className="py-3 text-center">8 total</td>
                <td className="py-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
              </tr>

              {/* Category: Community Models */}
              <tr className="bg-bg-elevated/30">
                <td className="py-3.5 font-bold text-text-primary" colSpan={6}>
                  Community Models
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary pl-3">
                  Community model downloads
                </td>
                <td className="py-3 text-center">1 total</td>
                <td className="py-3 text-center">2 / month</td>
                <td className="py-3 text-center font-bold text-lime">
                  8 / month
                </td>
                <td className="py-3 text-center">40 / year</td>
                <td className="py-3 text-center font-bold text-pink">
                  Unlimited
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary pl-3">
                  Refresh
                </td>
                <td className="py-3 text-center text-text-muted">One-time</td>
                <td className="py-3 text-center">Every month</td>
                <td className="py-3 text-center font-medium text-lime/90">
                  Every month
                </td>
                <td className="py-3 text-center">Every year</td>
                <td className="py-3 text-center font-medium text-pink">
                  Unlimited
                </td>
              </tr>

              {/* Category: Additional Meshy Accounts */}
              <tr className="bg-bg-elevated/30">
                <td className="py-3.5 font-bold text-text-primary" colSpan={6}>
                  Additional Meshy Accounts
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary pl-3">
                  Additional accounts
                </td>
                <td className="py-3 text-center text-text-muted">0</td>
                <td className="py-3 text-center text-text-muted">0</td>
                <td className="py-3 text-center font-bold text-lime">+2</td>
                <td className="py-3 text-center text-text-muted">0</td>
                <td className="py-3 text-center font-bold text-pink">+4</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary pl-3">
                  Total accounts
                </td>
                <td className="py-3 text-center">1</td>
                <td className="py-3 text-center">1</td>
                <td className="py-3 text-center font-bold text-lime">3</td>
                <td className="py-3 text-center">1</td>
                <td className="py-3 text-center font-bold text-pink">5</td>
              </tr>

              {/* Category: Hot Features & Format Support */}
              <tr className="bg-bg-elevated/30">
                <td className="py-3.5 font-bold text-text-primary" colSpan={6}>
                  🔥 Hot Features & Format Support
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary pl-3">
                  Tripo 3D Support ✨
                </td>
                <td className="py-3 text-center text-text-muted">❌</td>
                <td className="py-3 text-center text-text-muted">❌</td>
                <td className="py-3 text-center font-bold text-lime">
                  ✅ Included
                </td>
                <td className="py-3 text-center font-bold text-lime">
                  ✅ Included
                </td>
                <td className="py-3 text-center font-bold text-pink">
                  ✅ Included
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary pl-3">
                  Expanded Community Download Formats
                </td>
                <td className="py-3 text-center text-text-muted">❌</td>
                <td className="py-3 text-center text-text-muted">❌</td>
                <td className="py-3 text-center font-bold text-lime">
                  ✅ Included
                </td>
                <td className="py-3 text-center font-bold text-lime">
                  ✅ Included
                </td>
                <td className="py-3 text-center font-bold text-pink">
                  ✅ Included
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary pl-3">
                  Priority Beta Access
                </td>
                <td className="py-3 text-center text-text-muted">❌</td>
                <td className="py-3 text-center text-text-muted">❌</td>
                <td className="py-3 text-center text-text-muted">❌</td>
                <td className="py-3 text-center text-text-muted">❌</td>
                <td className="py-3 text-center font-bold text-pink">
                  ✅ Always Priority
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-text-muted text-center mt-6 leading-relaxed">
          * MeshyGrab does not create, own, or manage your Meshy accounts.
          Additional slots allow you to attach extra existing Meshy accounts to
          your single MeshyGrab subscription or purchase entitlement.
        </p>
      </div>

      {/* Feature Matrix / Guarantee Box */}
      <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 sm:p-10 max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
          All Paid Tiers Include Full Pro Rights
        </h2>
        <p className="text-sm text-text-secondary max-w-xl mx-auto mb-8">
          Whether you choose Pro Monthly, Pro Max, Pro Annual, or Lifetime, you
          get instant activation with zero hidden restrictions.
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
