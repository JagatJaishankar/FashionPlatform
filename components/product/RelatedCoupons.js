import SectionHeader from "@/components/ui/SectionHeader";
import CouponCard from "@/components/ui/CouponCard";

export default function RelatedCoupons({ brand, brandSlug, coupons }) {
  if (!coupons || coupons.length === 0) return null;

  return (
    <section className="py-10 md:py-14 border-t border-base-300">
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader
          heading={`${brand} Coupon Codes`}
          linkLabel="View All"
          linkHref={`/coupons?brand=${brandSlug}`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.id} {...coupon} />
          ))}
        </div>
      </div>
    </section>
  );
}
