import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";

export default function RelatedProducts({ brand, brandSlug, products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 md:py-12 border-t border-base-300">
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader
          heading={`More from ${brand}`}
          linkLabel="View All"
          linkHref={`/brands/${brandSlug}`}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
