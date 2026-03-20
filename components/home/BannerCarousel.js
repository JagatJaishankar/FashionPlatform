"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const banners = [
  {
    eyebrow: "NEW SEASON",
    headline: "Spring Collection 2026",
    cta: "Shop Now",
    link: "/products?tag=new",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80",
  },
  {
    eyebrow: "UP TO 50% OFF",
    headline: "End of Season Sale",
    cta: "Shop Sale",
    link: "/products?tag=sale",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
  },
  {
    eyebrow: "EXCLUSIVE",
    headline: "Burberry Trench Coats",
    cta: "Explore",
    link: "/brands/burberry",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80",
  },
  {
    eyebrow: "TRENDING",
    headline: "Designer Sneakers",
    cta: "Shop Sneakers",
    link: "/products?category=shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80",
  },
  {
    eyebrow: "NEW ARRIVALS",
    headline: "Luxury Handbags",
    cta: "View Collection",
    link: "/products?category=bags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80",
  },
  {
    eyebrow: "COUPON CODES",
    headline: "Save on Top Brands",
    cta: "Get Deals",
    link: "/coupons",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
  },
  {
    eyebrow: "EDITORS PICK",
    headline: "Statement Jewellery",
    cta: "Shop Now",
    link: "/products?category=jewellery",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=80",
  },
  {
    eyebrow: "FEATURED",
    headline: "Gucci New In",
    cta: "Explore",
    link: "/brands/gucci",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
  },
];

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export default function BannerCarousel() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);

  const totalSlides = banners.length;
  const totalGroups = Math.ceil(totalSlides / visibleCount);

  useEffect(() => {
    function handleResize() {
      setVisibleCount(getVisibleCount());
      setCurrentIndex(0);
    }
    setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToGroup = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const nextGroup = useCallback(() => {
    goToGroup(currentIndex >= totalGroups - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, totalGroups, goToGroup]);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(nextGroup, 4000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, nextGroup]);

  const offset = -(currentIndex * 100);

  return (
    <section className="pt-6 md:pt-8">
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${offset}%)`,
            }}
          >
            {banners.map((banner, i) => (
              <div
                key={i}
                className="shrink-0 px-2"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <Link href={banner.link} className="block relative aspect-[2.3/1] overflow-hidden group">
                  <Image
                    src={banner.image}
                    alt={banner.headline}
                    fill
                    sizes={`(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw`}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral/60 via-neutral/25 to-transparent" />
                  {/* Text overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-6">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-content/70 font-body">
                      {banner.eyebrow}
                    </span>
                    <h3 className="text-base md:text-lg lg:text-2xl font-display text-neutral-content font-semibold leading-tight mt-1 max-w-[80%] line-clamp-2">
                      {banner.headline}
                    </h3>
                    <span className="inline-block mt-3 border border-neutral-content text-neutral-content text-[10px] tracking-[0.15em] uppercase px-4 py-2 font-body w-fit group-hover:bg-neutral-content group-hover:text-neutral transition-colors">
                      {banner.cta}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Arrow buttons — desktop only */}
          <button
            type="button"
            onClick={() => goToGroup(currentIndex <= 0 ? totalGroups - 1 : currentIndex - 1)}
            className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center bg-base-100/80 backdrop-blur-sm text-base-content hover:bg-base-100 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
            aria-label="Previous"
            style={{ opacity: 1 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 010 1.06L8.06 10l3.72 3.72a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goToGroup(currentIndex >= totalGroups - 1 ? 0 : currentIndex + 1)}
            className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center bg-base-100/80 backdrop-blur-sm text-base-content hover:bg-base-100 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
            aria-label="Next"
            style={{ opacity: 1 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: totalGroups }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToGroup(i)}
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                i === currentIndex ? "bg-base-content" : "bg-base-300"
              }`}
              aria-label={`Go to slide group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
