import Link from "next/link";
import Image from "next/image";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";

export default function ProductCard({
  slug,
  name,
  brand,
  price,
  originalPrice,
  image,
  tags = [],
  className = "",
}) {
  const hasSale = tags.includes("sale") && originalPrice;
  const hasTrending = tags.includes("trending");
  const discount = hasSale ? getDiscountPercentage(price, originalPrice) : 0;

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
