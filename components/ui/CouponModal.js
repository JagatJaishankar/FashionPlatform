"use client";

import { useState, useEffect, useCallback } from "react";
import { getCouponsByBrand } from "@/lib/placeholder-data";

export default function CouponModal({
  coupon,
  isOpen,
  onClose,
  showBrand = true,
}) {
  const [copied, setCopied] = useState(false);

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

  if (!isOpen || !coupon) return null;

  function handleCopy() {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const storeUrl = `/redirect?url=${encodeURIComponent(coupon.redirectUrl || "")}&brand=${encodeURIComponent(coupon.brand)}`;

  const relatedCoupons = getCouponsByBrand(coupon.brandSlug).filter(
    (c) => c.id !== coupon.id
  );

  const typeLabel =
    coupon.type === "coupon-code"
      ? "Coupon Code"
      : coupon.type === "cashback"
        ? "Cash Back"
        : coupon.type === "free-shipping"
          ? "Free Shipping"
          : "Sale";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-neutral/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-base-100 w-full max-w-md z-10 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-base-content transition-colors cursor-pointer z-10"
          aria-label="Close modal"
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

        <div className="px-6 pt-8 pb-6">
          {/* Brand name as typographic logo */}
          {showBrand && (
            <h2 className="text-xl font-display font-bold uppercase tracking-wide text-center text-base-content">
              {coupon.brand}
            </h2>
          )}

          {/* Discount */}
          <p className="text-3xl font-display font-bold text-center text-primary mt-2">
            {coupon.discount}
          </p>

          {/* Headline */}
          {coupon.discountHeadline && (
            <p className="text-base font-medium text-center text-base-content mt-2">
              {coupon.discountHeadline}
            </p>
          )}

          {/* Description */}
          {coupon.description && (
            <p className="text-sm text-secondary text-center mt-1">
              {coupon.description}
            </p>
          )}

          {/* Type tag */}
          <div className="flex justify-center mt-3">
            <span className="text-[10px] tracking-[0.15em] uppercase text-secondary font-medium border border-base-300 px-3 py-1">
              {typeLabel}
            </span>
          </div>

          {/* Expiry */}
          {coupon.expiryDate && (
            <p className="text-xs text-secondary text-center mt-1">
              Expires: {coupon.expiryDate}
            </p>
          )}

          {/* Code */}
          {coupon.code && (
            <div className="flex items-center justify-between bg-base-200 px-4 py-3 mt-4">
              <span className="font-mono text-lg tracking-widest font-semibold">
                {coupon.code}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[10px] tracking-wider uppercase font-semibold text-primary hover:text-base-content transition-colors cursor-pointer"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}

          <div className="border-t border-base-300 my-4" />

          {/* CTA */}
          <a
            href={storeUrl}
            className="btn bg-base-content text-base-100 hover:bg-neutral w-full py-3 text-[11px] tracking-[0.2em] uppercase font-body font-semibold transition-colors block text-center"
          >
            GO TO STORE &rarr;
          </a>

          {/* Related coupons */}
          {showBrand && relatedCoupons.length > 0 && (
            <div className="mt-5 border-t border-base-300 pt-4">
              <p className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body mb-3">
                More from {coupon.brand}
              </p>
              <div className="flex flex-col gap-2">
                {relatedCoupons.map((rc) => (
                  <div
                    key={rc.id}
                    className="flex items-center justify-between bg-base-200 px-3 py-2"
                  >
                    <div>
                      <span className="text-sm font-semibold">
                        {rc.discount}
                      </span>
                      <span className="text-xs text-secondary ml-2">
                        {rc.code}
                      </span>
                    </div>
                    <span className="text-[10px] text-secondary">
                      {rc.expiryDate}
                    </span>
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
