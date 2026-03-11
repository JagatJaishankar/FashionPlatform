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
    <div className="border border-base-300 p-5 hover:border-base-content/30 transition-colors">
      <div className="h-12 flex items-center">
        <Image
          src={brandLogo}
          alt={brand}
          width={96}
          height={48}
          className="h-12 w-auto object-contain"
        />
      </div>
      <p className="text-3xl font-display font-bold text-base-content mt-3">
        {discount}
      </p>
      <p className="text-xs text-secondary mt-1 line-clamp-2">
        {description}
      </p>
      <div className="flex items-center justify-between mt-4 bg-base-200 px-3 py-2">
        <span className="font-mono text-sm font-semibold tracking-wider">
          {code}
        </span>
        <button
          onClick={handleCopy}
          className="text-[10px] tracking-wider uppercase font-semibold text-primary hover:text-base-content transition-colors cursor-pointer py-1 pl-2"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <button
        onClick={handleClaim}
        className="text-[11px] tracking-[0.2em] uppercase font-semibold text-primary hover:text-base-content mt-3 inline-block transition-colors cursor-pointer py-1"
      >
        {"GET DEAL →"}
      </button>
    </div>
  );
}
