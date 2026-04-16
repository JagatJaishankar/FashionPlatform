"use client";

import { getDiscountPercentage } from "@/lib/utils";
import { useCurrency } from "@/lib/currency-context";

export default function PriceDisplay({ price, originalPrice, size = "sm" }) {
  const { formatPrice } = useCurrency();
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount ? getDiscountPercentage(price, originalPrice) : 0;

  const originalClass = size === "lg" ? "text-base text-secondary line-through" : "text-sm text-secondary line-through";
  const priceClass    = size === "lg" ? "text-lg font-semibold"                 : "text-sm font-semibold";
  const discountClass = size === "lg" ? "text-sm font-medium text-error"        : "text-xs font-medium text-error";

  return (
    <div className="flex flex-col gap-0.5">
      {/* Line 1: prices */}
      <div className="flex items-center gap-2">
        {hasDiscount && (
          <span className={originalClass}>
            {formatPrice(originalPrice)}
          </span>
        )}
        <span className={`${priceClass} ${hasDiscount ? "text-error" : "text-base-content"}`}>
          {formatPrice(price)}
        </span>
      </div>

      {/* Line 2: discount percentage */}
      {hasDiscount && (
        <span className={discountClass}>
          -{discountPercentage}%
        </span>
      )}
    </div>
  );
}
