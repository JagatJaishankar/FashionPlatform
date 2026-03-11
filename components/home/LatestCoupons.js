import SectionHeader from "@/components/ui/SectionHeader";
import CouponCard from "@/components/ui/CouponCard";

export default function LatestCoupons({ coupons }) {
  return (
    <section className="py-10 md:py-14 bg-base-200">
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader
          eyebrow="EXCLUSIVE DEALS"
          heading="Latest Coupon Codes"
          linkLabel="View All"
          linkHref="/coupons"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.id} {...coupon} />
          ))}
        </div>
      </div>
    </section>
  );
}
