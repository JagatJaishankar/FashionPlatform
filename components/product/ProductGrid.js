import ProductCard from "@/components/ui/ProductCard";
import EmptyState from "@/components/ui/EmptyState";

export default function ProductGrid({ products, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] bg-base-200" />
            <div className="h-3 bg-base-200 mt-3 w-16" />
            <div className="h-4 bg-base-200 mt-1 w-32" />
            <div className="h-3 bg-base-200 mt-1 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Try adjusting your filters or search terms to find what you're looking for."
        actionLabel="View All Products"
        actionHref="/products"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} {...product} priority={index < 4} />
      ))}
    </div>
  );
}
