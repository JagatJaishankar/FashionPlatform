"use client";

import { useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  placeholderProducts,
  placeholderCategories,
  placeholderBrands,
  getBrandBySlug,
} from "@/lib/placeholder-data";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import SortDropdown from "@/components/ui/SortDropdown";
import FilterSidebar from "@/components/ui/FilterSidebar";
import ProductGrid from "@/components/product/ProductGrid";

const PRODUCTS_PER_PAGE = 8;

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const tag = searchParams.get("tag") || "";
  const sort = searchParams.get("sort") || "newest";
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  function updateParams(updates) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    // Reset to page 1 when filters change (unless we're just changing pages)
    if (!("page" in updates)) {
      params.delete("page");
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  }

  const filtered = useMemo(() => {
    let result = [...placeholderProducts];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (category) {
      result = result.filter((p) => p.categorySlug === category);
    }

    if (brand) {
      result = result.filter((p) => p.brandSlug === brand);
    }

    if (tag) {
      result = result.filter((p) => p.tags.includes(tag));
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "trending":
        result.sort((a, b) => {
          const aT = a.tags.includes("trending") ? 1 : 0;
          const bT = b.tags.includes("trending") ? 1 : 0;
          return bT - aT;
        });
        break;
      case "newest":
      default:
        // Keep original order as "newest"
        break;
    }

    return result;
  }, [query, category, brand, tag, sort]);

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const currentPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Build page title
  const categoryData = category
    ? placeholderCategories.find((c) => c.slug === category)
    : null;
  const brandData = brand ? getBrandBySlug(brand) : null;
  let pageTitle = "All Products";
  if (query) pageTitle = `Results for "${query}"`;
  else if (categoryData) pageTitle = categoryData.name;
  else if (brandData) pageTitle = brandData.name;
  else if (tag === "sale") pageTitle = "Sale";
  else if (tag === "trending") pageTitle = "Trending";
  else if (tag === "new") pageTitle = "New In";

  // Breadcrumbs
  const breadcrumbs = [{ label: "Home", href: "/" }];
  if (categoryData) {
    breadcrumbs.push({ label: "Products", href: "/products" });
    breadcrumbs.push({ label: categoryData.name });
  } else if (brandData) {
    breadcrumbs.push({ label: "Products", href: "/products" });
    breadcrumbs.push({ label: brandData.name });
  } else {
    breadcrumbs.push({ label: "Products" });
  }

  // Active filters for sidebar
  const activeFilters = {
    categories: category ? [category] : [],
    brands: brand ? [brand] : [],
    tags: tag ? [tag] : [],
    priceRange: "",
  };

  const handleFilterChange = useCallback(
    (newFilters) => {
      const updates = {};

      // Category — take first from array or clear
      const newCat = newFilters.categories?.[0] || "";
      if (newCat !== category) updates.category = newCat;

      // Brand
      const newBrand = newFilters.brands?.[0] || "";
      if (newBrand !== brand) updates.brand = newBrand;

      // Tag
      const newTag = newFilters.tags?.[0] || "";
      if (newTag !== tag) updates.tag = newTag;

      // Price range — filter client-side via URL param
      if (newFilters.priceRange) {
        updates.price = newFilters.priceRange;
      } else {
        updates.price = "";
      }

      updateParams(updates);
    },
    [category, brand, tag, searchParams]
  );

  function handleSortChange(value) {
    updateParams({ sort: value });
  }

  function handlePageChange(newPage) {
    updateParams({ page: newPage > 1 ? String(newPage) : "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <BreadcrumbNav items={breadcrumbs} />

      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-display text-base-content">
            {pageTitle}
          </h1>
          <p className="text-xs text-secondary mt-1">
            ({filtered.length} {filtered.length === 1 ? "product" : "products"})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SortDropdown value={sort} onChange={handleSortChange} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:flex lg:gap-8">
        <FilterSidebar
          categories={placeholderCategories}
          brands={placeholderBrands}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />
        <div className="flex-1 min-w-0 mt-4 lg:mt-0">
          <ProductGrid
            products={paginatedProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}
