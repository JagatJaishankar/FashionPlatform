import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";

export default function CategoryProductRow({ categoryName, categorySlug, products }) {
  return (
    <section className="py-6 md:py-10 border-t border-base-300">
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader
          heading={categoryName}
          linkLabel="View All"
          linkHref={`/products?category=${categorySlug}`}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              {...product}
              className={i >= 4 ? "hidden lg:block" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
