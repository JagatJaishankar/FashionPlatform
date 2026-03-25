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
      className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 px-6 py-5 border-b border-base-300 last:border-b-0 cursor-pointer group hover:bg-base-200/50 transition-colors"
    >
      {/* LEFT — Big discount display */}
      <div className="flex-shrink-0 w-auto md:w-[85px] text-center flex md:block items-center gap-2">
        <span className="text-3xl font-display font-bold text-primary leading-none">
          {coupon.discountValue}
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-primary mt-0 md:mt-1 block">
          {coupon.discountLabel}
        </span>
      </div>

      {/* MIDDLE — Deal details */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] tracking-[0.15em] uppercase text-secondary font-medium">
          {typeDisplayLabel}
        </span>
        <p className="text-sm font-semibold text-base-content leading-snug mt-1">
          {coupon.discountHeadline}
        </p>
        {coupon.expiryDate && (
          <p className="text-[10px] text-secondary mt-1">Limited time</p>
        )}
        {coupon.description && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="text-[10px] text-secondary hover:text-base-content mt-1.5 flex items-center gap-1 cursor-pointer"
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
          <p className="text-xs text-secondary mt-2 leading-relaxed">
            {coupon.description}
          </p>
        )}
      </div>

      {/* RIGHT — CTA button */}
      <div className="flex-shrink-0 w-full md:w-auto text-center md:text-left">
        <button
          type="button"
          className="bg-base-content text-base-100 px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-neutral transition-colors w-full md:w-auto cursor-pointer"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
