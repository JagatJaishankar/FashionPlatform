import CouponCard from "@/components/ui/CouponCard";
import EmptyState from "@/components/ui/EmptyState";

export default function CouponGrid({ coupons, onSelect }) {
  if (!coupons || coupons.length === 0) {
    return (
      <EmptyState
        title="No coupons found"
        description="Try adjusting your filters to find deals from your favourite brands."
        actionLabel="View All Coupons"
        actionHref="/coupons"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon.id}
          coupon={coupon}
          onClick={() => onSelect(coupon)}
        />
      ))}
    </div>
  );
}
