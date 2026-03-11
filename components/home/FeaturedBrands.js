import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FeaturedBrands({ brands }) {
  return (
    <section className="py-10 md:py-14 border-t border-base-300">
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FEATURED"
          heading="Brands We Love"
          align="center"
        />
        <div className="flex flex-wrap justify-center gap-3">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="border border-base-300 px-5 py-2 text-sm font-body tracking-wider hover:bg-base-content hover:text-base-100 transition-colors"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
