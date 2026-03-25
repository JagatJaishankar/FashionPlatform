"use client";

import { useState } from "react";
import Link from "next/link";
import CouponCard from "@/components/ui/CouponCard";
import CouponModal from "@/components/ui/CouponModal";

export default function LatestCoupons({ coupons }) {
  const [activeCoupon, setActiveCoupon] = useState(null);

  return (
    <>
      <section className="py-8 md:py-12 bg-base-content">
        <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
          {/* Section header — inverted colors for dark bg */}
          <div className="mb-4 md:mb-6 border-b border-base-100/10 pb-4">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[11px] tracking-[0.2em] uppercase text-base-100/50 font-body mb-1 block">
                  EXCLUSIVE DEALS
                </span>
                <h2 className="text-2xl md:text-3xl font-display text-base-100">
                  Latest Coupon Codes
                </h2>
              </div>
              <Link
                href="/coupons"
                className="text-[11px] tracking-[0.15em] uppercase text-base-100/70 font-medium hover:text-base-100 transition-colors font-body flex items-center gap-1 shrink-0 group"
              >
                View All{" "}
                <span
                  className="inline-block transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                className="bg-base-100 hover:shadow-lg hover:-translate-y-0.5"
                onClick={() => setActiveCoupon(coupon)}
              />
            ))}
          </div>
        </div>
      </section>

      {activeCoupon && (
        <CouponModal
          coupon={activeCoupon}
          isOpen={!!activeCoupon}
          onClose={() => setActiveCoupon(null)}
          showBrand={true}
        />
      )}
    </>
  );
}
