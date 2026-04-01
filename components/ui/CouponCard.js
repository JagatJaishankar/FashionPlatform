"use client";

import { useState } from "react";

function getBadgeText(coupon) {
  switch (coupon.type) {
    case "coupon-code":
      return coupon.discount;
    case "sale":
      return "Sale";
    case "cashback":
      return "Cash Back";
    case "free-shipping":
      return "Free Shipping";
    default:
      return coupon.discount;
  }
}

function getBadgeClasses(type) {
  switch (type) {
    case "free-shipping":
      return "bg-success text-success-content";
    case "sale":
      return "bg-error text-error-content";
    case "cashback":
      return "bg-info text-info-content";
    case "coupon-code":
    default:
      return "bg-primary text-primary-content";
  }
}

export default function CouponCard({ coupon, onClick, className = "" }) {
  const [copied, setCopied] = useState(false);

  const badgeText = getBadgeText(coupon);
  const badgeClasses = getBadgeClasses(coupon.type);

  function handleCopy(e) {
    e.stopPropagation();
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      onClick={onClick}
      className={`border border-base-300 hover:border-base-content/30 hover:shadow-sm transition-all cursor-pointer group overflow-hidden h-full flex flex-col relative bg-base-100 ${className}`}
    >
      {/* Zone 1 — Floating badge */}
      <span
        className={`absolute top-3 left-3 z-10 text-[10px] tracking-[0.12em] uppercase font-bold px-2.5 py-1 ${badgeClasses}`}
      >
        {badgeText}
      </span>

      {/* Zone 2 — Main content */}
      <div className="px-4 pt-10 pb-4 md:px-5 flex items-center gap-4 flex-1">
        <div className="flex-1 min-w-0">
          <p className="text-lg font-display font-bold text-base-content leading-snug line-clamp-1">
            {coupon.discountHeadline}
          </p>
          {coupon.description && (
            <p className="text-xs text-secondary mt-1.5 line-clamp-2 leading-relaxed">
              {coupon.description}
            </p>
          )}
        </div>
        <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 bg-base-200 border border-base-300 flex items-center justify-center p-2">
          <span className="text-[10px] md:text-[11px] font-body font-bold uppercase tracking-wide text-base-content/70 text-center leading-tight">
            {coupon.brand}
          </span>
        </div>
      </div>

      {/* Zone 3 — Bottom bar with scalloped edge */}
      <div className="coupon-tear px-4 py-3 md:px-5 flex items-center justify-between bg-base-300 border-t border-base-300 mt-auto">
        {coupon.code ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm tracking-widest font-semibold text-base-content">
              {coupon.code}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-secondary hover:text-base-content transition-colors cursor-pointer"
              aria-label="Copy code"
            >
              {copied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
                  <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
                </svg>
              )}
            </button>
          </div>
        ) : (
          <span className="text-[10px] tracking-[0.12em] uppercase text-secondary font-medium">
            {coupon.type === "sale"
              ? "Sale"
              : coupon.type === "cashback"
                ? "Cash Back"
                : "Free Shipping"}
          </span>
        )}
        <span className="text-[11px] tracking-[0.15em] uppercase font-semibold text-primary group-hover:text-base-content transition-colors">
          GET DEAL &rarr;
        </span>
      </div>
    </div>
  );
}
