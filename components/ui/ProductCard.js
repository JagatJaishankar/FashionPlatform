"use client";

import Image from "next/image";
import { getDiscountPercentage } from "@/lib/utils";
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
  className = "",
}) {
  const { openQuickView } = useQuickView();
  const { openAuthModal } = useAuthModal();
  const { formatPrice } = useCurrency();

  const hasSale = tags.includes("sale") && originalPrice;
  const hasTrending = tags.includes("trending");
  const discount = hasSale ? getDiscountPercentage(price, originalPrice) : 0;

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
        {/* Row 1: Price left, Heart right */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-semibold text-base-content">
              {formatPrice(price)}
            </span>
            {hasSale && (
              <>
                <span className="text-xs text-secondary line-through ml-1.5">
                  {formatPrice(originalPrice)}
                </span>
                <span className="text-xs text-error ml-1.5">
                  -{discount}%
                </span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={handleWishlistClick}
            className="group/heart shrink-0 text-base-content/40 hover:text-error transition-colors duration-200 cursor-pointer"
            aria-label="Save to wishlist"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[18px] h-[18px] group-hover/heart:fill-current"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Row 2: Brand */}
        <p className="text-[11px] tracking-[0.15em] uppercase text-secondary font-body mt-1">
          {brand}
        </p>

        {/* Row 3: Product name */}
        <p className="text-sm font-medium text-base-content mt-0.5 line-clamp-1 font-body group-hover:underline">
          {name}
        </p>
      </div>
    </div>
  );
}
