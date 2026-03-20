"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  searchProducts,
  placeholderBrands,
  placeholderCategories,
} from "@/lib/placeholder-data";
import { formatPrice } from "@/lib/utils";

export default function SearchOverlay({ isOpen, onClose }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ products: [], brands: [], categories: [] });
  const debounceRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    if (!isOpen) {
      setQuery("");
      setResults({ products: [], brands: [], categories: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleEscape]);

  function handleInputChange(e) {
    const val = e.target.value;
    setQuery(val);

    clearTimeout(debounceRef.current);
    if (val.trim().length >= 2) {
      debounceRef.current = setTimeout(() => {
        const q = val.trim().toLowerCase();
        const products = searchProducts(q).slice(0, 6);
        const brands = placeholderBrands.filter((b) =>
          b.name.toLowerCase().includes(q)
        );
        const categories = placeholderCategories.filter((c) =>
          c.name.toLowerCase().includes(q)
        );
        setResults({ products, brands, categories });
      }, 300);
    } else {
      setResults({ products: [], brands: [], categories: [] });
    }
  }

  function handleSubmit() {
    const q = query.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      onClose();
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  function handleResultClick() {
    onClose();
  }

  const hasResults =
    results.products.length > 0 ||
    results.brands.length > 0 ||
    results.categories.length > 0;
  const showNoResults = query.trim().length >= 2 && !hasResults;

  if (!isOpen) return null;

  return (
    <>
      {/* Desktop overlay */}
      <div className="hidden lg:block fixed inset-0 z-40">
        <div className="absolute inset-0 bg-neutral/30 backdrop-blur-sm" onClick={onClose} />
        <div className="absolute top-[calc(3.5rem+1px)] left-0 right-0 bg-base-100 border-b border-base-300 shadow-lg">
          <div className="max-w-[1520px] mx-auto px-12 py-8">
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-secondary hover:text-base-content hover:bg-base-200 transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>

            {/* Search input — large, bottom-border style */}
            <div className="border-b-2 border-base-300 focus-within:border-base-content transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search products, brands..."
                className="bg-transparent w-full py-4 text-xl md:text-2xl font-body text-base-content placeholder:text-secondary/40 outline-none"
              />
            </div>

            {/* Results */}
            {hasResults && (
              <div className="flex gap-10 mt-8 max-h-[55vh] overflow-y-auto">
                {/* Products column */}
                <div className="w-3/5">
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body mb-4">
                    Products
                  </h3>
                  <div className="flex flex-col">
                    {results.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={handleResultClick}
                        className="flex items-center gap-4 py-3 px-2 hover:bg-base-200 transition-colors"
                      >
                        <div className="relative w-14 h-14 bg-base-200 shrink-0 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-base-content truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-secondary mt-0.5">{product.brand}</p>
                        </div>
                        <span className="text-sm font-semibold text-base-content ml-auto shrink-0">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right column */}
                <div className="w-2/5">
                  {results.brands.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body mb-4">
                        Brands
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {results.brands.map((brand) => (
                          <Link
                            key={brand.slug}
                            href={`/brands/${brand.slug}`}
                            onClick={handleResultClick}
                            className="text-xs font-medium text-base-content border border-base-300 px-3 py-1.5 hover:border-base-content/20 transition-colors"
                          >
                            {brand.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {results.categories.length > 0 && (
                    <div>
                      <h3 className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body mb-4">
                        Categories
                      </h3>
                      <div className="flex flex-col gap-1">
                        {results.categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/products?category=${cat.slug}`}
                            onClick={handleResultClick}
                            className="text-sm text-base-content hover:text-primary transition-colors py-1"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {showNoResults && (
              <p className="text-sm text-secondary mt-8">
                No results found for &ldquo;{query.trim()}&rdquo;
              </p>
            )}

            {hasResults && (
              <div className="mt-6 pt-6 border-t border-base-300">
                <Link
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  onClick={handleResultClick}
                  className="text-sm font-medium text-base-content hover:text-primary transition-colors group"
                >
                  View all results for &ldquo;{query.trim()}&rdquo;{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <div className="lg:hidden fixed inset-0 z-50 bg-base-100">
        <div className="flex items-center h-14 px-6 gap-3 border-b border-base-300">
          <button
            type="button"
            onClick={onClose}
            className="text-secondary hover:text-base-content transition-colors cursor-pointer shrink-0 w-10 h-10 flex items-center justify-center -ml-2"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="flex-1 border-b border-base-300 focus-within:border-base-content transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search products, brands..."
              className="bg-transparent w-full py-2 text-lg font-body text-base-content placeholder:text-secondary/50 outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="text-base-content cursor-pointer shrink-0 w-10 h-10 flex items-center justify-center -mr-2"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-3.5rem)] px-6 py-6">
          {hasResults && (
            <>
              {results.products.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body mb-3">
                    Products
                  </h3>
                  <div className="flex flex-col">
                    {results.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={handleResultClick}
                        className="flex items-center gap-3 py-3 hover:bg-base-200 transition-colors"
                      >
                        <div className="relative w-14 h-14 bg-base-200 shrink-0 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-base-content truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-secondary mt-0.5">{product.brand}</p>
                        </div>
                        <span className="text-sm font-semibold text-base-content shrink-0">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.brands.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body mb-3">
                    Brands
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.brands.map((brand) => (
                      <Link
                        key={brand.slug}
                        href={`/brands/${brand.slug}`}
                        onClick={handleResultClick}
                        className="text-xs font-medium text-base-content border border-base-300 px-3 py-1.5 hover:border-base-content/20 transition-colors"
                      >
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.categories.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-col gap-1">
                    {results.categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/products?category=${cat.slug}`}
                        onClick={handleResultClick}
                        className="text-sm text-base-content hover:text-primary transition-colors py-1.5"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-base-300">
                <Link
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  onClick={handleResultClick}
                  className="text-sm font-medium text-base-content hover:text-primary transition-colors"
                >
                  View all results for &ldquo;{query.trim()}&rdquo; &rarr;
                </Link>
              </div>
            </>
          )}

          {showNoResults && (
            <p className="text-sm text-secondary mt-4">
              No results found for &ldquo;{query.trim()}&rdquo;
            </p>
          )}
        </div>
      </div>
    </>
  );
}
