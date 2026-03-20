"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { useQuickView } from "@/lib/quickview-context";

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
  const router = useRouter();

  const hasSale = tags.includes("sale") && originalPrice;
  const hasTrending = tags.includes("trending");
  const discount = hasSale ? getDiscountPercentage(price, originalPrice) : 0;

  function handleWishlistClick(e) {
    e.preventDefault();
    e.stopPropagation();
    router.push("/login");
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

        {/* Wishlist heart — top right */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className="wishlist-heart absolute top-3 right-3 w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-300 ease-out opacity-100 md:opacity-0 md:group-hover:opacity-100 group-hover:animate-heart-breathe"
          aria-label="Save to wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-[18px] h-[18px] heart-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              className="heart-path"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Quick View eye icon — mobile only, below heart */}
        <button
          type="button"
          onClick={handleQuickView}
          className="md:hidden absolute top-13 right-3 w-8 h-8 flex items-center justify-center bg-base-100 shadow-sm text-base-content/50 cursor-pointer"
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
      <p className="text-[11px] tracking-[0.15em] uppercase text-secondary mt-3 font-body">
        {brand}
      </p>
      <p className="text-sm font-medium text-base-content mt-0.5 line-clamp-1 font-body group-hover:underline">
        {name}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-semibold text-base-content">
          {formatPrice(price)}
        </span>
        {hasSale && (
          <>
            <span className="text-xs text-secondary line-through">
              {formatPrice(originalPrice)}
            </span>
            <span className="text-xs text-error font-medium">
              -{discount}%
            </span>
          </>
        )}
      </div>
    </Link>
  );
}
