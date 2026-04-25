"use client";

import Image from "next/image";
import { useQuickView } from "@/lib/quickview-context";
import { useAuthModal } from "@/lib/auth-modal-context";
import { useCurrency } from "@/lib/currency-context";

export default function ProductCard({
  id,
  slug,
  name,
  brand,
  brandSlug,
  price,
  originalPrice,
  image,
  tags = [],
  merchant,
  redirectUrl,
  category,
  categorySlug,
  priority = false,
  className = "",
}) {
  const { openQuickView } = useQuickView();
  const { openAuthModal } = useAuthModal();
  const { formatPrice } = useCurrency();

  const hasSale = tags.includes("sale") && originalPrice;
  const hasTrending = tags.includes("trending");
  const hasDiscount = originalPrice && originalPrice > price;

  function handleCardClick() {
    openQuickView({
      id,
      slug,
      name,
      brand,
      brandSlug,
      price,
      originalPrice,
      image,
      tags,
      merchant,
      redirectUrl,
      category,
      categorySlug,
    });
  }

  function handleWishlistClick(e) {
    e.stopPropagation();
    openAuthModal();
  }

  return (
    <div onClick={handleCardClick} className={`cursor-pointer group ${className}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-base-200">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        {/* Tag badges — top left */}
        {(hasSale || hasTrending) && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {hasSale && (
              <span className="bg-error text-error-content text-[10px] tracking-wider uppercase px-2 py-0.5 font-body font-semibold">
                Sale
              </span>
            )}
            {hasTrending && (
              <span className="bg-base-content text-base-100 text-[10px] tracking-wider uppercase px-2 py-0.5 font-body">
                Trending
              </span>
            )}
          </div>
        )}

        {/* Quick View bar — desktop hover */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-base-content/90 text-base-100 text-center py-2.5 text-[11px] tracking-[0.2em] uppercase font-semibold font-body opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Quick View
        </div>
      </div>

      {/* Info section */}
      <div className="mt-2.5">
        {/* Row 1: Brand */}
        <p className="text-[11px] tracking-[0.15em] uppercase text-secondary font-body">
          {brand}
        </p>

        {/* Row 2: Product name */}
        <p className="text-sm font-medium text-base-content mt-0.5 line-clamp-1 font-body group-hover:underline">
          {name}
        </p>

        {/* Row 3: Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-sm font-semibold ${hasDiscount ? "text-error" : "text-base-content"}`}>
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-secondary line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
