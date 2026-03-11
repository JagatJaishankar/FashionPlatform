"use client";

const typeOptions = [
  { label: "All", value: "" },
  { label: "Percentage Off", value: "percentage" },
  { label: "Fixed Amount", value: "fixed" },
  { label: "Free Shipping", value: "free-shipping" },
];

export default function CouponFilters({
  brands,
  activeBrand,
  activeType,
  onBrandChange,
  onTypeChange,
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Brand pills — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          type="button"
          onClick={() => onBrandChange("")}
          className={`shrink-0 flex items-center gap-2 border px-3 py-1.5 text-xs tracking-wider transition-colors cursor-pointer ${
            !activeBrand
              ? "bg-base-content text-base-100 border-base-content"
              : "border-base-300 text-base-content hover:border-base-content/30"
          }`}
        >
          All Brands
        </button>
        {brands.map((brand) => (
          <button
            key={brand.slug}
            type="button"
            onClick={() => onBrandChange(brand.slug)}
            className={`shrink-0 flex items-center gap-2 border px-3 py-1.5 text-xs tracking-wider transition-colors cursor-pointer ${
              activeBrand === brand.slug
                ? "bg-base-content text-base-100 border-base-content"
                : "border-base-300 text-base-content hover:border-base-content/30"
            }`}
          >
            {brand.name}
          </button>
        ))}
      </div>

      {/* Type filter pills */}
      <div className="flex gap-2">
        {typeOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onTypeChange(opt.value)}
            className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-body font-semibold border transition-colors cursor-pointer ${
              activeType === opt.value
                ? "bg-base-content text-base-100 border-base-content"
                : "bg-transparent text-secondary border-base-300 hover:border-base-content/30"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
