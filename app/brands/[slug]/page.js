import { notFound } from "next/navigation";
import {
  getBrandBySlug,
  getProductsByBrand,
  getCouponsByBrand,
  placeholderBrands,
} from "@/lib/placeholder-data";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import BrandHeader from "@/components/brand/BrandHeader";
import BrandCoupons from "@/components/brand/BrandCoupons";
import BrandProducts from "@/components/brand/BrandProducts";
import FeaturedBrands from "@/components/home/FeaturedBrands";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: "Brand Not Found" };
  return {
    title: `${brand.name} — Products & Coupon Codes`,
    description: brand.description,
  };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const products = getProductsByBrand(slug);
  const coupons = getCouponsByBrand(slug);
  const otherBrands = placeholderBrands
    .filter((b) => b.slug !== slug)
    .slice(0, 10);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Brands", href: "/brands" },
    { label: brand.name },
  ];

  return (
    <>
      <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
        <BreadcrumbNav items={breadcrumbs} />
        <BrandHeader brand={brand} />
        <BrandCoupons brand={brand.name} coupons={coupons} />
        <BrandProducts
          brand={brand.name}
          brandSlug={brand.slug}
          products={products}
        />
      </main>

      <FeaturedBrands brands={otherBrands} />
    </>
  );
}
