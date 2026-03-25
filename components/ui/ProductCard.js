"use client";

import Link from "next/link";
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

  function handleWishlistClick(e) {
    e.preventDefault();
    e.stopPropagation();
    openAuthModal();
  }

  function handleQuickView(e) {
    e.preventDefault();
    e.stopPropagation();
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

  return (
    <Link href={`/products/${slug}`} className={`group block ${className}`}>
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

        {/* Quick View eye icon — mobile only */}
        <button
          type="button"
          onClick={handleQuickView}
          className="md:hidden absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-base-100 shadow-sm text-base-content/50 cursor-pointer"
          aria-label="Quick view"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[18px] h-[18px]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Quick View bar — desktop hover */}
        <button
          type="button"
          onClick={handleQuickView}
          className="hidden md:block absolute bottom-0 left-0 right-0 bg-base-content/90 text-base-100 text-center py-2.5 text-[11px] tracking-[0.2em] uppercase font-semibold font-body opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
        >
          Quick View
        </button>
      </div>

      {/* Info section: Price + Heart | Brand | Name | Merchant */}
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
            className="group/heart shrink-0 text-base-content hover:text-error transition-colors cursor-pointer"
            aria-label="Save to wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
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

        {/* Row 4: Merchant line */}
        {merchant && (
          <p className="text-[11px] text-secondary mt-1 flex items-center gap-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-2 h-2 text-secondary/50 shrink-0">
              <path d="M6.22 8.72a.75.75 0 001.06 1.06l5.22-5.22v1.69a.75.75 0 001.5 0v-3.5a.75.75 0 00-.75-.75h-3.5a.75.75 0 000 1.5h1.69L6.22 8.72z" />
              <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 007 4H4.75A2.75 2.75 0 002 6.75v4.5A2.75 2.75 0 004.75 14h4.5A2.75 2.75 0 0012 11.25V9a.75.75 0 00-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5z" />
            </svg>
            From <span className="font-medium ml-0.5">{merchant}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
