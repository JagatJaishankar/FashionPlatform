"use client";

import { useEffect, useCallback, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQuickView } from "@/lib/quickview-context";
import { useAuthModal } from "@/lib/auth-modal-context";
import { useCurrency } from "@/lib/currency-context";
import { placeholderProducts } from "@/lib/placeholder-data";

export default function QuickViewModal() {
  const router = useRouter();
  const { activeProduct, closeQuickView, openQuickView } = useQuickView();
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

  if (!animating && !activeProduct) return null;

  const product = activeProduct;
  if (!product) return null;

  function handleShopNow() {
    const slug = product.slug;
    const url = product.redirectUrl || "";
    const brand = product.brand;
    window.open(
      `/redirect?url=${encodeURIComponent(url)}&brand=${encodeURIComponent(brand)}`,
      "_blank"
    );
    closeQuickView();
    router.push(`/products/${slug}`);
  }

  function handleViewDetails() {
    const slug = product.slug;
    closeQuickView();
    router.push(`/products/${slug}`);
  }

  function handleWishlistClick() {
    closeQuickView();
    openAuthModal();
  }

  function handleRelatedClick(relatedProduct) {
    closeQuickView();
    setTimeout(() => openQuickView(relatedProduct), 100);
  }

  const hasSale = product.tags?.includes("sale") && product.originalPrice;
  const hasTrending = product.tags?.includes("trending");
  const hasNew = product.tags?.includes("new");


  const outlineHeart = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[18px] h-[18px] group-hover/wish:fill-current"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  const tagBadges = (hasSale || hasTrending || hasNew) && (
    <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-[1]">
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
  );

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
      <div className="hidden md:flex items-center justify-center px-4 h-full">
        <div
          className={`relative bg-base-100 w-full max-w-4xl max-h-[85vh] overflow-y-auto transition-all duration-300 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-colors cursor-pointer"
            aria-label="Close quick view"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="flex flex-row">
            {/* Image — left half */}
            <div className="w-1/2 relative">
              <div className="relative aspect-[3/4] bg-base-200 overflow-hidden">
                {tagBadges}
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
            <div className="w-1/2 p-6 md:p-8 flex flex-col">
              <Link
                href={`/brands/${product.brandSlug}`}
                onClick={closeQuickView}
                className="text-[11px] tracking-[0.2em] uppercase text-secondary font-medium hover:text-base-content transition-colors"
              >
                {product.brand}
              </Link>
              <h2 className="text-xl md:text-2xl font-display text-base-content mt-1.5 leading-snug line-clamp-2">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-center gap-2 mt-3">
                <span
                  className={`text-lg font-semibold ${hasSale ? "text-error" : "text-base-content"}`}
                >
                  {formatPrice(product.price)}
                </span>
                {hasSale && (
                  <span className="text-sm text-secondary line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="border-t border-base-300 my-5" />

              {/* Affiliate CTA */}
              <button
                type="button"
                onClick={handleShopNow}
                className="w-full py-3.5 bg-base-content text-base-100 text-[11px] tracking-[0.2em] uppercase font-semibold text-center hover:bg-neutral transition-colors cursor-pointer"
              >
                SHOP NOW &rarr;
              </button>
              <p className="text-[10px] text-secondary text-center mt-2">
                You will be redirected to an external site
              </p>

              <div className="border-t border-base-300 my-5" />

              {/* Wishlist */}
              <button
                type="button"
                onClick={handleWishlistClick}
                className="flex items-center gap-2 text-sm cursor-pointer group/wish text-base-content/40 hover:text-error transition-colors duration-200"
              >
                {outlineHeart}
                <span className="text-sm text-secondary group-hover/wish:text-base-content transition-colors">
                  Save to Wishlist
                </span>
              </button>

              {/* View Full Details */}
              <button
                type="button"
                onClick={handleViewDetails}
                className="text-sm text-primary hover:text-base-content hover:underline transition-colors mt-3 cursor-pointer text-left"
              >
                View Full Details &rarr;
              </button>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-base-300">
              <div className="px-6 md:px-8 py-6">
                <h3 className="text-[11px] tracking-[0.15em] uppercase font-semibold text-secondary mb-4">
                  You May Also Like
                </h3>
                <div className="flex gap-3 overflow-x-auto">
                  {relatedProducts.map((rp) => (
                    <div
                      key={rp.id}
                      onClick={() => handleRelatedClick(rp)}
                      className="flex-shrink-0 w-[100px] md:w-[120px] cursor-pointer group/related"
                    >
                      <div className="relative aspect-square bg-base-200 overflow-hidden w-full">
                        <Image
                          src={rp.image}
                          alt={rp.name}
                          fill
                          sizes="120px"
                          className="object-cover group-hover/related:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="text-[9px] tracking-[0.12em] uppercase text-secondary mt-1.5">
                        {rp.brand}
                      </p>
                      <p className="text-[11px] text-base-content line-clamp-1 mt-0.5">
                        {rp.name}
                      </p>
                      <p className="text-[11px] font-semibold mt-0.5">
                        {formatPrice(rp.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <div className="md:hidden fixed inset-x-0 bottom-0 top-0 flex flex-col justify-end">
        <div
          className={`bg-base-100 max-h-[92vh] overflow-y-auto transition-transform duration-300 ${
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
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Image */}
          <div className="relative aspect-[3/4] bg-base-200 overflow-hidden">
            {tagBadges}
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
              className="text-[11px] tracking-[0.2em] uppercase text-secondary font-medium hover:text-base-content transition-colors"
            >
              {product.brand}
            </Link>
            <h2 className="text-xl font-display text-base-content mt-1.5 leading-snug line-clamp-2">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-center gap-2 mt-3">
              <span
                className={`text-lg font-semibold ${hasSale ? "text-error" : "text-base-content"}`}
              >
                {formatPrice(product.price)}
              </span>
              {hasSale && (
                <span className="text-sm text-secondary line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="border-t border-base-300 my-5" />

            {/* Affiliate CTA */}
            <button
              type="button"
              onClick={handleShopNow}
              className="w-full py-3.5 bg-base-content text-base-100 text-[11px] tracking-[0.2em] uppercase font-semibold text-center hover:bg-neutral transition-colors cursor-pointer"
            >
              SHOP NOW &rarr;
            </button>
            <p className="text-[10px] text-secondary text-center mt-2">
              You will be redirected to an external site
            </p>

            <div className="border-t border-base-300 my-5" />

            {/* Wishlist */}
            <button
              type="button"
              onClick={handleWishlistClick}
              className="flex items-center gap-2 text-sm cursor-pointer group/wish text-base-content/40 hover:text-error transition-colors duration-200"
            >
              {outlineHeart}
              <span className="text-sm text-secondary group-hover/wish:text-base-content transition-colors">
                Save to Wishlist
              </span>
            </button>

            {/* View Full Details */}
            <button
              type="button"
              onClick={handleViewDetails}
              className="text-sm text-primary hover:text-base-content hover:underline transition-colors mt-3 cursor-pointer text-left"
            >
              View Full Details &rarr;
            </button>
          </div>

          {/* Related Products — horizontal scroll */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-base-300 mx-5 pt-5 pb-6">
              <h3 className="text-[11px] tracking-[0.15em] uppercase font-semibold text-secondary mb-4">
                You May Also Like
              </h3>
              <div className="flex overflow-x-auto gap-3 snap-x scrollbar-hide -mx-5 px-5">
                {relatedProducts.map((rp) => (
                  <div
                    key={rp.id}
                    onClick={() => handleRelatedClick(rp)}
                    className="shrink-0 w-[80px] snap-start group/related cursor-pointer"
                  >
                    <div className="relative aspect-square bg-base-200 overflow-hidden w-full">
                      <Image
                        src={rp.image}
                        alt={rp.name}
                        fill
                        sizes="80px"
                        className="object-cover group-hover/related:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-[9px] tracking-[0.12em] uppercase text-secondary mt-1.5">
                      {rp.brand}
                    </p>
                    <p className="text-[11px] text-base-content line-clamp-1 mt-0.5">
                      {rp.name}
                    </p>
                    <p className="text-[11px] font-semibold mt-0.5">
                      {formatPrice(rp.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
