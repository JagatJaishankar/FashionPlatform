"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const subcategories = [
  { name: "Clothing", slug: "clothing" },
  { name: "Shoes", slug: "shoes" },
  { name: "Bags", slug: "bags" },
  { name: "Jewellery", slug: "jewellery" },
];

const navLinks = [
  { label: "Brands", href: "/brands" },
  { label: "Coupons", href: "/coupons" },
  { label: "Blog", href: "/blog" },
];

export default function MobileDrawer({ isOpen, onClose }) {
  const router = useRouter();
  const [womenExpanded, setWomenExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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

  function handleSearch() {
    const q = searchValue.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setSearchValue("");
      onClose();
    }
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
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
              <span className="text-lg font-display text-base-content">
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
                  className="text-sm font-body text-secondary hover:text-base-content transition-colors py-1.5"
                >
                  Shop All
                </Link>
                {subcategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    onClick={onClose}
                    className="text-sm font-body text-secondary hover:text-base-content transition-colors py-1.5"
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
              className="block text-lg font-display text-base-content py-3 border-b border-base-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom search */}
        <div className="px-4 py-4 border-t border-base-300 shrink-0">
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
                className="w-4 h-4"
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
              placeholder="Search products, brands..."
              className="bg-transparent w-full py-2 pl-7 text-sm font-body text-base-content placeholder:text-secondary/50 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
