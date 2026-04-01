"use client";

import { useState } from "react";

function getCtaLabel(type) {
  switch (type) {
    case "coupon-code":
      return "Show Code";
    case "cashback":
      return "Get Reward";
    case "free-shipping":
    case "sale":
    default:
      return "Get Deal";
  }
}

function getTypeLabel(type) {
  switch (type) {
    case "coupon-code":
      return "Code";
    case "cashback":
      return "Online Cash Back";
    case "free-shipping":
      return "Free Shipping";
    case "sale":
    default:
      return "Sale";
  }
}

export default function CouponRow({ coupon, onClick }) {
  const [expanded, setExpanded] = useState(false);
  const ctaLabel = getCtaLabel(coupon.type);
  const typeDisplayLabel = getTypeLabel(coupon.type);

  return (
    <div
      onClick={onClick}
      className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 px-4 py-3 md:px-5 md:py-4 cursor-pointer group hover:bg-base-200/30 transition-all duration-200"
    >
      {/* LEFT — Discount display */}
      <div className="flex-shrink-0 w-auto md:w-[80px] border-l-2 border-primary pl-4 flex md:block items-center gap-2">
        <span className="text-xl md:text-2xl font-display font-bold text-primary leading-none">
          {coupon.discountValue}
        </span>
        <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-primary mt-0 md:mt-0.5 block">
          {coupon.discountLabel}
        </span>
      </div>

      {/* MIDDLE — Deal details */}
      <div className="flex-1 min-w-0">
        <span className="text-[9px] tracking-[0.15em] uppercase text-secondary/70 font-medium">
          {typeDisplayLabel}
        </span>
        <p className="text-sm font-medium text-base-content leading-snug line-clamp-1 mt-0.5">
          {coupon.discountHeadline}
        </p>
        {coupon.expiryDate && (
          <p className="text-[10px] text-secondary/60 mt-0.5">Limited time</p>
        )}
        {coupon.description && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="text-[10px] text-secondary/70 hover:text-base-content cursor-pointer mt-1 flex items-center gap-0.5 transition-colors"
          >
            See Details{" "}
            <span
              className={`transition-transform ${expanded ? "rotate-45" : ""}`}
            >
              +
            </span>
          </button>
        )}
        {expanded && coupon.description && (
          <p className="text-xs text-secondary/80 mt-2 leading-relaxed">
            {coupon.description}
          </p>
        )}
      </div>

      {/* RIGHT — CTA button */}
      <div className="flex-shrink-0 w-full md:w-auto">
        <button
          type="button"
          className="border border-base-content text-base-content px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-base-content hover:text-base-100 transition-colors w-full md:w-auto cursor-pointer"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
