"use client";

import { useEffect, useCallback, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuickView } from "@/lib/quickview-context";
import { useAuthModal } from "@/lib/auth-modal-context";
import { useCurrency } from "@/lib/currency-context";
import { getDiscountPercentage } from "@/lib/utils";
import { placeholderProducts } from "@/lib/placeholder-data";

export default function QuickViewModal() {
  const { activeProduct, closeQuickView } = useQuickView();
  const { openAuthModal } = useAuthModal();
  const { formatPrice } = useCurrency();
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);

  const relatedProducts = useMemo(() => {
    if (!activeProduct) return [];
    return placeholderProducts
      .filter(
        (p) =>
          p.id !== activeProduct.id &&
          (p.brandSlug === activeProduct.brandSlug ||
            p.categorySlug === activeProduct.categorySlug)
      )
      .slice(0, 4);
  }, [activeProduct]);

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
      const timer = setTimeout(() => setAnimating(false), 300);
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

  function handleWishlistClick() {
    closeQuickView();
    openAuthModal();
  }

  function handleRelatedClick() {
    closeQuickView();
  }

  if (!animating && !activeProduct) return null;

  const product = activeProduct;
  if (!product) return null;

  const hasSale = product.tags?.includes("sale") && product.originalPrice;
  const hasTrending = product.tags?.includes("trending");
  const hasNew = product.tags?.includes("new");
  const discount = hasSale ? getDiscountPercentage(product.price, product.originalPrice) : 0;

  const redirectUrl = `/redirect?url=${encodeURIComponent(product.redirectUrl || "")}&brand=${encodeURIComponent(product.merchant || product.brand)}`;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral/50 backdrop-blur-sm"
        onClick={closeQuickView}
      />

      {/* Desktop modal */}
      <div className="hidden md:flex items-start justify-center pt-8 pb-8 px-4 h-full">
        <div
          className={`relative bg-base-100 w-full max-w-4xl max-h-[85vh] overflow-y-auto transition-all duration-300 ${
            visible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
          style={{ minHeight: "500px" }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-colors cursor-pointer"
            aria-label="Close quick view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-secondary hover:text-base-content">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>

          <div className="flex flex-row">
            {/* Image — left half */}
            <div className="w-1/2">
              <div className="relative aspect-[3/4] bg-base-200 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="448px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details — right half */}
            <div className="w-1/2 p-8 overflow-y-auto flex flex-col">
              <Link
                href={`/brands/${product.brandSlug}`}
                onClick={closeQuickView}
                className="text-[11px] tracking-[0.2em] uppercase text-secondary hover:text-base-content transition-colors font-body"
              >
                {product.brand}
              </Link>
              <h2 className="text-2xl font-display text-base-content mt-2">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-center gap-2 mt-3">
                <span className={`text-xl font-semibold ${hasSale ? "text-error" : "text-base-content"}`}>
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

              <div className="border-t border-base-300 my-5" />

              {/* Affiliate CTA */}
              <a
                href={redirectUrl}
                className="btn bg-base-content text-base-100 hover:bg-neutral w-full py-3 text-[11px] tracking-[0.2em] uppercase font-body font-semibold transition-colors"
              >
                Shop Now &rarr;
              </a>
              <p className="text-[11px] text-secondary text-center mt-2">
                You will be redirected to {product.merchant || product.brand}
              </p>

              {/* Wishlist */}
              <button
                type="button"
                onClick={handleWishlistClick}
                className="flex items-center justify-center gap-2 mt-4 text-sm cursor-pointer group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-base-content group-hover:text-error transition-colors"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                <span className="font-medium text-base-content group-hover:text-error transition-colors">
                  Save to Wishlist
                </span>
              </button>

              {/* View Full Details */}
              <Link
                href={`/products/${product.slug}`}
                onClick={closeQuickView}
                className="text-sm text-primary hover:underline mt-4 text-center group"
              >
                View Full Details{" "}
                <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-base-300 mx-8 mt-2 pt-6 pb-6">
              <h3 className="text-sm tracking-[0.15em] uppercase font-semibold mb-4 font-body">
                You May Also Like
              </h3>
              <div className="flex gap-4">
                {relatedProducts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/products/${rp.slug}`}
                    onClick={handleRelatedClick}
                    className="flex-1 min-w-0 group/related"
                  >
                    <div className="relative aspect-square bg-base-200 overflow-hidden w-full">
                      <Image
                        src={rp.image}
                        alt={rp.name}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </div>
                    <p className="text-[10px] tracking-wider uppercase text-secondary mt-2 font-body truncate">
                      {rp.brand}
                    </p>
                    <p className="text-xs font-medium text-base-content line-clamp-1 mt-0.5 group-hover/related:underline">
                      {rp.name}
                    </p>
                    <p className="text-xs font-semibold text-base-content mt-0.5">
                      {formatPrice(rp.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <div className="md:hidden fixed inset-x-0 bottom-0 top-0 flex flex-col justify-end">
        <div
          className={`bg-base-100 rounded-t-2xl max-h-[92vh] overflow-y-auto transition-transform duration-300 ${
            visible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Close button */}
          <div className="sticky top-0 z-10 bg-base-100 flex items-center justify-between px-4 py-3 border-b border-base-300">
            <span className="text-[11px] tracking-[0.2em] uppercase font-body font-semibold">
              Quick View
            </span>
            <button
              type="button"
              onClick={closeQuickView}
              className="w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-secondary">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] bg-base-200 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-5">
            <Link
              href={`/brands/${product.brandSlug}`}
              onClick={closeQuickView}
              className="text-[11px] tracking-[0.2em] uppercase text-secondary hover:text-base-content transition-colors font-body"
            >
              {product.brand}
            </Link>
            <h2 className="text-xl font-display text-base-content mt-1">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-center gap-2 mt-2">
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
              className="btn bg-base-content text-base-100 hover:bg-neutral w-full py-3 text-[11px] tracking-[0.2em] uppercase font-body font-semibold transition-colors"
            >
              Shop Now &rarr;
            </a>
            <p className="text-[11px] text-secondary text-center mt-2">
              You will be redirected to {product.merchant || product.brand}
            </p>

            {/* Wishlist */}
            <button
              type="button"
              onClick={handleWishlistClick}
              className="flex items-center justify-center gap-2 mt-4 w-full text-sm cursor-pointer group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-base-content group-hover:text-error transition-colors"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <span className="font-medium text-base-content group-hover:text-error transition-colors">
                Save to Wishlist
              </span>
            </button>

            {/* View Full Details */}
            <Link
              href={`/products/${product.slug}`}
              onClick={closeQuickView}
              className="block text-sm text-primary hover:underline mt-4 text-center"
            >
              View Full Details &rarr;
            </Link>
          </div>

          {/* Related Products — horizontal scroll on mobile */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-base-300 mx-5 pt-5 pb-6">
              <h3 className="text-sm tracking-[0.15em] uppercase font-semibold mb-4 font-body">
                You May Also Like
              </h3>
              <div className="flex overflow-x-auto gap-3 snap-x scrollbar-hide -mx-5 px-5">
                {relatedProducts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/products/${rp.slug}`}
                    onClick={handleRelatedClick}
                    className="shrink-0 w-28 snap-start"
                  >
                    <div className="relative aspect-square bg-base-200 overflow-hidden w-full">
                      <Image
                        src={rp.image}
                        alt={rp.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <p className="text-[10px] tracking-wider uppercase text-secondary mt-2 font-body truncate">
                      {rp.brand}
                    </p>
                    <p className="text-xs font-medium text-base-content line-clamp-1 mt-0.5">
                      {rp.name}
                    </p>
                    <p className="text-xs font-semibold text-base-content mt-0.5">
                      {formatPrice(rp.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
