import Image from "next/image";

export default function BrandHeader({ brand, productCount, couponCount }) {
  const hasLogo = brand.logo && brand.logo.endsWith(".svg");

  return (
    <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left md:gap-6">
      <div className="h-20 flex items-center shrink-0">
        {hasLogo ? (
          <Image
            src={brand.logo}
            alt={brand.name}
            width={160}
            height={80}
            className="h-20 w-auto object-contain"
          />
        ) : (
          <div className="h-20 w-40 bg-base-200 border border-base-300 flex items-center justify-center px-4">
            <span className="text-lg font-body font-bold uppercase tracking-wide text-base-content/60 text-center leading-tight">
              {brand.name}
            </span>
          </div>
        )}
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
          {productCount} {productCount === 1 ? "product" : "products"} &middot; {couponCount} {couponCount === 1 ? "coupon code" : "coupon codes"}
        </p>
      </div>
    </div>
  );
}
