"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const subcategories = [
  { name: "Clothing", slug: "clothing" },
  { name: "Shoes", slug: "shoes" },
  { name: "Bags", slug: "bags" },
  { name: "Jewellery", slug: "jewellery" },
];

const navLinks = [
  { label: "Brands", href: "/brands", match: "/brands" },
  { label: "Coupons", href: "/coupons", match: "/coupons" },
  { label: "Blog", href: "/blog", match: "/blog" },
];

export default function MobileDrawer({ isOpen, onClose }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [womenExpanded, setWomenExpanded] = useState(false);

  const currentCategory = searchParams.get("category") || "";

  function isWomenActive() {
    return pathname === "/products" || pathname.startsWith("/products/");
  }

  function isLinkActive(match) {
    return pathname === match || pathname.startsWith(match + "/");
  }

  function isCategoryActive(slug) {
    return pathname === "/products" && currentCategory === slug;
  }

  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral/30 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-base-100 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-base-300 shrink-0">
          <Link
            href="/"
            onClick={onClose}
            className="font-display text-xl tracking-wide text-base-content"
          >
            TrendHub
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary hover:text-base-content transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 pt-2">
          {/* Women — expandable */}
          <div className="border-b border-base-300">
            <button
              type="button"
              onClick={() => setWomenExpanded(!womenExpanded)}
              className="flex items-center justify-between w-full py-3 cursor-pointer"
            >
              <span
                className={`text-lg font-display ${
                  isWomenActive()
                    ? "text-base-content font-semibold"
                    : "text-base-content"
                }`}
              >
                Women
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-4 h-4 text-secondary transition-transform duration-200 ${womenExpanded ? "rotate-180" : ""}`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {womenExpanded && (
              <div className="pb-3 pl-4 flex flex-col gap-1">
                <Link
                  href="/products"
                  onClick={onClose}
                  className="text-sm font-body font-medium text-secondary hover:text-base-content transition-colors py-1.5"
                >
                  Shop All
                </Link>
                {subcategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    onClick={onClose}
                    className={`text-sm font-body font-medium py-1.5 transition-colors ${
                      isCategoryActive(cat.slug)
                        ? "text-base-content font-semibold"
                        : "text-secondary hover:text-base-content"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`block text-lg font-display py-3 border-b border-base-300 ${
                isLinkActive(link.match)
                  ? "text-base-content font-semibold"
                  : "text-base-content"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom: Account links */}
        <div className="px-4 py-4 border-t border-base-300 shrink-0 space-y-2">
          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-body font-medium text-base-content hover:text-primary transition-colors py-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            My Account
          </Link>
          <Link
            href="/login"
            onClick={onClose}
            className="block w-full text-center border border-base-content px-3 py-2 text-xs tracking-wider uppercase font-semibold font-body text-base-content hover:bg-base-content hover:text-base-100 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            onClick={onClose}
            className="block w-full text-center text-xs font-body text-secondary hover:text-base-content transition-colors py-1"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
