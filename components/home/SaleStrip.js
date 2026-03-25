import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";

export default function SaleStrip({ products }) {
  return (
    <section className="py-8 md:py-12 bg-base-200">
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader
          eyebrow="UP TO 70% OFF"
          heading="Sale"
          linkLabel="Shop Sale"
          linkHref="/products?tag=sale"
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
