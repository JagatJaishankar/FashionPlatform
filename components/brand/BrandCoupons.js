"use client";

import { useState } from "react";
import CouponCard from "@/components/ui/CouponCard";
import CouponModal from "@/components/ui/CouponModal";

export default function BrandCoupons({ brand, activeCoupons = [], expiredCoupons = [] }) {
  const [activeTab, setActiveTab] = useState("active");
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const totalCoupons = activeCoupons.length + expiredCoupons.length;
  if (totalCoupons === 0) return null;

  function handleTabChange(tab) {
    setActiveTab(tab);
    setExpanded(false);
  }

  return (
    <>
      <section className="py-6 md:py-8">
        <h2 className="text-xl font-display mb-1">{brand} Offers</h2>
        <p className="text-xs text-secondary mb-4">
          {activeCoupons.length} active &middot; {expiredCoupons.length} expired
        </p>

        {/* Tabs */}
        <div className="flex items-center gap-0 mb-4 border-b border-base-300">
          <button
            type="button"
            onClick={() => handleTabChange("active")}
            className={`px-4 py-2.5 text-[11px] tracking-[0.15em] uppercase font-semibold transition-colors relative cursor-pointer ${
              activeTab === "active"
                ? "text-base-content"
                : "text-secondary hover:text-base-content"
            }`}
          >
            Active ({activeCoupons.length})
            {activeTab === "active" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-base-content" />
            )}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("expired")}
            className={`px-4 py-2.5 text-[11px] tracking-[0.15em] uppercase font-semibold transition-colors relative cursor-pointer ${
              activeTab === "expired"
                ? "text-base-content"
                : "text-secondary hover:text-base-content"
            }`}
          >
            Expired ({expiredCoupons.length})
            {activeTab === "expired" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-base-content" />
            )}
          </button>
        </div>

        {/* Active tab */}
        {activeTab === "active" && (
          activeCoupons.length > 0 ? (
            <>
              <div
                className={`relative transition-all duration-500 ease-in-out overflow-hidden ${
                  expanded ? "max-h-[3000px]" : "max-h-[260px]"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeCoupons.map((coupon) => (
                    <CouponCard
                      key={coupon.id}
                      coupon={coupon}
                      showBrand={false}
                      onClick={() => setActiveCoupon(coupon)}
                    />
                  ))}
                </div>

                {!expanded && activeCoupons.length > 3 && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-base-100 to-transparent pointer-events-none" />
                )}
              </div>

              {activeCoupons.length > 3 && (
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="w-full py-3 mt-4 flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold text-secondary hover:text-base-content transition-colors border border-base-300 cursor-pointer"
                >
                  {expanded ? "Show Less" : `View More Offers (${activeCoupons.length - 3})`}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              )}
            </>
          ) : (
            <p className="text-sm text-secondary py-8 text-center">
              No active offers right now
            </p>
          )
        )}

        {/* Expired tab */}
        {activeTab === "expired" && (
          expiredCoupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-50 grayscale">
              {expiredCoupons.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  coupon={coupon}
                  showBrand={false}
                  onClick={() => setActiveCoupon(coupon)}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-secondary py-8 text-center">
              No expired offers
            </p>
          )
        )}
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
