import Link from "next/link";
import Image from "next/image";

export default function BrandCard({ name, slug, logo, productCount, couponCount }) {
  return (
    <Link
      href={`/brands/${slug}`}
      className="border border-base-300 p-6 hover:border-base-content/30 transition-colors flex flex-col items-center text-center"
    >
      <div className="h-16 flex items-center">
        <Image
          src={logo}
          alt={name}
          width={128}
          height={64}
          className="h-16 w-auto object-contain"
        />
      </div>
      <p className="text-sm font-medium mt-3">{name}</p>
      <p className="text-xs text-secondary mt-1">
        {productCount} products &middot; {couponCount} coupons
      </p>
    </Link>
  );
}
