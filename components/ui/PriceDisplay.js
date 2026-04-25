"use client";

import { useCurrency } from "@/lib/currency-context";

export default function PriceDisplay({ price, originalPrice, size = "sm" }) {
  const { formatPrice } = useCurrency();
  const hasDiscount = originalPrice && originalPrice > price;

  const originalClass = size === "lg" ? "text-base text-secondary line-through" : "text-sm text-secondary line-through";
  const priceClass    = size === "lg" ? "text-lg font-semibold"                 : "text-sm font-semibold";

  return (
    <div className="flex items-center gap-2">
      <span className={`${priceClass} ${hasDiscount ? "text-error" : "text-base-content"}`}>
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <span className={originalClass}>
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  );
}
