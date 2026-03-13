"use client";

import { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuickView } from "@/lib/quickview-context";
import { useWishlist } from "@/lib/wishlist-context";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";

export default function QuickViewModal() {
  const { activeProduct, closeQuickView } = useQuickView();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (activeProduct) {
      setAnimating(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      document.body.classList.add("overflow-hidden");
    } else {
      setVisible(false);
      document.body.classList.remove("overflow-hidden");
      const timer = setTimeout(() => setAnimating(false), 200);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [activeProduct]);

  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") closeQuickView();
    },
    [closeQuickView]
  );

  useEffect(() => {
    if (activeProduct) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeProduct, handleEscape]);

  if (!animating && !activeProduct) return null;

  const product = activeProduct;
  if (!product) return null;

  const hasSale = product.tags?.includes("sale") && product.originalPrice;
  const hasTrending = product.tags?.includes("trending");
  const hasNew = product.tags?.includes("new");
  const discount = hasSale ? getDiscountPercentage(product.price, product.originalPrice) : 0;
  const wishlisted = isInWishlist(product.id);

  function toggleWishlist() {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  }

  const redirectUrl = `/redirect?url=${encodeURIComponent(product.redirectUrl || "")}&brand=${encodeURIComponent(product.merchant || product.brand)}`;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8 px-4 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-neutral/50 backdrop-blur-sm"
        onClick={closeQuickView}
      />
      <div
        className={`relative bg-base-100 w-full max-w-3xl max-h-[85vh] overflow-y-auto transition-transform duration-200 ${
          visible ? "scale-100" : "scale-95"
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 text-secondary hover:text-base-content transition-colors cursor-pointer"
          aria-label="Close quick view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Image */}
          <div className="md:w-1/2">
            <div className="relative aspect-[3/4] bg-base-200 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:w-1/2 flex flex-col">
            <span className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body">
              {product.brand}
            </span>
            <h2 className="text-xl font-display text-base-content mt-1">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-center gap-2 mt-3">
              <span className={`text-lg font-semibold ${hasSale ? "text-error" : "text-base-content"}`}>
                {formatPrice(product.price)}
              </span>
              {hasSale && (
                <>
                  <span className="text-sm text-secondary line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm text-error font-medium">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Tags */}
            {(hasSale || hasTrending || hasNew) && (
              <div className="flex gap-2 mt-3">
                {hasSale && (
                  <span className="bg-error text-error-content text-[10px] tracking-wider uppercase px-2 py-0.5 font-body font-semibold">
                    Sale
                  </span>
                )}
                {hasTrending && (
                  <span className="bg-base-content text-base-100 text-[10px] tracking-wider uppercase px-2 py-0.5 font-body">
                    Trending
                  </span>
                )}
                {hasNew && (
                  <span className="bg-primary text-primary-content text-[10px] tracking-wider uppercase px-2 py-0.5 font-body">
                    New
                  </span>
                )}
              </div>
            )}

            <div className="border-t border-base-300 my-4" />

            {/* Affiliate CTA */}
            <a
              href={redirectUrl}
              className="btn bg-base-content text-base-100 hover:bg-base-content/80 w-full py-3 text-[11px] tracking-[0.2em] uppercase font-body font-semibold"
            >
              Shop now at {product.merchant || product.brand} &rarr;
            </a>
            <p className="text-[11px] text-secondary text-center mt-2">
              You will be redirected to {product.merchant || product.brand}
            </p>

            <div className="border-t border-base-300 my-4" />

            {/* View full details */}
            <Link
              href={`/products/${product.slug}`}
              onClick={closeQuickView}
              className="text-sm font-medium text-base-content hover:text-primary transition-colors group"
            >
              View Full Details{" "}
              <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                &rarr;
              </span>
            </Link>

            {/* Wishlist toggle */}
            <button
              type="button"
              onClick={toggleWishlist}
              className="flex items-center gap-2 mt-4 text-sm cursor-pointer group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`w-5 h-5 transition-colors ${
                  wishlisted
                    ? "fill-error text-error"
                    : "fill-none text-base-content group-hover:text-primary"
                }`}
                stroke="currentColor"
                strokeWidth={wishlisted ? 0 : 1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span className={`font-medium ${wishlisted ? "text-error" : "text-base-content group-hover:text-primary"} transition-colors`}>
                {wishlisted ? "In Your Wishlist" : "Add to Wishlist"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
