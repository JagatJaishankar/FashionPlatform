"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileDrawer from "./MobileDrawer";

const womenSubcategories = [
  { name: "Clothing", slug: "clothing" },
  { name: "Shoes", slug: "shoes" },
  { name: "Bags", slug: "bags" },
  { name: "Jewellery", slug: "jewellery" },
];

const navLinks = [
  { label: "brands", href: "/brands" },
  { label: "coupons", href: "/coupons" },
  { label: "blog", href: "/blog" },
];

export default function Navbar() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [womenOpen, setWomenOpen] = useState(false);
  const womenTimeout = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  function handleWomenEnter() {
    clearTimeout(womenTimeout.current);
    setWomenOpen(true);
  }

  function handleWomenLeave() {
    womenTimeout.current = setTimeout(() => setWomenOpen(false), 150);
  }

  function handleSearch() {
    const q = searchValue.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setSearchValue("");
      setSearchOpen(false);
    }
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") setSearchOpen(false);
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <Link
              href="/"
              className="font-display text-xl tracking-wide text-base-content"
            >
              TrendHub
            </Link>
          </div>

          {/* Center nav links — absolutely centered on the page */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Women dropdown */}
            <div
              className="relative"
              onMouseEnter={handleWomenEnter}
              onMouseLeave={handleWomenLeave}
            >
              <Link
                href="/products"
                className="text-sm font-body tracking-wide lowercase text-base-content/70 hover:text-base-content transition-colors"
                aria-haspopup="true"
                aria-expanded={womenOpen}
              >
                women
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
                      className="block px-4 py-2 text-sm font-body text-base-content/70 hover:bg-base-200 hover:text-base-content transition-colors"
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
                className="text-sm font-body tracking-wide lowercase text-base-content/70 hover:text-base-content transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center">
            {/* Desktop search */}
            <div className="hidden lg:block max-w-[220px]">
              <div className="relative border-b border-base-300 focus-within:border-base-content transition-colors">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-secondary hover:text-base-content transition-colors cursor-pointer"
                  aria-label="Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search..."
                  className="bg-transparent w-full py-1.5 pl-6 pr-2 text-xs font-body text-base-content placeholder:text-secondary/50 outline-none"
                />
              </div>
            </div>

            {/* Mobile search icon / expanded search */}
            <div className="lg:hidden">
              {searchOpen ? (
                <div className="absolute inset-x-0 top-0 h-14 bg-base-100 border-b border-base-300 flex items-center px-4 gap-3 z-10">
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-secondary hover:text-base-content transition-colors cursor-pointer shrink-0"
                    aria-label="Close search"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search products, brands..."
                    className="bg-transparent flex-1 text-sm font-body text-base-content placeholder:text-secondary/50 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="text-base-content cursor-pointer shrink-0"
                    aria-label="Search"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="text-base-content cursor-pointer"
                  aria-label="Open search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
