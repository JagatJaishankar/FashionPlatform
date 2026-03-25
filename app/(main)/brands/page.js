"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { placeholderBrands } from "@/lib/placeholder-data";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Brands" },
];

const ALL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function BrandsPage() {
  const [activeLetter, setActiveLetter] = useState(null);
  const observerRef = useRef(null);
  const sectionRefs = useRef({});

  const sorted = [...placeholderBrands].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const grouped = sorted.reduce((acc, brand) => {
    const letter = brand.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(brand);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort();

  const handleScrollTo = useCallback((letter) => {
    const el = document.getElementById(`letter-${letter}`);
    if (el) {
      const offset = 120;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const letter = entry.target.getAttribute("data-letter");
            if (letter) setActiveLetter(letter);
          }
        }
      },
      { rootMargin: "-130px 0px -60% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("[data-letter]");
    sections.forEach((section) => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <main>
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <BreadcrumbNav items={breadcrumbs} />
        <h1 className="text-3xl font-display text-base-content text-center mt-2">Brands</h1>
      </div>

      {/* Anchor bar */}
      <div className="sticky top-[57px] z-30 bg-base-100 border-b border-base-300 py-3">
        <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-0.5 flex-wrap">
            {ALL_LETTERS.map((letter) => {
              const hasBrands = letters.includes(letter);
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => hasBrands && handleScrollTo(letter)}
                  disabled={!hasBrands}
                  className={`text-sm font-medium px-2 py-1 transition-colors ${
                    activeLetter === letter
                      ? "text-primary font-semibold"
                      : hasBrands
                        ? "text-base-content hover:text-primary cursor-pointer"
                        : "text-base-content/30 cursor-default"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Brand list */}
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="flex flex-col">
          {letters.map((letter, i) => (
            <div
              key={letter}
              id={`letter-${letter}`}
              data-letter={letter}
              ref={(el) => (sectionRefs.current[letter] = el)}
              className={i > 0 ? "border-t border-base-300 pt-6 mt-6" : ""}
            >
              <h2 className="text-4xl font-display mb-4 text-base-content">
                {letter}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-1.5">
                {grouped[letter].map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/brands/${brand.slug}`}
                    className="text-sm text-base-content hover:text-primary transition-colors py-1"
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
