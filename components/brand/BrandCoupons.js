import SectionHeader from "@/components/ui/SectionHeader";
import CouponCard from "@/components/ui/CouponCard";

export default function BrandCoupons({ brand, coupons }) {
  if (!coupons || coupons.length === 0) return null;

  return (
    <section className="py-10 md:py-14 border-t border-base-300">
      <SectionHeader heading={`${brand} Coupon Codes`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} {...coupon} />
        ))}
      </div>
    </section>
  );
}
