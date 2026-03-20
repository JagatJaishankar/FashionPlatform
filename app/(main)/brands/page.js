import { placeholderBrands } from "@/lib/placeholder-data";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import BrandCard from "@/components/ui/BrandCard";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Brands" },
];

export default function BrandsPage() {
  const sorted = [...placeholderBrands].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Group by first letter
  const grouped = sorted.reduce((acc, brand) => {
    const letter = brand.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(brand);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort();

  return (
    <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <BreadcrumbNav items={breadcrumbs} />

      <h1 className="text-3xl font-display text-base-content">All Brands</h1>
      <p className="text-sm text-secondary mt-1">
        Shop by your favourite designer brands
      </p>

      <div className="mt-8 flex flex-col gap-10">
        {letters.map((letter) => (
          <div key={letter}>
            <h2 className="text-[11px] tracking-[0.2em] uppercase font-body font-semibold text-secondary border-b border-base-300 pb-2 mb-4">
              {letter}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {grouped[letter].map((brand) => (
                <BrandCard key={brand.id} {...brand} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
