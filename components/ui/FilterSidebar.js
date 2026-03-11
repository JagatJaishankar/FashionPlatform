"use client";

import { useState } from "react";

const priceRanges = [
  { label: "Under $50", value: "0-50" },
  { label: "$50 – $200", value: "50-200" },
  { label: "$200 – $500", value: "200-500" },
  { label: "$500 – $1000", value: "500-1000" },
  { label: "$1000+", value: "1000-99999" },
];

const tagOptions = [
  { label: "Sale", value: "sale" },
  { label: "Trending", value: "trending" },
  { label: "New In", value: "new" },
];

function FilterSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-base-300 py-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between cursor-pointer"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase font-body font-semibold text-base-content">
          {title}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-4 h-4 text-secondary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function CheckboxItem({ label, count, checked, onChange }) {
  return (
    <label className="flex items-center justify-between py-1.5 cursor-pointer group">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="checkbox checkbox-xs border-base-300 [--chkbg:oklch(22.2%_0.0041_84.6)] [--chkfg:oklch(98%_0.0044_78.2)]"
        />
        <span className="text-sm font-body text-base-content group-hover:text-primary transition-colors">
          {label}
        </span>
      </span>
      {count !== undefined && (
        <span className="text-[10px] text-secondary">{count}</span>
      )}
    </label>
  );
}

function useFilterContent({
  categories,
  brands,
  activeFilters,
  onFilterChange,
}) {
  const selectedCategories = activeFilters.categories || [];
  const selectedBrands = activeFilters.brands || [];
  const selectedPrice = activeFilters.priceRange || "";
  const selectedTags = activeFilters.tags || [];

  function toggleArrayFilter(key, value) {
    const current = activeFilters[key] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...activeFilters, [key]: next });
  }

  function setPriceRange(value) {
    onFilterChange({
      ...activeFilters,
      priceRange: activeFilters.priceRange === value ? "" : value,
    });
  }

  return (
    <div>
      <FilterSection title="Category">
        {categories.map((cat) => (
          <CheckboxItem
            key={cat.slug}
            label={cat.name}
            count={cat.productCount}
            checked={selectedCategories.includes(cat.slug)}
            onChange={() => toggleArrayFilter("categories", cat.slug)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Brand">
        {brands.map((brand) => (
          <CheckboxItem
            key={brand.slug}
            label={brand.name}
            count={brand.productCount}
            checked={selectedBrands.includes(brand.slug)}
            onChange={() => toggleArrayFilter("brands", brand.slug)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price Range">
        {priceRanges.map((range) => (
          <label
            key={range.value}
            className="flex items-center gap-2 py-1.5 cursor-pointer group"
          >
            <input
              type="radio"
              name="priceRange"
              checked={selectedPrice === range.value}
              onChange={() => setPriceRange(range.value)}
              className="radio radio-xs border-base-300 [--radiocolor:oklch(22.2%_0.0041_84.6)]"
            />
            <span className="text-sm font-body text-base-content group-hover:text-primary transition-colors">
              {range.label}
            </span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Tags">
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((tag) => {
            const active = selectedTags.includes(tag.value);
            return (
              <button
                key={tag.value}
                type="button"
                onClick={() => toggleArrayFilter("tags", tag.value)}
                className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 font-body font-semibold border transition-colors cursor-pointer ${
                  active
                    ? "bg-base-content text-base-100 border-base-content"
                    : "bg-transparent text-secondary border-base-300 hover:border-base-content/30"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </FilterSection>
    </div>
  );
}

export default function FilterSidebar({
  categories = [],
  brands = [],
  activeFilters = {},
  onFilterChange,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const filterContent = useFilterContent({
    categories,
    brands,
    activeFilters,
    onFilterChange,
  });

  return (
    <>
      {/* Mobile trigger — rendered inline wherever FilterSidebar is placed */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-body font-semibold border border-base-300 px-4 py-2 hover:border-base-content/30 transition-colors cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
            clipRule="evenodd"
          />
        </svg>
        Filters
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-neutral/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-base-100 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-base-300">
              <span className="text-[11px] tracking-[0.2em] uppercase font-body font-semibold">
                Filters
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-secondary hover:text-base-content transition-colors cursor-pointer p-1"
                aria-label="Close filters"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            <div className="px-4 pb-4">{filterContent}</div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-20 shrink-0 w-60 self-start">
        {filterContent}
      </aside>
    </>
  );
}
