import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

export default async function CouponCollectionPage({ params }) {
  const { slug } = await params;

  const collectionName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Coupons", href: "/coupons" },
    { label: "Collections" },
    { label: collectionName },
  ];

  return (
    <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <BreadcrumbNav items={breadcrumbs} />

      <h1 className="text-3xl font-display text-base-content">
        {collectionName}
      </h1>

      <p className="text-sm text-secondary mt-4">
        Coupon collections coming soon.
      </p>
    </main>
  );
}
