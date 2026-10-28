"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/constants";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [carouselCurrentSlide, setCarouselCurrentSlide] =
    useState<string>("viewer");

  // Listen to carousel slide change events from WorkSectionsCarousel
  useEffect(() => {
    const handleSlideChanged = (e: Event) => {
      const customEvent = e as CustomEvent<{ slideId: string }>;
      if (customEvent.detail?.slideId) {
        setCarouselCurrentSlide(customEvent.detail.slideId);
      }
    };
    window.addEventListener(
      "carousel-slide-changed",
      handleSlideChanged as EventListener,
    );
    return () =>
      window.removeEventListener(
        "carousel-slide-changed",
        handleSlideChanged as EventListener,
      );
  }, []);

  // Track scroll depth for navbar blur and ScrollSpy with RAF throttling
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrolled = window.scrollY > 40;

    const sections = [
      "tools",
      "work-tools",
      "integrations",
      "how-it-works",
      "preview",
      "pricing",
      "faq",
    ];

    const onScroll = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const currentScrollY = window.scrollY;

        // 1. Navbar background blur state
        const isNowScrolled = currentScrollY > 40;
        if (isNowScrolled !== lastScrolled) {
          lastScrolled = isNowScrolled;
          setScrolled(isNowScrolled);
        }

        // 2. ScrollSpy only on homepage
        if (pathname !== "/") return;

        const scrollPosition = currentScrollY + 140;

        // Check if at the bottom of the page
        if (
          window.innerHeight + currentScrollY >=
          document.documentElement.scrollHeight - 50
        ) {
          setActiveSection((prev) => (prev !== "faq" ? "faq" : prev));
          return;
        }

        let detected = "";
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              detected = id;
              break;
            }
          }
        }

        let newActive = "";
        if (detected === "work-tools") {
          newActive = carouselCurrentSlide;
        } else if (detected) {
          newActive = detected;
        } else if (currentScrollY >= 200) {
          newActive = "";
        }

        setActiveSection((prev) => (prev !== newActive ? newActive : prev));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [pathname, carouselCurrentSlide]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.substring(2);
      if (pathname === "/") {
        e.preventDefault();
        setActiveSection(id);

        if (id === "viewer" || id === "converter" || id === "upscaler") {
          window.dispatchEvent(
            new CustomEvent("select-carousel-slide", {
              detail: { targetId: id },
            }),
          );
          const workEl =
            document.getElementById("work-tools") ||
            document.getElementById(id);
          if (workEl) {
            const top =
              workEl.getBoundingClientRect().top + window.scrollY - 85;
            window.scrollTo({ top, behavior: "smooth" });
          }
          return;
        }

        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 85;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  };

  const effectiveActiveSection = pathname === "/" ? activeSection : "";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-3.5 sm:py-4 transition-all duration-300 ${
        scrolled
          ? "bg-bg-nav backdrop-blur-xl border-b border-border-subtle shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group shrink-0 mr-6 lg:mr-8 xl:mr-12"
        >
          <Image
            src="/apple-touch-icon.png"
            alt="MeshyGrab Logo"
            width={40}
            height={40}
            className="rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-text-primary leading-none">
              MeshyGrab
            </span>
            <span className="text-[10px] text-lime font-mono tracking-widest uppercase">
              3D Toolkit
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 2xl:gap-2.5 ml-auto">
          {navLinks.map((link) => {
            const linkId = link.href.replace("/#", "");
            const isActive = effectiveActiveSection === linkId;
            const isPricing = link.label.toLowerCase() === "pricing";

            if (isPricing) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs xl:text-sm font-extrabold text-white transition-all duration-300 shadow-md ${
                    isActive
                      ? "bg-gradient-to-r from-[#ff3e8f] via-[#9333ea] to-[#4f46e5] ring-2 ring-pink-400 ring-offset-2 ring-offset-bg-page shadow-[0_0_25px_rgba(255,62,143,0.7)] scale-105"
                      : "bg-gradient-to-r from-[#ff3e8f] via-[#9333ea] to-[#4f46e5] shadow-[0_0_18px_rgba(255,62,143,0.4)] hover:shadow-[0_0_25px_rgba(255,62,143,0.6)] hover:scale-105 active:scale-95"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {link.label}
                </a>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`text-xs xl:text-sm px-3 py-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-lime bg-lime/10 border border-lime/30 shadow-[0_0_12px_rgba(197,249,85,0.2)] font-bold"
                    : "text-text-secondary hover:text-lime hover:bg-white/[0.04] border border-transparent font-medium"
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <Link
            href="/privacy-policy"
            className="text-xs xl:text-sm font-medium text-text-secondary hover:text-text-primary px-2.5 py-1.5 transition-colors"
          >
            Privacy
          </Link>

          <Link
            href="https://chromewebstore.google.com/detail/jkddfapkjenldpiacoccgheimcokhmcc?utm_source=item-share-cb"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !py-2 !px-4 !text-xs xl:!text-sm font-bold shadow-[0_0_15px_rgba(197,249,85,0.25)] ml-1"
          >
            Get Extension
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-border-subtle text-text-primary bg-bg-card/60"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-[66px] left-0 right-0 bg-bg-nav backdrop-blur-xl border-b border-border-subtle p-5 flex flex-col gap-2.5 z-40 max-h-[85vh] overflow-y-auto shadow-2xl">
          {navLinks.map((link) => {
            const linkId = link.href.replace("/#", "");
            const isActive = effectiveActiveSection === linkId;
            const isPricing = link.label.toLowerCase() === "pricing";

            if (isPricing) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="my-1.5 py-3 px-4 rounded-xl text-center text-sm font-extrabold text-white bg-gradient-to-r from-[#ff3e8f] via-[#9333ea] to-[#4f46e5] shadow-[0_0_20px_rgba(255,62,143,0.45)] flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>{link.label} — View Plans &amp; Deals 🔥</span>
                </a>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? "text-lime bg-lime/10 border border-lime/30 font-bold"
                    : "text-text-secondary hover:text-lime hover:bg-white/[0.04]"
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="text-xs text-lime">●</span>}
              </a>
            );
          })}

          <Link
            href="/privacy-policy"
            className="py-2.5 px-3 text-sm font-medium text-text-secondary hover:text-lime"
            onClick={() => setMobileOpen(false)}
          >
            Privacy Policy
          </Link>

          <Link
            href="https://chromewebstore.google.com/detail/jkddfapkjenldpiacoccgheimcokhmcc?utm_source=item-share-cb"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-center mt-2 font-bold py-3"
          >
            Get the Chrome Extension
          </Link>
        </div>
      )}
    </nav>
  );
}
