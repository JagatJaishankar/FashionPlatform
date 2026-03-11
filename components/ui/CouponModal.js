"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { getCouponsByBrand } from "@/lib/placeholder-data";

export default function CouponModal({ coupon, isOpen, onClose }) {
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

  function handleGoToStore() {
    if (coupon.redirectUrl) {
      window.open(coupon.redirectUrl, "_blank", "noopener,noreferrer");
    }
  }

  const relatedCoupons = getCouponsByBrand(coupon.brandSlug).filter(
    (c) => c.id !== coupon.id
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-neutral/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-base-100 w-full max-w-md p-5 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-base-content transition-colors cursor-pointer"
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

        {/* Brand logo */}
        <div className="h-15 flex items-center">
          <Image
            src={coupon.brandLogo}
            alt={coupon.brand}
            width={120}
            height={60}
            className="h-15 w-auto object-contain"
          />
        </div>

        {/* Discount */}
        <p className="text-4xl font-display font-bold text-base-content mt-4">
          {coupon.discount}
        </p>

        {/* Code */}
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

        {/* Description */}
        <p className="text-sm text-secondary mt-3">{coupon.description}</p>

        {/* Expiry */}
        <p className="text-xs text-secondary mt-2">
          Expires: {coupon.expiryDate}
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={handleGoToStore}
          className="btn bg-primary text-primary-content hover:bg-primary/80 w-full mt-4 text-[11px] tracking-[0.15em] uppercase font-body font-semibold cursor-pointer"
        >
          {"GO TO STORE →"}
        </button>

        {/* Related coupons */}
        {relatedCoupons.length > 0 && (
          <div className="mt-6 border-t border-base-300 pt-4">
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
  );
}
