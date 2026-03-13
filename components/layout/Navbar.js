"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useWishlist } from "@/lib/wishlist-context";
import MobileDrawer from "./MobileDrawer";
import SearchOverlay from "./SearchOverlay";

const womenSubcategories = [
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

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarShell />}>
      <NavbarContent />
    </Suspense>
  );
}

function NavbarShell() {
  return (
    <header className="sticky top-0 z-50 bg-base-100 border-b border-base-300">
      <nav className="relative max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-display text-xl tracking-wide text-base-content">
            TrendHub
          </Link>
        </div>
      </nav>
    </header>
  );
}

function NavbarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { wishlistCount } = useWishlist();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [womenOpen, setWomenOpen] = useState(false);
  const womenTimeout = useRef(null);

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

  function handleWomenEnter() {
    clearTimeout(womenTimeout.current);
    setWomenOpen(true);
  }

  function handleWomenLeave() {
    womenTimeout.current = setTimeout(() => setWomenOpen(false), 150);
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-base-100 border-b border-base-300">
        <nav className="relative max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-14">
          {/* Left: hamburger (mobile) + logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden text-base-content cursor-pointer"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <Link href="/" className="font-display text-xl tracking-wide text-base-content">
              TrendHub
            </Link>
          </div>

          {/* Center nav links */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Women dropdown */}
            <div
              className="relative"
              onMouseEnter={handleWomenEnter}
              onMouseLeave={handleWomenLeave}
            >
              <Link
                href="/products"
                className={`text-sm font-body font-medium py-1 transition-colors ${
                  isWomenActive()
                    ? "text-base-content font-semibold border-b-2 border-primary"
                    : "text-base-content hover:text-primary"
                }`}
                aria-haspopup="true"
                aria-expanded={womenOpen}
              >
                Women
              </Link>
              {womenOpen && (
                <div
                  className="absolute top-full left-0 mt-2 bg-base-100 border border-base-300 shadow-lg min-w-[160px] py-2"
                  role="menu"
                >
                  {womenSubcategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      className={`block px-4 py-2 text-sm font-body font-medium transition-colors ${
                        isCategoryActive(cat.slug)
                          ? "text-base-content font-semibold border-l-2 border-primary bg-base-200"
                          : "text-base-content hover:bg-base-200 hover:text-primary"
                      }`}
                      role="menuitem"
                      onClick={() => setWomenOpen(false)}
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
                className={`text-sm font-body font-medium py-1 transition-colors ${
                  isLinkActive(link.match)
                    ? "text-base-content font-semibold border-b-2 border-primary"
                    : "text-base-content hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Desktop search trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 text-secondary hover:text-base-content transition-colors cursor-pointer border-b border-base-300 pb-1"
              aria-label="Open search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-body text-secondary/50">Search...</span>
            </button>

            {/* Wishlist icon */}
            <Link
              href="/wishlist"
              className="relative text-base-content hover:text-primary transition-colors"
              aria-label="Wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-content text-[10px] flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account icon — desktop only */}
            <Link
              href="/account"
              className="hidden lg:block text-base-content hover:text-primary transition-colors"
              aria-label="Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>

            {/* Sign In — desktop only */}
            <Link
              href="/login"
              className="hidden lg:block border border-base-content px-3 py-1.5 text-xs tracking-wider uppercase font-semibold font-body text-base-content hover:bg-base-content hover:text-base-100 transition-colors"
            >
              Sign In
            </Link>

            {/* Mobile search icon */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="lg:hidden text-base-content cursor-pointer"
              aria-label="Open search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden text-base-content cursor-pointer hidden"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
