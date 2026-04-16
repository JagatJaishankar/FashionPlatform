"use client";

import { Suspense, useMemo, useCallback, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  placeholderProducts,
  placeholderCategories,
  getBrandBySlug,
} from "@/lib/placeholder-data";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import FilterBar from "@/components/ui/FilterBar";
import ProductGrid from "@/components/product/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";

const BATCH = 12;

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [visibleCount, setVisibleCount] = useState(BATCH);

  // Reset to first batch whenever URL filters change
  useEffect(() => {
    setVisibleCount(BATCH);
  }, [searchParams]);

  // New multi-value params (from FilterBar)
  const categoriesParam = searchParams.get("categories") || "";
  const designersParam  = searchParams.get("designers")  || "";
  const sizesParam      = searchParams.get("sizes")      || "";
  const colorsParam     = searchParams.get("colors")     || "";
  const priceParam      = searchParams.get("price")      || "";

  // Legacy single-value params (from nav links: ?category=shoes, ?brand=gucci)
  const legacyCategoryParam = searchParams.get("category") || "";
  const legacyBrandParam    = searchParams.get("brand")    || "";

  const tagParam   = searchParams.get("tag")  || "";
  const sort       = searchParams.get("sort") || "newest";
  const queryParam = searchParams.get("q")    || "";

  const activeFilters = useMemo(() => ({
    categories: categoriesParam
      ? categoriesParam.split(",").filter(Boolean)
      : legacyCategoryParam
      ? [legacyCategoryParam]
      : [],
    designers: designersParam
      ? designersParam.split(",").filter(Boolean)
      : legacyBrandParam
      ? [legacyBrandParam]
      : [],
    sizes:  sizesParam  ? sizesParam.split(",").filter(Boolean)  : [],
    colors: colorsParam ? colorsParam.split(",").filter(Boolean) : [],
    price:  priceParam,
  }), [categoriesParam, designersParam, sizesParam, colorsParam, priceParam, legacyCategoryParam, legacyBrandParam]);

  function buildUrl(newFilters, newSort) {
    const params = new URLSearchParams();
    if (queryParam) params.set("q", queryParam);
    if (tagParam)   params.set("tag", tagParam);
    if (newFilters.categories?.length) params.set("categories", newFilters.categories.join(","));
    if (newFilters.designers?.length)  params.set("designers",  newFilters.designers.join(","));
    if (newFilters.sizes?.length)      params.set("sizes",      newFilters.sizes.join(","));
    if (newFilters.colors?.length)     params.set("colors",     newFilters.colors.join(","));
    if (newFilters.price)              params.set("price",      newFilters.price);
    const s = newSort ?? sort;
    if (s && s !== "newest")           params.set("sort",       s);
    return `/products?${params.toString()}`;
  }

  const handleFilterChange = useCallback((newFilters) => {
    router.push(buildUrl(newFilters), { scroll: false });
  }, [queryParam, tagParam, sort]);

  const handleSortChange = useCallback((newSort) => {
    router.push(buildUrl(activeFilters, newSort), { scroll: false });
  }, [activeFilters, queryParam, tagParam]);

  // Filter + sort
  const filtered = useMemo(() => {
    let result = [...placeholderProducts];

    if (queryParam) {
      const q = queryParam.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (activeFilters.categories.length > 0) {
      result = result.filter((p) => activeFilters.categories.includes(p.categorySlug));
    }

    if (activeFilters.designers.length > 0) {
      result = result.filter((p) => activeFilters.designers.includes(p.brandSlug));
    }

    if (activeFilters.sizes.length > 0) {
      result = result.filter(
        (p) => !p.sizes || p.sizes.some((s) => activeFilters.sizes.includes(s))
      );
    }

    if (activeFilters.colors.length > 0) {
      result = result.filter(
        (p) => !p.colors || p.colors.some((c) => activeFilters.colors.includes(c))
      );
    }

    if (activeFilters.price) {
      const [min, max] = activeFilters.price.split("-").map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    if (tagParam) {
      result = result.filter((p) => p.tags.includes(tagParam));
    }

    switch (sort) {
      case "price-asc":  result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "trending":
        result.sort((a, b) => (b.tags.includes("trending") ? 1 : 0) - (a.tags.includes("trending") ? 1 : 0));
        break;
      default: break;
    }

    return result;
  }, [queryParam, activeFilters, tagParam, sort]);

  const totalProducts  = filtered.length;
  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore        = visibleCount < totalProducts;

  // Page title
  const singleCategory = activeFilters.categories.length === 1
    ? placeholderCategories.find((c) => c.slug === activeFilters.categories[0])
    : null;
  const singleBrand = activeFilters.designers.length === 1
    ? getBrandBySlug(activeFilters.designers[0])
    : null;

  let pageTitle = "All Products";
  if (queryParam)          pageTitle = `Results for "${queryParam}"`;
  else if (singleCategory) pageTitle = singleCategory.name;
  else if (singleBrand)    pageTitle = singleBrand.name;
  else if (tagParam === "sale")     pageTitle = "Sale";
  else if (tagParam === "trending") pageTitle = "Trending";
  else if (tagParam === "new")      pageTitle = "New In";

  // Breadcrumbs
  const breadcrumbs = [{ label: "Home", href: "/" }];
  if (singleCategory) {
    breadcrumbs.push({ label: "Products", href: "/products" });
    breadcrumbs.push({ label: singleCategory.name });
  } else if (singleBrand) {
    breadcrumbs.push({ label: "Products", href: "/products" });
    breadcrumbs.push({ label: singleBrand.name });
  } else {
    breadcrumbs.push({ label: "Products" });
  }

  return (
    <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <BreadcrumbNav items={breadcrumbs} />

      <h1 className="text-2xl md:text-3xl font-display text-base-content mb-4">
        {pageTitle}
      </h1>

      <FilterBar
        productCount={totalProducts}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        sort={sort}
        onSortChange={handleSortChange}
      />

      {totalProducts > 0 ? (
        <>
          <ProductGrid products={visibleProducts} />

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
        </>
      ) : (
        <EmptyState
          title="No products found"
          description="Try adjusting your filters to find what you're looking for."
          actionLabel="View All Products"
          actionHref="/products"
        />
      )}
    </main>
  );
}
