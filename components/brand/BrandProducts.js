import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";

export default function BrandProducts({ brand, brandSlug, products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-10 md:py-14 border-t border-base-300">
      <SectionHeader
        heading={`${brand} Products`}
        linkLabel="View All"
        linkHref={`/products?brand=${brandSlug}`}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
