import SectionHeader from "@/components/ui/SectionHeader";
import CategoryCard from "@/components/ui/CategoryCard";

export default function ShopByCategory({ categories }) {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader
          eyebrow="SHOP BY"
          heading="Category"
          align="center"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
