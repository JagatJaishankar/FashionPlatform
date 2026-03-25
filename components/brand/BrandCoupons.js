"use client";

import { useState } from "react";
import CouponRow from "@/components/ui/CouponRow";
import CouponModal from "@/components/ui/CouponModal";

export default function BrandCoupons({ brand, coupons }) {
  const [activeCoupon, setActiveCoupon] = useState(null);

  if (!coupons || coupons.length === 0) return null;

  return (
    <>
      <section className="py-6 md:py-8">
        <h2 className="text-xl font-display mb-4">{brand} Offers</h2>
        <p className="text-xs text-secondary mb-4">
          {coupons.length} verified offers
        </p>
        <div className="border border-base-300 divide-y divide-base-300">
          {coupons.map((coupon) => (
            <CouponRow
              key={coupon.id}
              coupon={coupon}
              onClick={() => setActiveCoupon(coupon)}
            />
          ))}
        </div>
      </section>

      <CouponModal
        coupon={activeCoupon}
        isOpen={!!activeCoupon}
        onClose={() => setActiveCoupon(null)}
        showBrand={false}
      />
    </>
  );
}
