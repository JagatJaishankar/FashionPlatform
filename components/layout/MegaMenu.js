"use client";

import Link from "next/link";
import Image from "next/image";
import { useCurrency } from "@/lib/currency-context";
import { placeholderProducts, placeholderBrands } from "@/lib/placeholder-data";

const categoryData = {
  clothing: {
    name: "Clothing",
    slug: "clothing",
    subcategories: [
      { name: "Dresses", slug: "dresses" },
      { name: "Tops", slug: "tops" },
      { name: "Coats & Jackets", slug: "coats-jackets" },
      { name: "Knitwear", slug: "knitwear" },
      { name: "Trousers", slug: "trousers" },
      { name: "Skirts", slug: "skirts" },
      { name: "Activewear", slug: "activewear" },
    ],
  },
  shoes: {
    name: "Shoes",
    slug: "shoes",
    subcategories: [
      { name: "Heels", slug: "heels" },
      { name: "Sneakers", slug: "sneakers" },
      { name: "Boots", slug: "boots" },
      { name: "Sandals", slug: "sandals" },
      { name: "Flats", slug: "flats" },
      { name: "Mules", slug: "mules" },
    ],
  },
  bags: {
    name: "Bags",
    slug: "bags",
    subcategories: [
      { name: "Tote Bags", slug: "tote-bags" },
      { name: "Shoulder Bags", slug: "shoulder-bags" },
      { name: "Crossbody Bags", slug: "crossbody-bags" },
      { name: "Clutches", slug: "clutches" },
      { name: "Backpacks", slug: "backpacks" },
    ],
  },
  jewellery: {
    name: "Jewellery",
    slug: "jewellery",
    subcategories: [
      { name: "Necklaces", slug: "necklaces" },
      { name: "Earrings", slug: "earrings" },
      { name: "Bracelets", slug: "bracelets" },
      { name: "Rings", slug: "rings" },
      { name: "Watches", slug: "watches" },
    ],
  },
};

const popularBrandsByCategory = {
  clothing: ["gucci", "prada", "burberry", "zara", "hm", "kenzo", "valentino", "dior", "balenciaga", "saint-laurent"],
  shoes: ["nike", "adidas", "gucci", "prada", "jimmy-choo", "alexander-mcqueen", "balenciaga", "valentino", "bottega-veneta", "louis-vuitton"],
  bags: ["gucci", "prada", "fendi", "louis-vuitton", "bottega-veneta", "loewe", "celine", "hermes", "chanel", "michael-kors"],
  jewellery: ["fendi", "prada", "alexander-mcqueen", "zara", "dior", "chanel", "valentino", "vivienne-westwood", "versace", "tom-ford"],
};

export default function MegaMenu({ category, onClose }) {
  const { formatPrice } = useCurrency();
  const cat = categoryData[category];
  if (!cat) return null;

  const brandSlugs = popularBrandsByCategory[category] || [];
  const brands = brandSlugs
    .map((slug) => placeholderBrands.find((b) => b.slug === slug))
    .filter(Boolean);

  const saleProducts = placeholderProducts
    .filter((p) => p.categorySlug === category && p.tags.includes("sale"))
    .slice(0, 4);

  return (
    <div className="absolute left-0 right-0 top-full bg-base-100 border-t border-b border-base-300 shadow-lg z-40">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Column 1: Subcategories */}
          <div>
            <Link
              href={`/products?category=${cat.slug}`}
              onClick={onClose}
              className="text-sm font-semibold text-base-content hover:text-primary transition-colors block mb-2"
            >
              All {cat.name}
            </Link>
            <Link
              href={`/products?category=${cat.slug}&tag=sale`}
              onClick={onClose}
              className="text-sm text-error hover:text-error/80 transition-colors block mb-3"
            >
              {cat.name} on Sale
            </Link>
            <div className="border-t border-base-300 pt-3 flex flex-col gap-1">
              {cat.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/products?category=${cat.slug}&subcategory=${sub.slug}`}
                  onClick={onClose}
                  className="text-sm text-base-content hover:text-primary transition-colors py-1 group/sub flex items-center justify-between"
                >
                  {sub.name}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-secondary/0 group-hover/sub:text-primary transition-colors">
                    <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Popular Brands */}
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-3 font-body">
              Popular Brands
            </h3>
            <div className="flex flex-col gap-1">
              {brands.slice(0, 10).map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  onClick={onClose}
                  className="text-sm text-base-content hover:text-primary transition-colors py-1"
                >
                  {brand.name}
                </Link>
              ))}
              <Link
                href="/brands"
                onClick={onClose}
                className="text-sm text-primary hover:underline mt-2 group"
              >
                View All Brands{" "}
                <span className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Columns 3-4: Sale Products */}
          <div className="col-span-2">
            <h3 className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-3 font-body">
              On Sale
            </h3>
            {saleProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {saleProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="group/sale flex gap-3"
                  >
                    <div className="relative w-20 aspect-square bg-base-200 overflow-hidden shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] tracking-wider uppercase text-secondary font-body">
                        {product.brand}
                      </p>
                      <p className="text-sm font-medium text-base-content line-clamp-1 mt-0.5 group-hover/sale:underline">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-sm font-semibold text-error">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-secondary line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-secondary">No sale items in this category right now.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
