"use client";

import { getDiscountPercentage } from "@/lib/utils";
import { useCurrency } from "@/lib/currency-context";

const sizes = {
  sm: { price: "text-sm font-semibold", original: "text-xs", discount: "text-xs" },
  lg: { price: "text-xl font-semibold", original: "text-sm", discount: "text-sm" },
};

export default function PriceDisplay({
  price,
  originalPrice,
  size = "sm",
}) {
  const { formatPrice } = useCurrency();
  const s = sizes[size] || sizes.sm;
  const hasDiscount = originalPrice && originalPrice > price;
  const discount = hasDiscount ? getDiscountPercentage(price, originalPrice) : 0;

  return (
    <div className="flex items-center gap-2">
      <span className={`${s.price} text-base-content`}>
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <>
          <span className={`${s.original} text-secondary line-through`}>
            {formatPrice(originalPrice)}
          </span>
          <span className={`${s.discount} text-error font-medium`}>
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
}
