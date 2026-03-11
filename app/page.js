import {
  placeholderProducts,
  placeholderCoupons,
  placeholderCategories,
  placeholderBrands,
  placeholderBlogPosts,
  getProductsByCategory,
} from "@/lib/placeholder-data";

import TrendingProducts from "@/components/home/TrendingProducts";
import LatestCoupons from "@/components/home/LatestCoupons";
import CategoryProductRow from "@/components/home/CategoryProductRow";
import ShopByCategory from "@/components/home/ShopByCategory";
import FeaturedBrands from "@/components/home/FeaturedBrands";
import SaleStrip from "@/components/home/SaleStrip";
import BlogPreview from "@/components/home/BlogPreview";

const trendingProducts = placeholderProducts
  .filter((p) => p.tags.includes("trending"))
  .slice(0, 5);

const saleProducts = placeholderProducts
  .filter((p) => p.tags.includes("sale"))
  .slice(0, 5);

const clothingProducts = getProductsByCategory("clothing").slice(0, 5);
const shoesProducts = getProductsByCategory("shoes").slice(0, 5);
const bagsProducts = getProductsByCategory("bags").slice(0, 5);

const latestCoupons = placeholderCoupons.slice(0, 4);
const featuredBrands = placeholderBrands.slice(0, 10);

export default function Home() {
  return (
    <main>
      <TrendingProducts products={trendingProducts} />
      <LatestCoupons coupons={latestCoupons} />
      <CategoryProductRow
        categoryName="Clothing"
        categorySlug="clothing"
        products={clothingProducts}
      />
      <ShopByCategory categories={placeholderCategories} />
      <CategoryProductRow
        categoryName="Shoes"
        categorySlug="shoes"
        products={shoesProducts}
      />
      <FeaturedBrands brands={featuredBrands} />
      <SaleStrip products={saleProducts} />
      <CategoryProductRow
        categoryName="Bags"
        categorySlug="bags"
        products={bagsProducts}
      />
      <BlogPreview posts={placeholderBlogPosts} />
    </main>
  );
}
