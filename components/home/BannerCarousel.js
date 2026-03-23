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

function buildGroupPositions(totalSlides, vc) {
  const positions = [];
  for (let i = 0; i < totalSlides; i += vc) {
    if (i + vc > totalSlides) {
      positions.push(totalSlides - vc);
      break;
    }
    positions.push(i);
  }
  return positions;
}

export default function BannerCarousel() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [groupIndex, setGroupIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);

  const vc = visibleCount;
  const totalSlides = banners.length;
  const groupPositions = buildGroupPositions(totalSlides, vc);
  const totalGroups = groupPositions.length;

  // Extended slides: [last vc clones] + [all banners] + [first vc clones]
  const prefixClones = banners.slice(-vc);
  const suffixClones = banners.slice(0, vc);
  const extendedSlides = [...prefixClones, ...banners, ...suffixClones];

  // Current position in extended index space
  // Real slides start at index vc in extended array
  // groupPositions[groupIndex] = real slide index of left edge
  // Extended position = vc + groupPositions[groupIndex]
  const realPos = groupPositions[groupIndex] ?? 0;
  const extendedPos = vc + realPos;

  // For wrap states: we temporarily override the position
  const [overridePos, setOverridePos] = useState(null);
  const activePos = overridePos !== null ? overridePos : extendedPos;

  const slideWidth = 100 / vc;
  const offset = -(activePos * slideWidth);

  useEffect(() => {
    function handleResize() {
      setVisibleCount(getVisibleCount());
      setGroupIndex(0);
      setOverridePos(null);
    }
    setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToGroup = useCallback(
    (newIndex) => {
      if (isLocked) return;
      setIsLocked(true);
      setShouldAnimate(true);
      setOverridePos(null);
      setGroupIndex(newIndex);
      setTimeout(() => setIsLocked(false), 520);
    },
    [isLocked]
  );

  const nextGroup = useCallback(() => {
    if (isLocked) return;
    if (groupIndex >= totalGroups - 1) {
      // Wrap forward: animate to suffix clone, then snap back
      setIsLocked(true);
      setShouldAnimate(true);
      setOverridePos(vc + totalSlides); // suffix clone position
      setTimeout(() => {
        setShouldAnimate(false);
        setOverridePos(null);
        setGroupIndex(0);
        requestAnimationFrame(() => {
          setShouldAnimate(true);
          setIsLocked(false);
        });
      }, 520);
    } else {
      goToGroup(groupIndex + 1);
    }
  }, [groupIndex, totalGroups, vc, totalSlides, goToGroup, isLocked]);

  const prevGroup = useCallback(() => {
    if (isLocked) return;
    if (groupIndex <= 0) {
      // Wrap backward: animate to prefix clone, then snap back
      setIsLocked(true);
      setShouldAnimate(true);
      setOverridePos(0); // prefix clone position
      setTimeout(() => {
        setShouldAnimate(false);
        setOverridePos(null);
        setGroupIndex(totalGroups - 1);
        requestAnimationFrame(() => {
          setShouldAnimate(true);
          setIsLocked(false);
        });
      }, 520);
    } else {
      goToGroup(groupIndex - 1);
    }
  }, [groupIndex, totalGroups, goToGroup, isLocked]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(nextGroup, 4000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, nextGroup]);

  function resetAutoScroll() {
    clearInterval(intervalRef.current);
    if (!isPaused) {
      intervalRef.current = setInterval(nextGroup, 4000);
    }
  }

  function handlePrev() {
    prevGroup();
    resetAutoScroll();
  }

  function handleNext() {
    nextGroup();
    resetAutoScroll();
  }

  // Dot indicator: real group index
  let dotIndex = groupIndex;
  if (overridePos === vc + totalSlides) dotIndex = 0;
  if (overridePos === 0) dotIndex = totalGroups - 1;

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
            className={`flex ${shouldAnimate ? "transition-transform duration-500 ease-in-out" : ""}`}
            style={{ transform: `translateX(${offset}%)` }}
          >
            {extendedSlides.map((banner, i) => (
              <div
                key={i}
                className="shrink-0 px-2"
                style={{ width: `${slideWidth}%` }}
              >
                <Link href={banner.link} className="block relative aspect-[2.3/1] overflow-hidden group">
                  <Image
                    src={banner.image}
                    alt={banner.headline}
                    fill
                    sizes={`(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw`}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral/60 via-neutral/25 to-transparent" />
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
            onClick={handlePrev}
            className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center bg-base-100/80 backdrop-blur-sm text-base-content hover:bg-base-100 transition-colors cursor-pointer"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 010 1.06L8.06 10l3.72 3.72a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center bg-base-100/80 backdrop-blur-sm text-base-content hover:bg-base-100 transition-colors cursor-pointer"
            aria-label="Next"
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
              onClick={() => {
                goToGroup(i);
                resetAutoScroll();
              }}
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                i === dotIndex ? "bg-base-content" : "bg-base-300"
              }`}
              aria-label={`Go to slide group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
