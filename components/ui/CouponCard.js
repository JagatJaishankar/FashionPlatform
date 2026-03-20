"use client";

import { useState } from "react";
import Image from "next/image";

export default function CouponCard({
  brand,
  brandLogo,
  code,
  discount,
  description,
  expiryDate,
  redirectUrl,
  onClaim,
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleClaim() {
    if (onClaim) {
      onClaim();
    } else if (redirectUrl) {
      window.open(redirectUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="border border-base-content/20 hover:border-base-content/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Accent top strip */}
      <div className="h-1 bg-accent-content" />

      <div className="p-5">
        <div className="h-12 flex items-center">
          <Image
            src={brandLogo}
            alt={brand}
            width={96}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </div>
        <p className="text-3xl font-display font-bold text-accent-content mt-3">
          {discount}
        </p>
        <p className="text-xs text-secondary mt-1 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between mt-4 bg-accent border border-dashed border-accent-content/30 px-3 py-2 min-w-0">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider truncate mr-2">
            {code}
          </span>
          <button
            onClick={handleCopy}
            className="text-[10px] tracking-wider uppercase font-semibold text-accent-content hover:text-base-content transition-colors cursor-pointer py-1 pl-2 shrink-0"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <button
          onClick={handleClaim}
          className="w-full mt-3 bg-accent-content text-base-100 hover:bg-base-content text-[11px] tracking-[0.2em] uppercase font-semibold py-2.5 transition-colors cursor-pointer"
        >
          {"GET DEAL →"}
        </button>
      </div>
    </div>
  );
}
