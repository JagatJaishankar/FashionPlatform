"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";

const BATCH = 12;

export default function BrandProducts({ brand, brandSlug, products }) {
  const [visibleCount, setVisibleCount] = useState(BATCH);

  if (!products || products.length === 0) return null;

  const totalProducts  = products.length;
  const visibleProducts = products.slice(0, visibleCount);
  const hasMore        = visibleCount < totalProducts;

  return (
    <section className="py-8 md:py-12 border-t border-base-300">
      <SectionHeader
        heading={`${brand} Products`}
        linkLabel="View All"
        linkHref={`/products?brand=${brandSlug}`}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {totalProducts > BATCH && (
        <div className="flex flex-col items-center gap-3 mt-10 md:mt-14">
          {hasMore && (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(prev + BATCH, totalProducts))}
              className="px-12 py-3.5 bg-base-content text-base-100 text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-neutral transition-colors cursor-pointer"
            >
              Show More
            </button>
          )}
          <p className="text-xs text-secondary">
            You&apos;ve viewed {Math.min(visibleCount, totalProducts)} out of {totalProducts} products
          </p>
        </div>
      )}
    </section>
  );
}
