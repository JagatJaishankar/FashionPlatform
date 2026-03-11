import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";

export default function TrendingProducts({ products }) {
  return (
    <section className="py-10 md:py-14">
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader
          eyebrow="TRENDING NOW"
          heading="This Week's Picks"
          linkLabel="See All"
          linkHref="/products?tag=trending"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
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
