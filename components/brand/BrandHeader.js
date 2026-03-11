import Image from "next/image";

export default function BrandHeader({ brand }) {
  return (
    <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left md:gap-6">
      <div className="h-20 flex items-center shrink-0">
        <Image
          src={brand.logo}
          alt={brand.name}
          width={160}
          height={80}
          className="h-20 w-auto object-contain"
        />
      </div>
      <div>
        <h1 className="text-3xl font-display text-base-content mt-4 md:mt-0">
          {brand.name}
        </h1>
        {brand.description && (
          <p className="text-sm text-secondary mt-1 max-w-lg">
            {brand.description}
          </p>
        )}
        <p className="text-xs tracking-wider uppercase text-secondary mt-2">
          {brand.productCount} products &middot; {brand.couponCount} coupon codes
        </p>
      </div>
    </div>
  );
}
