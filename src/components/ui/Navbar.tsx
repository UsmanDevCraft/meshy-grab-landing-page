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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      if (pathname === "/") {
        e.preventDefault();
        const id = href.substring(2);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-bg-nav backdrop-blur-xl border-b border-border-subtle"
          : ""
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/apple-touch-icon.png"
            alt="MeshyGrab Logo"
            width={42}
            height={42}
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

        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="text-xs xl:text-sm font-medium text-text-secondary hover:text-lime transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/privacy-policy"
            className="text-xs xl:text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="https://chromewebstore.google.com/detail/jkddfapkjenldpiacoccgheimcokhmcc?utm_source=item-share-cb"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !py-2 !px-4 !text-xs xl:!text-sm font-bold shadow-[0_0_15px_rgba(197,249,85,0.25)]"
          >
            Get Extension
          </Link>
        </div>

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

      {mobileOpen && (
        <div className="lg:hidden fixed top-[72px] left-0 right-0 bg-bg-nav backdrop-blur-xl border-b border-border-subtle p-6 flex flex-col gap-4 z-40 max-h-[85vh] overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="py-3 text-base font-medium text-text-secondary hover:text-lime border-b border-border-subtle last:border-0"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/privacy-policy"
            className="py-3 text-base font-medium text-text-secondary hover:text-lime border-b border-border-subtle"
            onClick={() => setMobileOpen(false)}
          >
            Privacy Policy
          </Link>
          <Link
            href="https://chromewebstore.google.com/detail/jkddfapkjenldpiacoccgheimcokhmcc?utm_source=item-share-cb"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-center mt-2 font-bold"
          >
            Get the Chrome Extension
          </Link>
        </div>
      )}
    </nav>
  );
}
