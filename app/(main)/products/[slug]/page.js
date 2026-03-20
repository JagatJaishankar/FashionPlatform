import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getProductsByBrand,
  getCouponsByBrand,
} from "@/lib/placeholder-data";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import PriceDisplay from "@/components/ui/PriceDisplay";
import TagBadge from "@/components/ui/TagBadge";
import RelatedProducts from "@/components/product/RelatedProducts";
import RelatedCoupons from "@/components/product/RelatedCoupons";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} by ${product.brand}`,
    description: `Shop ${product.name} by ${product.brand}. Available at ${product.merchant} on TrendHub.`,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByBrand(product.brandSlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 5);

  const relatedCoupons = getCouponsByBrand(product.brandSlug);

  const categoryLabel =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: categoryLabel, href: `/products?category=${product.categorySlug}` },
    { label: product.name },
  ];

  const hasSale = product.tags.includes("sale");
  const hasTrending = product.tags.includes("trending");
  const hasNew = product.tags.includes("new");

  const shopUrl = `/redirect?url=${encodeURIComponent(product.redirectUrl)}&brand=${encodeURIComponent(product.brand)}`;

  return (
    <>
      <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
        <BreadcrumbNav items={breadcrumbs} />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Product image */}
          <div className="lg:w-[55%]">
            <div className="relative aspect-[3/4] bg-base-200 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                priority
              />
              {(hasSale || hasTrending || hasNew) && (
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {hasSale && <TagBadge label="Sale" variant="sale" />}
                  {hasTrending && <TagBadge label="Trending" variant="trending" />}
                  {hasNew && <TagBadge label="New" variant="new" />}
                </div>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:w-[45%]">
            <Link
              href={`/brands/${product.brandSlug}`}
              className="text-[11px] tracking-[0.2em] uppercase text-secondary hover:text-base-content transition-colors font-body"
            >
              {product.brand}
            </Link>

            <h1 className="text-2xl md:text-3xl font-display text-base-content mt-2">
              {product.name}
            </h1>

            <div className="mt-3">
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                size="lg"
              />
            </div>

            <p className="text-sm text-secondary mt-4">
              Available at{" "}
              <span className="text-base-content font-medium">
                {product.merchant}
              </span>
            </p>

            <div className="border-t border-base-300 my-6" />

            <a
              href={shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-base-content text-base-100 hover:bg-neutral w-full py-3 text-[11px] tracking-[0.2em] uppercase font-body font-semibold"
            >
              Shop Now at {product.merchant} &rarr;
            </a>
            <p className="text-xs text-secondary mt-2 text-center">
              You will be redirected to {product.merchant}
            </p>

            <div className="border-t border-base-300 my-6" />

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-secondary">Category:</span>
                <Link
                  href={`/products?category=${product.categorySlug}`}
                  className="text-base-content hover:text-primary transition-colors font-medium"
                >
                  {categoryLabel}
                </Link>
              </div>

              {product.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-secondary">Tags:</span>
                  <div className="flex gap-1.5">
                    {product.tags.map((t) => (
                      <TagBadge
                        key={t}
                        label={t}
                        variant={
                          t === "sale"
                            ? "sale"
                            : t === "trending"
                              ? "trending"
                              : t === "new"
                                ? "new"
                                : "default"
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <RelatedProducts
        brand={product.brand}
        brandSlug={product.brandSlug}
        products={relatedProducts}
      />

      <RelatedCoupons
        brand={product.brand}
        brandSlug={product.brandSlug}
        coupons={relatedCoupons}
      />
    </>
  );
}
