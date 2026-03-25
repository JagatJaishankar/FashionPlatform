"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CouponCard from "@/components/ui/CouponCard";
import CouponModal from "@/components/ui/CouponModal";

export default function RelatedCoupons({ brand, brandSlug, coupons }) {
  const [activeCoupon, setActiveCoupon] = useState(null);

  if (!coupons || coupons.length === 0) return null;

  return (
    <>
      <section className="py-8 md:py-12 border-t border-base-300">
        <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeader
            heading={`${brand} Coupon Codes`}
            linkLabel="View All"
            linkHref={`/coupons?brand=${brandSlug}`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onClick={() => setActiveCoupon(coupon)}
              />
            ))}
          </div>
        </div>
      </section>

      <CouponModal
        coupon={activeCoupon}
        isOpen={!!activeCoupon}
        onClose={() => setActiveCoupon(null)}
      />
    </>
  );
}
