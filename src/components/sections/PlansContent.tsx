"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPlansList } from "@/constants/constants";
import { PlanItem } from "@/types/types";
import { isFavLifetimeUser as checkIsFavLifetimeUser } from "@/utils/allowlist";
import { useActiveSale } from "@/hooks/useActiveSale";
import SeasonalSaleBanner from "./SeasonalSaleBanner";
import HalloweenPricingDecor from "@/components/pricing/HalloweenPricingDecor";
import HalloweenCardInteraction from "@/components/pricing/HalloweenCardInteraction";
import {
  Sparkles,
  Download,
  Layers,
  Globe,
  Box,
  CheckCircle2,
} from "lucide-react";

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

  const [selectedPlanId, setSelectedPlanId] = useState<string>("pro-max");
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

  const { isActive: isDiscounted, saleData } = useActiveSale();
  const effectivePlansList = useMemo(
    () => getPlansList(isDiscounted, isFavLifetimeUser, saleData),
    [isDiscounted, isFavLifetimeUser, saleData],
  );

  // 4 Subscription plans for the pricing cards (Free remains in comparison table)
  const subscriptionPlans = useMemo(
    () => effectivePlansList.filter((plan) => plan.id !== "free"),
    [effectivePlansList],
  );

  // Consistent card header helpers
  const getTopLabel = (plan: PlanItem) => {
    if (plan.id === "pro") {
      return {
        text: "Monthly",
        style: "bg-lime/10 text-lime border border-lime/25",
      };
    }
    if (plan.id === "pro-max") {
      return {
        text: "⭐ Recommended",
        style:
          "bg-lime text-deep-black font-extrabold shadow-[0_0_15px_rgba(197,249,85,0.4)]",
      };
    }
    if (plan.id === "pro-annual") {
      return {
        text: "Annual Savings",
        style: "bg-lime/15 text-lime border border-lime/30",
      };
    }
    return {
      text: "⚡ Lifetime Deal",
      style:
        "bg-[linear-gradient(135deg,#c5f955_0%,#00f2fe_25%,#a855f7_50%,#ff3e8f_75%,#fbbf24_90%,#c5f955_100%)] bg-[length:300%_300%] text-white font-extrabold shadow-[0_0_18px_rgba(168,85,247,0.4)] animate-gradient-shift",
    };
  };

  const getSaleBadge = (plan: PlanItem) => {
    const saleEmoji = saleData?.emoji || "🎃";
    const saleTitle = saleData?.badgeText || "Halloween Special";

    if (plan.id === "pro") {
      return {
        text: "Flat Rate · Core Plan",
        style: "bg-white/[0.06] text-text-secondary border border-white/10",
      };
    }
    if (plan.id === "pro-max") {
      return {
        text: isDiscounted
          ? `${saleEmoji} ${saleTitle} · 50% OFF`
          : "🔥 Best Value · Save ~33%",
        style:
          "bg-lime/15 text-lime border border-lime/30 shadow-[0_0_10px_rgba(197,249,85,0.15)]",
      };
    }
    if (plan.id === "pro-annual") {
      return {
        text: isDiscounted
          ? `${saleEmoji} ${saleTitle} · 40% OFF`
          : "Annual Bundle · Save ~17%",
        style:
          "bg-lime/15 text-lime border border-lime/30 shadow-[0_0_10px_rgba(197,249,85,0.15)]",
      };
    }
    return {
      text: isFavLifetimeUser
        ? "⭐ Fav Deal · 83% OFF"
        : isDiscounted
          ? `${saleEmoji} ${saleTitle} · 67% OFF`
          : "🔥 Limited Offer · Save ~33%",
      style:
        "bg-purple-950/60 text-transparent bg-clip-text bg-[linear-gradient(135deg,#c5f955_0%,#00f2fe_25%,#a855f7_50%,#ff3e8f_75%,#fbbf24_90%,#c5f955_100%)] bg-[length:300%_300%] animate-gradient-shift border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]",
    };
  };

  const getCleanPlanName = (plan: PlanItem) => {
    if (plan.id === "pro") return "Pro Monthly";
    if (plan.id === "pro-max") return "Pro Max";
    if (plan.id === "pro-annual") return "Pro Annual";
    if (plan.id === "lifetime") return "Lifetime";
    return plan.name;
  };

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

      const checkoutUrl = data.url || null;
      const ptxn =
        data.transactionId || data._ptxn || data.transaction?.id || null;

      if (checkoutUrl) {
        window.location.assign(checkoutUrl);
      } else if (ptxn) {
        // Fallback to existing /checkout page contract if url is missing
        router.push(
          `/checkout?_ptxn=${encodeURIComponent(
            ptxn,
          )}&installationId=${encodeURIComponent(installationId)}`,
        );
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
      className={`relative container mx-auto max-w-7xl px-4 sm:px-6 pb-16 ${
        isPlanPage ? "pt-2 sm:pt-4" : "pt-10 sm:pt-14"
      }`}
    >
      {/* Halloween Exclusive Visual Overlay (active strictly during halloween_2026) */}
      <HalloweenPricingDecor />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/25 rounded-full text-xs font-semibold text-lime mb-2.5">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          {isDiscounted && saleData
            ? `${saleData.emoji ? `${saleData.emoji} ` : ""}Limited Time ${saleData.title}`
            : "Plans & Pricing"}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-2 leading-tight">
          {isDiscounted && saleData
            ? `${saleData.title}: Huge Discounts on 3D Export Plans!`
            : "Flexible plans for every 3D creator"}
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">
          {isDiscounted && saleData
            ? `Start free with 2 downloads, or grab limited-time discounts on Pro Max ($2.99), Annual ($5.99), and Lifetime ($9.99)! ${saleData.bannerText}`
            : "Start free with 2 workspace downloads, or upgrade for unlimited 3D exports, Community model allowances, and multi-account access."}
        </p>
      </div>

      {/* Seasonal Sale Countdown Banner */}
      {isDiscounted && saleData && <SeasonalSaleBanner sale={saleData} />}

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

      {/* Free Starter Showcase */}
      <div className="max-w-3xl mx-auto mb-8 sm:mb-10 p-5 sm:p-6 bg-bg-card/90 border border-border-subtle rounded-3xl">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-lime" />
            <h3 className="text-sm sm:text-base font-extrabold text-text-primary uppercase tracking-wider">
              Start Creating for Free
            </h3>
            <Sparkles className="w-5 h-5 text-lime" />
          </div>
          <p className="text-xs sm:text-sm text-text-secondary">
            Everything you need to explore MeshyGrab.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Download className="w-4 h-4 text-lime flex-shrink-0" />
            <span className="text-xs sm:text-sm text-text-secondary">
              <strong className="text-text-primary">2</strong> Workspace Model
              Downloads
            </span>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Layers className="w-4 h-4 text-lime flex-shrink-0" />
            <span className="text-xs sm:text-sm text-text-secondary">
              <strong className="text-text-primary">8</strong> Texture PNG
              Downloads
            </span>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Globe className="w-4 h-4 text-lime flex-shrink-0" />
            <span className="text-xs sm:text-sm text-text-secondary">
              <strong className="text-text-primary">1</strong> Community Model
              Download
            </span>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Box className="w-4 h-4 text-lime flex-shrink-0" />
            <span className="text-xs sm:text-sm text-text-secondary">
              Free <strong className="text-text-primary">3D Renderer</strong>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-text-muted">
          <CheckCircle2 className="w-3.5 h-3.5 text-lime/60" />
          <span>No subscription required to get started.</span>
        </div>
      </div>

      {/* 4 Subscription Cards Grid with Seasonal Halloween Cursor & Emojis */}
      <HalloweenCardInteraction
        isActive={isDiscounted && saleData?.id === "halloween_2026"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-16">
          {subscriptionPlans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const isActive = activePlanId === plan.id;
            const isLoadingThisPlan = submittingPlan === plan.id;
            const isRecommended = plan.isBestValue || plan.isRecommended;

            const topLabel = getTopLabel(plan);
            const saleBadge = getSaleBadge(plan);
            const planDisplayName = getCleanPlanName(plan);

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative rounded-3xl p-5 sm:p-6 xl:p-5 2xl:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 min-w-0 overflow-hidden ${
                  isSelected
                    ? "bg-bg-card ring-2 ring-lime shadow-[0_0_35px_rgba(197,249,85,0.18)] scale-[1.01]"
                    : "bg-bg-card/85 hover:bg-bg-card hover:-translate-y-1 border border-border-subtle hover:border-lime/30"
                } ${
                  isRecommended
                    ? "border-lime/60 bg-gradient-to-b from-lime/10 via-bg-card to-bg-card shadow-[0_0_40px_rgba(197,249,85,0.18)] ring-1 ring-lime/40"
                    : ""
                } ${
                  plan.isPremium
                    ? "border-purple-500/30 bg-gradient-to-b from-purple-500/10 via-bg-card to-bg-card shadow-[0_0_50px_rgba(168,85,247,0.18),0_0_25px_rgba(197,249,85,0.12)] ring-1 ring-purple-500/40"
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
                  <>
                    <div
                      className="absolute inset-0 rounded-3xl p-px pointer-events-none animate-gradient-shift bg-[length:300%_300%]"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(197,249,85,0.5), rgba(0,242,254,0.4), rgba(168,85,247,0.5), rgba(255,62,143,0.4), rgba(251,191,36,0.4), rgba(197,249,85,0.5))",
                        backgroundSize: "300% 300%",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        animation: "gradient-shift 6s ease-in-out infinite",
                      }}
                    />
                    {/* Ambient glow */}
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-lime-500/10 blur-3xl pointer-events-none" />
                  </>
                )}

                <div className="flex flex-col flex-grow min-w-0">
                  {/* 1. Top label row */}
                  <div className="flex items-center justify-between gap-1.5 h-7 mb-2.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${topLabel.style}`}
                    >
                      {topLabel.text}
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
                      ) : null}
                    </div>
                  </div>

                  {/* 2. Plan name row */}
                  <div className="h-8 flex items-center mb-1.5">
                    <h3 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight leading-none">
                      {planDisplayName}
                    </h3>
                  </div>

                  {/* 3. Sale badge row */}
                  <div className="h-7 flex items-center mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${saleBadge.style}`}
                    >
                      {saleBadge.text}
                    </span>
                  </div>

                  {/* 4. Description row */}
                  <div className="h-11 sm:h-12 flex items-start text-xs sm:text-[13px] text-text-secondary leading-relaxed mb-4 overflow-hidden">
                    <p className="line-clamp-2">{plan.subtitle}</p>
                  </div>

                  {/* 5. Pricing and remaining plan details */}
                  <div className="pt-3 border-t border-border-subtle/50 mb-4">
                    {/* Strikethrough / original price row */}
                    <div className="h-6 flex items-center gap-1.5 mb-1">
                      {plan.originalPrice ? (
                        <>
                          <span className="line-through text-text-muted text-xs font-semibold">
                            {plan.originalPrice}
                          </span>
                          {plan.savings && (
                            <span
                              className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                                plan.id === "lifetime"
                                  ? "bg-clip-text text-transparent bg-[linear-gradient(135deg,#c5f955_0%,#00f2fe_25%,#a855f7_50%,#ff3e8f_75%,#fbbf24_90%,#c5f955_100%)] bg-[length:300%_300%] animate-gradient-shift border border-purple-500/30"
                                  : "text-lime bg-lime/15"
                              }`}
                            >
                              {plan.savings}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-[11px] text-text-muted font-medium">
                          Standard all-year flat rate
                        </span>
                      )}
                    </div>

                    {/* Main Price display */}
                    <div className="h-10 flex items-baseline gap-1.5 font-mono">
                      <span
                        className={`text-3xl sm:text-4xl font-black tracking-tight ${
                          plan.isPremium
                            ? "bg-[linear-gradient(135deg,#c5f955_0%,#00f2fe_25%,#a855f7_50%,#ff3e8f_75%,#fbbf24_90%,#c5f955_100%)] bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient-shift"
                            : "text-text-primary"
                        }`}
                      >
                        {plan.price}
                      </span>
                      {plan.period && plan.id !== "lifetime" && (
                        <span className="text-xs sm:text-sm font-sans font-medium text-text-secondary">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {/* Cadence & Commitment note */}
                    <div className="min-h-[50px] mt-2 flex flex-col justify-start">
                      {plan.id === "lifetime" ? (
                        <div className="flex flex-col items-start gap-1">
                          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold border border-purple-500/40 px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.3)] bg-purple-950/40">
                            <span>⚡</span>
                            <span className="uppercase tracking-wider bg-[linear-gradient(135deg,#c5f955_0%,#00f2fe_25%,#a855f7_50%,#ff3e8f_75%,#fbbf24_90%,#c5f955_100%)] bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient-shift">
                              ONE-TIME PAYMENT
                            </span>
                          </span>
                          <p className="text-[11px] font-semibold text-text-secondary mt-0.5 leading-snug">
                            Pay once, keep forever. Priority updates & zero
                            renewal fees.
                          </p>
                        </div>
                      ) : plan.id === "pro-max" ? (
                        <div className="flex flex-col items-start gap-1">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-lime bg-lime/10 border border-lime/25 px-2.5 py-0.5 rounded-full">
                            <span>🔄</span>
                            <span className="uppercase tracking-wider">
                              Billed Monthly
                            </span>
                          </span>
                          <p className="text-[11px] text-text-secondary mt-0.5 leading-snug">
                            Cancel anytime with 1 click. Instant feature
                            activation.
                          </p>
                        </div>
                      ) : plan.id === "pro-annual" ? (
                        <div className="flex flex-col items-start gap-1">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-lime bg-lime/10 border border-lime/25 px-2.5 py-0.5 rounded-full">
                            <span>📅</span>
                            <span className="uppercase tracking-wider">
                              Billed Annually
                            </span>
                          </span>
                          <p className="text-[11px] text-text-secondary mt-0.5 leading-snug">
                            {isDiscounted
                              ? "$5.99 billed annually (~$0.50/mo). Cancel anytime."
                              : "$9.99 billed annually. Cancel anytime."}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-start gap-1">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                            <span>🔄</span>
                            <span className="uppercase tracking-wider">
                              Billed Monthly
                            </span>
                          </span>
                          <p className="text-[11px] text-text-secondary mt-0.5 leading-snug">
                            Cancel anytime with 1 click. Full workspace export
                            rights.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Multi-Account Highlight Banner (Pro Max & Lifetime only) */}
                  {plan.accountsAdditional > 0 && (
                    <div
                      className={`mb-3 p-2.5 rounded-xl border text-xs font-semibold leading-tight ${
                        plan.id === "pro-max"
                          ? "bg-lime/10 border-lime/30 text-lime shadow-[0_0_10px_rgba(197,249,85,0.1)]"
                          : "bg-purple-950/40 border-purple-500/30 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                      }`}
                    >
                      <div className="font-extrabold mb-0.5 flex items-center gap-1.5 text-text-primary">
                        <span>🔑</span>
                        <span>
                          +{plan.accountsAdditional} Extra Meshy{" "}
                          {plan.accountsAdditional === 1
                            ? "Account"
                            : "Accounts"}
                        </span>
                      </div>
                      <div className="text-[11px] opacity-90 break-words">
                        {plan.accountsBenefit ||
                          (plan.id === "pro-max"
                            ? "3 total Meshy accounts under 1 subscription"
                            : "5 total Meshy accounts under 1 purchase")}
                      </div>
                    </div>
                  )}

                  {/* 3D Workspace & Model Renderer Feature Box (Pro Monthly Only) */}
                  {plan.id === "pro" && (
                    <div className="mb-3.5 p-2.5 sm:p-3 rounded-2xl border border-lime/25 bg-lime/[0.06] text-xs font-semibold leading-tight">
                      <div className="font-extrabold mb-1 flex items-center gap-1.5 text-text-primary text-[11px] uppercase tracking-wider">
                        <span>🎨</span>
                        <span>3D Renderer &amp; Workspace</span>
                      </div>
                      <div className="text-[11px] text-text-secondary font-normal leading-snug">
                        Interactive 3D model viewport &amp; rendering included
                        for all your 3D files.
                      </div>
                    </div>
                  )}

                  {/* Compact AI Upscaler & Converter Label (Pro Max, Annual & Lifetime) */}
                  {plan.upscalerAllowance && plan.converterAllowance && (
                    <div className="mb-3 flex items-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border shadow-sm ${
                          plan.id === "lifetime"
                            ? "bg-purple-950/40 text-purple-300 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                            : "bg-lime/10 text-lime border-lime/30 shadow-[0_0_10px_rgba(197,249,85,0.1)]"
                        }`}
                      >
                        <span>⚡</span>
                        <span>AI Upscaler &amp; Converter</span>
                        {plan.id === "lifetime" && (
                          <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-[linear-gradient(135deg,#c5f955_0%,#00f2fe_25%,#a855f7_50%,#ff3e8f_75%,#fbbf24_90%,#c5f955_100%)] bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient-shift border border-purple-500/30">
                            Unlimited
                          </span>
                        )}
                      </span>
                    </div>
                  )}

                  {/* Hot Additions Callout Box (Pro Max, Annual & Lifetime) */}
                  {plan.hasUpcomingPerks && (
                    <div
                      className={`mb-3 p-2.5 rounded-xl border text-xs font-semibold leading-tight ${
                        plan.id === "lifetime"
                          ? "border-purple-500/30 bg-purple-950/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.12)]"
                          : "border-lime/30 bg-lime/10 text-lime shadow-[0_0_10px_rgba(197,249,85,0.1)]"
                      }`}
                    >
                      <div className="font-bold mb-0.5 flex items-center gap-1.5 text-text-primary">
                        <span className="text-xs">🔥</span>
                        <span className="tracking-wide">
                          Hot Features Included
                        </span>
                      </div>
                      <div className="text-[11px] text-text-secondary leading-snug font-normal break-words">
                        <strong
                          className={
                            plan.id === "lifetime"
                              ? "font-bold bg-[linear-gradient(135deg,#c5f955_0%,#00f2fe_25%,#a855f7_50%,#ff3e8f_75%,#fbbf24_90%,#c5f955_100%)] bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient-shift"
                              : "text-lime font-bold"
                          }
                        >
                          ✨ Tripo 3D Support
                        </strong>{" "}
                        &amp; expanded community formats included!
                      </div>
                    </div>
                  )}

                  {/* Features list */}
                  <div className="space-y-2 mb-6 text-xs sm:text-sm min-w-0">
                    <div className="space-y-2 pt-1">
                      {plan.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-text-secondary leading-snug min-w-0"
                        >
                          <svg
                            className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                              plan.isPremium
                                ? "text-purple-400"
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
                            className={`min-w-0 break-words ${
                              feature.includes("Tripo 3D") ||
                              feature.includes("Multi-Account") ||
                              feature.includes("AI texture") ||
                              feature.includes("AI Texture") ||
                              feature.includes("format conversion") ||
                              feature.includes("Format Conversion") ||
                              feature.includes("UNLIMITED")
                                ? "font-bold text-text-primary"
                                : ""
                            }`}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    disabled={Boolean(submittingPlan) || isResolvingIdentity}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanClick(plan);
                    }}
                    className={`btn w-full text-center text-xs sm:text-sm font-bold py-3 rounded-xl transition-all duration-300 whitespace-pre-line disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
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
                </div>
              </div>
            );
          })}
        </div>
      </HalloweenCardInteraction>

      {/* Homepage upgrade hint */}
      {!isPlanPage && (
        <p className="text-center text-sm text-text-secondary mb-10">
          Already have MeshyGrab? Open the extension and click Plans to upgrade.
        </p>
      )}

      {/* Feature Comparison Table */}
      <div className="bg-bg-card border border-border-subtle rounded-3xl p-6 sm:p-10 lg:p-12 max-w-6xl mx-auto mb-16 overflow-hidden">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/30 rounded-full text-xs font-bold text-lime mb-4 uppercase tracking-wider">
            Side-by-Side Comparison
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-3">
            Plan Feature Comparison
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Compare workspace export formats, Community model limits, and
            multi-account allowances side by side.
          </p>
        </div>

        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-left text-xs sm:text-sm border-separate border-spacing-0 min-w-[740px]">
            <thead>
              <tr className="text-text-muted">
                <th className="pb-5 pt-2 font-semibold text-text-secondary text-xs uppercase tracking-wider w-[28%] pr-4">
                  Feature
                </th>
                <th className="pb-5 pt-2 font-semibold text-center text-xs uppercase tracking-wider">
                  Free
                </th>
                <th className="pb-5 pt-2 font-semibold text-center text-xs uppercase tracking-wider">
                  Pro Monthly
                </th>
                <th className="pb-5 pt-2 font-bold text-center text-xs uppercase tracking-wider text-lime bg-lime/[0.04] rounded-t-2xl border-x border-t border-lime/15">
                  <span className="flex flex-col items-center gap-1">
                    <span className="text-[10px] px-2 py-0.5 bg-lime/15 rounded-full">
                      ⭐ Recommended
                    </span>
                    Pro Max
                  </span>
                </th>
                <th className="pb-5 pt-2 font-semibold text-center text-xs uppercase tracking-wider">
                  Pro Annual
                </th>
                <th className="pb-5 pt-2 font-bold text-center text-xs uppercase tracking-wider text-pink bg-pink/[0.04] rounded-t-2xl border-x border-t border-pink/15">
                  <span className="flex flex-col items-center gap-1">
                    <span className="text-[10px] px-2 py-0.5 bg-pink/15 rounded-full">
                      🔥 Best Value
                    </span>
                    Lifetime
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {/* Category: Price */}
              <tr>
                <td
                  className="py-4 px-4 font-bold text-text-primary text-sm border-b border-border-subtle bg-bg-elevated/40 rounded-l-xl"
                  colSpan={6}
                >
                  💰 Pricing & Billing
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Price
                </td>
                <td className="py-4 px-3 text-center text-text-primary font-mono font-semibold">
                  $0
                </td>
                <td className="py-4 px-3 text-center text-text-primary font-mono font-semibold">
                  $0.99/mo
                </td>
                <td className="py-4 px-3 text-center text-lime font-mono font-bold bg-lime/[0.04] border-x border-lime/15">
                  <span className="line-through text-text-muted text-xs block font-normal">
                    {isDiscounted ? "$4.99/mo" : "$5.99/mo"}
                  </span>
                  {isDiscounted ? "$2.99/mo" : "$3.99/mo"}
                </td>
                <td className="py-4 px-3 text-center text-text-primary font-mono font-semibold">
                  <span className="line-through text-text-muted text-xs block font-normal">
                    {isDiscounted ? "$9.99/yr" : "$12/yr"}
                  </span>
                  {isDiscounted ? "$5.99/yr" : "$9.99/yr"}
                </td>
                <td className="py-4 px-3 text-center text-pink font-mono font-bold bg-pink/[0.04] border-x border-pink/15">
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
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Billing Type
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  Free forever
                </td>
                <td className="py-4 px-3 text-center">Monthly</td>
                <td className="py-4 px-3 text-center font-medium text-lime/90 bg-lime/[0.04] border-x border-lime/15">
                  Monthly
                </td>
                <td className="py-4 px-3 text-center">Annual</td>
                <td className="py-4 px-3 text-center font-medium text-pink bg-pink/[0.04] border-x border-pink/15">
                  One-time purchase
                </td>
              </tr>

              {/* Category: 3D Workspace & Model Viewer */}
              <tr>
                <td
                  className="py-4 px-4 font-bold text-text-primary text-sm border-b border-border-subtle bg-bg-elevated/40 rounded-l-xl"
                  colSpan={6}
                >
                  🎨 3D Workspace &amp; Model Viewer
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Interactive 3D Viewport &amp; Rendering
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  ❌ Not included
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-lime/[0.04] border-x border-lime/15">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-pink/[0.04] border-x border-pink/15">
                  ✅ Included
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Inspection Modes (PBR, Wireframe, Normals, MatCap)
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  ❌ Not included
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-lime/[0.04] border-x border-lime/15">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-pink/[0.04] border-x border-pink/15">
                  ✅ Included
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Import External 3D Files (GLB, OBJ, FBX, STL, 3MF)
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  ❌ Not included
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-lime/[0.04] border-x border-lime/15">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-pink/[0.04] border-x border-pink/15">
                  ✅ Included
                </td>
              </tr>

              {/* Category: Universal 3D Format Converter */}
              <tr>
                <td
                  className="py-4 px-4 font-bold text-text-primary text-sm border-b border-border-subtle bg-bg-elevated/40 rounded-l-xl"
                  colSpan={6}
                >
                  ⚡ Universal 3D Model Format Converter
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Format Conversion (GLB, OBJ, FBX, STL, 3MF)
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  ❌ Not included
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  ❌ Not included
                </td>
                <td className="py-4 px-3 text-center text-lime font-bold bg-lime/[0.04] border-x border-lime/15">
                  5 conversions / mo
                </td>
                <td className="py-4 px-3 text-center text-lime font-bold">
                  75 conversions / yr
                </td>
                <td className="py-4 px-3 text-center text-pink font-black bg-pink/[0.04] border-x border-pink/15">
                  🔥 Unlimited
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  3D Printing Prep (STL &amp; 3MF Conversion)
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  ❌ Not included
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  ❌ Not included
                </td>
                <td className="py-4 px-3 text-center text-lime font-bold bg-lime/[0.04] border-x border-lime/15">
                  5 conversions / mo
                </td>
                <td className="py-4 px-3 text-center text-lime font-bold">
                  75 conversions / yr
                </td>
                <td className="py-4 px-3 text-center text-pink font-black bg-pink/[0.04] border-x border-pink/15">
                  🔥 Unlimited
                </td>
              </tr>

              {/* Category: 4K & 8K PBR Texture Upscaler */}
              <tr>
                <td
                  className="py-4 px-4 font-bold text-text-primary text-sm border-b border-border-subtle bg-bg-elevated/40 rounded-l-xl"
                  colSpan={6}
                >
                  ✨ 4K &amp; 8K PBR Texture Upscaler
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  AI Texture Upscaling Quota
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  Standard 2K Preview
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  Standard 2K Preview
                </td>
                <td className="py-4 px-3 text-center text-lime font-bold bg-lime/[0.04] border-x border-lime/15">
                  3 upscales / mo
                </td>
                <td className="py-4 px-3 text-center text-lime font-bold">
                  40 upscales / yr
                </td>
                <td className="py-4 px-3 text-center text-pink font-black bg-pink/[0.04] border-x border-pink/15">
                  🔥 Unlimited
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Upscale Resolution Support
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  Standard 2K
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  Standard 2K
                </td>
                <td className="py-4 px-3 text-center text-lime font-semibold bg-lime/[0.04] border-x border-lime/15">
                  4K &amp; 8K (Priority)
                </td>
                <td className="py-4 px-3 text-center text-lime font-semibold">
                  4K &amp; 8K Upscaling
                </td>
                <td className="py-4 px-3 text-center text-pink font-bold bg-pink/[0.04] border-x border-pink/15">
                  4K &amp; 8K (Top Priority)
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Preserved PBR Maps (Albedo, Normal, Rough, Metal, AO)
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  2K Maps
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  2K Maps
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-lime/[0.04] border-x border-lime/15">
                  Full 4K/8K Maps
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  Full 4K/8K Maps
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-pink/[0.04] border-x border-pink/15">
                  Full 4K/8K Maps
                </td>
              </tr>

              {/* Category: Workspace Exports */}
              <tr>
                <td
                  className="py-4 px-4 font-bold text-text-primary text-sm border-b border-border-subtle bg-bg-elevated/40 rounded-l-xl"
                  colSpan={6}
                >
                  📦 Meshy AI Workspace Model &amp; Texture Exports
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  GLB, OBJ, FBX Workspace Exports
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  2 total
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-lime/[0.04] border-x border-lime/15">
                  Unlimited
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-pink/[0.04] border-x border-pink/15">
                  Unlimited
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  STL &amp; 3MF (3D Printing)
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  2 total
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-lime/[0.04] border-x border-lime/15">
                  Unlimited
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-pink/[0.04] border-x border-pink/15">
                  Unlimited
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  PBR Texture PNG Maps
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  8 total
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-lime/[0.04] border-x border-lime/15">
                  Unlimited
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold">
                  Unlimited
                </td>
                <td className="py-4 px-3 text-center text-emerald-400 font-semibold bg-pink/[0.04] border-x border-pink/15">
                  Unlimited
                </td>
              </tr>

              {/* Category: Community Models */}
              <tr>
                <td
                  className="py-4 px-4 font-bold text-text-primary text-sm border-b border-border-subtle bg-bg-elevated/40 rounded-l-xl"
                  colSpan={6}
                >
                  🌐 Community Model Downloads
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Meshy Discover Community Downloads
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  1 total
                </td>
                <td className="py-4 px-3 text-center font-medium">2 / month</td>
                <td className="py-4 px-3 text-center font-bold text-lime bg-lime/[0.04] border-x border-lime/15">
                  8 / month
                </td>
                <td className="py-4 px-3 text-center font-medium">40 / year</td>
                <td className="py-4 px-3 text-center font-bold text-pink bg-pink/[0.04] border-x border-pink/15">
                  Unlimited
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Community Quota Refresh
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  One-time
                </td>
                <td className="py-4 px-3 text-center font-medium">
                  Every month
                </td>
                <td className="py-4 px-3 text-center font-medium text-lime/90 bg-lime/[0.04] border-x border-lime/15">
                  Every month
                </td>
                <td className="py-4 px-3 text-center font-medium">
                  Every year
                </td>
                <td className="py-4 px-3 text-center font-medium text-pink bg-pink/[0.04] border-x border-pink/15">
                  Unlimited
                </td>
              </tr>

              {/* Category: Additional Meshy Accounts */}
              <tr>
                <td
                  className="py-4 px-4 font-bold text-text-primary text-sm border-b border-border-subtle bg-bg-elevated/40 rounded-l-xl"
                  colSpan={6}
                >
                  🔑 Multi-Account Meshy Linking
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Additional Accounts
                </td>
                <td className="py-4 px-3 text-center text-text-muted">0</td>
                <td className="py-4 px-3 text-center text-text-muted">0</td>
                <td className="py-4 px-3 text-center font-bold text-lime bg-lime/[0.04] border-x border-lime/15">
                  +2
                </td>
                <td className="py-4 px-3 text-center text-text-muted">0</td>
                <td className="py-4 px-3 text-center font-bold text-pink bg-pink/[0.04] border-x border-pink/15">
                  +4
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Total Accounts Under Subscription
                </td>
                <td className="py-4 px-3 text-center">1</td>
                <td className="py-4 px-3 text-center">1</td>
                <td className="py-4 px-3 text-center font-bold text-lime bg-lime/[0.04] border-x border-lime/15">
                  3
                </td>
                <td className="py-4 px-3 text-center">1</td>
                <td className="py-4 px-3 text-center font-bold text-pink bg-pink/[0.04] border-x border-pink/15">
                  5
                </td>
              </tr>

              {/* Category: Platform Integrations & Priority */}
              <tr>
                <td
                  className="py-4 px-4 font-bold text-text-primary text-sm border-b border-border-subtle bg-bg-elevated/40 rounded-l-xl"
                  colSpan={6}
                >
                  🔥 Platform Integrations &amp; Perks
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Tripo 3D Studio Support ✨
                </td>
                <td className="py-4 px-3 text-center text-text-muted">❌</td>
                <td className="py-4 px-3 text-center text-text-muted">❌</td>
                <td className="py-4 px-3 text-center font-bold text-lime bg-lime/[0.04] border-x border-lime/15">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center font-bold text-lime">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center font-bold text-pink bg-pink/[0.04] border-x border-pink/15">
                  ✅ Included
                </td>
              </tr>
              <tr className="border-b border-border-subtle/40">
                <td className="py-4 px-4 font-medium text-text-primary">
                  Expanded Community Download Formats
                </td>
                <td className="py-4 px-3 text-center text-text-muted">❌</td>
                <td className="py-4 px-3 text-center text-text-muted">❌</td>
                <td className="py-4 px-3 text-center font-bold text-lime bg-lime/[0.04] border-x border-lime/15">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center font-bold text-lime">
                  ✅ Included
                </td>
                <td className="py-4 px-3 text-center font-bold text-pink bg-pink/[0.04] border-x border-pink/15">
                  ✅ Included
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-text-primary">
                  Priority Beta Updates &amp; Support
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  Standard
                </td>
                <td className="py-4 px-3 text-center text-text-muted">
                  Standard
                </td>
                <td className="py-4 px-3 text-center text-lime font-medium bg-lime/[0.04] border-x border-b border-lime/15 rounded-b-2xl">
                  Early Access
                </td>
                <td className="py-4 px-3 text-center text-lime font-medium">
                  Early Access
                </td>
                <td className="py-4 px-3 text-center font-bold text-pink bg-pink/[0.04] border-x border-b border-pink/15 rounded-b-2xl">
                  ✅ Always Priority
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-text-muted text-center mt-8 leading-relaxed max-w-lg mx-auto">
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
