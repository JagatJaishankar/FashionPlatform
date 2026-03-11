"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts, searchCoupons } from "@/lib/placeholder-data";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import ProductGrid from "@/components/product/ProductGrid";
import CouponGrid from "@/components/coupon/CouponGrid";
import CouponModal from "@/components/ui/CouponModal";
import EmptyState from "@/components/ui/EmptyState";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Search Results" },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState("products");
  const [activeCoupon, setActiveCoupon] = useState(null);

  const products = useMemo(() => (query ? searchProducts(query) : []), [query]);
  const coupons = useMemo(() => (query ? searchCoupons(query) : []), [query]);

  const hasResults = products.length > 0 || coupons.length > 0;

  return (
    <>
      <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
        <BreadcrumbNav items={breadcrumbs} />

        <h1 className="text-2xl md:text-3xl font-display text-base-content">
          {query ? `Results for "${query}"` : "Search"}
        </h1>

        {!query && (
          <EmptyState
            title="Enter a search term"
            description="Search for products, brands, or coupon codes."
          />
        )}

        {query && !hasResults && (
          <div className="mt-8">
            <EmptyState
              title="No results found"
              description={`We couldn't find anything for "${query}". Try a different search or browse our categories.`}
              actionLabel="Browse Categories"
              actionHref="/products"
            />
          </div>
        )}

        {query && hasResults && (
          <>
            {/* Tabs */}
            <div className="flex gap-6 mt-6 border-b border-base-300">
              <button
                type="button"
                onClick={() => setActiveTab("products")}
                className={`pb-3 text-sm font-body tracking-wider cursor-pointer transition-colors ${
                  activeTab === "products"
                    ? "text-base-content border-b-2 border-base-content"
                    : "text-secondary hover:text-base-content"
                }`}
              >
                Products ({products.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("coupons")}
                className={`pb-3 text-sm font-body tracking-wider cursor-pointer transition-colors ${
                  activeTab === "coupons"
                    ? "text-base-content border-b-2 border-base-content"
                    : "text-secondary hover:text-base-content"
                }`}
              >
                Coupons ({coupons.length})
              </button>
            </div>

            {/* Tab content */}
            <div className="mt-8">
              {activeTab === "products" && (
                products.length > 0 ? (
                  <ProductGrid
                    products={products}
                    currentPage={1}
                    totalPages={1}
                    onPageChange={() => {}}
                  />
                ) : (
                  <EmptyState
                    title="No products found"
                    description="Try searching for a different term or browse all products."
                    actionLabel="View All Products"
                    actionHref="/products"
                  />
                )
              )}
              {activeTab === "coupons" && (
                coupons.length > 0 ? (
                  <CouponGrid
                    coupons={coupons}
                    onClaim={(coupon) => setActiveCoupon(coupon)}
                  />
                ) : (
                  <EmptyState
                    title="No coupons found"
                    description="Try searching for a brand name to find coupon codes."
                    actionLabel="View All Coupons"
                    actionHref="/coupons"
                  />
                )
              )}
            </div>
          </>
        )}
      </main>

      <CouponModal
        coupon={activeCoupon}
        isOpen={!!activeCoupon}
        onClose={() => setActiveCoupon(null)}
      />
    </>
  );
}
