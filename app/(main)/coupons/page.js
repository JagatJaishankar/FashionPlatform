"use client";

import { Suspense, useMemo, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { placeholderCoupons, placeholderBrands } from "@/lib/placeholder-data";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import CouponFilters from "@/components/coupon/CouponFilters";
import CouponGrid from "@/components/coupon/CouponGrid";
import CouponModal from "@/components/ui/CouponModal";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Coupons" },
];

// Brands that actually have coupons
const couponBrandSlugs = [...new Set(placeholderCoupons.map((c) => c.brandSlug))];
const couponBrands = placeholderBrands.filter((b) =>
  couponBrandSlugs.includes(b.slug)
);

export default function CouponsPage() {
  return (
    <Suspense fallback={null}>
      <CouponsContent />
    </Suspense>
  );
}

function CouponsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCoupon, setActiveCoupon] = useState(null);

  const brand = searchParams.get("brand") || "";
  const type = searchParams.get("type") || "";

  function updateParams(updates) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/coupons?${params.toString()}`, { scroll: false });
  }

  const handleBrandChange = useCallback(
    (value) => updateParams({ brand: value }),
    [searchParams]
  );

  const handleTypeChange = useCallback(
    (value) => updateParams({ type: value }),
    [searchParams]
  );

  const filtered = useMemo(() => {
    let result = [...placeholderCoupons];

    if (brand) {
      result = result.filter((c) => c.brandSlug === brand);
    }

    if (type) {
      result = result.filter((c) => c.type === type);
    }

    return result;
  }, [brand, type]);

  const activeBrandData = brand
    ? placeholderBrands.find((b) => b.slug === brand)
    : null;

  const pageTitle = activeBrandData
    ? `${activeBrandData.name} Coupons`
    : "All Coupon Codes";

  return (
    <>
      <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
        <BreadcrumbNav items={breadcrumbs} />

        {/* Top bar */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl font-display text-base-content">
            {pageTitle}
          </h1>
          <p className="text-xs text-secondary mt-1">
            ({filtered.length}{" "}
            {filtered.length === 1 ? "coupon" : "coupons"} available)
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <CouponFilters
            brands={couponBrands}
            activeBrand={brand}
            activeType={type}
            onBrandChange={handleBrandChange}
            onTypeChange={handleTypeChange}
          />
        </div>

        {/* Grid */}
        <CouponGrid
          coupons={filtered}
          onClaim={(coupon) => setActiveCoupon(coupon)}
        />
      </main>

      <CouponModal
        coupon={activeCoupon}
        isOpen={!!activeCoupon}
        onClose={() => setActiveCoupon(null)}
      />
    </>
  );
}
