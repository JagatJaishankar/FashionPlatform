"use client";

import { useState, useEffect, useRef } from "react";
import { placeholderBrands } from "@/lib/placeholder-data";

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "Clothing", value: "clothing" },
  { label: "Shoes", value: "shoes" },
  { label: "Bags", value: "bags" },
  { label: "Jewellery", value: "jewellery" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const COLORS = [
  { label: "Black",  value: "black",  hex: "#1a1a1a" },
  { label: "White",  value: "white",  hex: "#f0ede8" },
  { label: "Brown",  value: "brown",  hex: "#8B5E3C" },
  { label: "Beige",  value: "beige",  hex: "#D4B896" },
  { label: "Grey",   value: "grey",   hex: "#9E9E9E" },
  { label: "Red",    value: "red",    hex: "#C0392B" },
  { label: "Pink",   value: "pink",   hex: "#E91E8C" },
  { label: "Blue",   value: "blue",   hex: "#2980B9" },
  { label: "Green",  value: "green",  hex: "#27AE60" },
  { label: "Yellow", value: "yellow", hex: "#F1C40F" },
  { label: "Purple", value: "purple", hex: "#8E44AD" },
  { label: "Multi",  value: "multi",  hex: "#ccc" },
];

const PRICE_RANGES = [
  { label: "Under $100",       value: "0-100" },
  { label: "$100 – $300",      value: "100-300" },
  { label: "$300 – $500",      value: "300-500" },
  { label: "$500 – $1,000",    value: "500-1000" },
  { label: "$1,000 – $2,500",  value: "1000-2500" },
  { label: "Over $2,500",      value: "2500-999999" },
];

export const SORT_OPTIONS = [
  { label: "Recommended",       value: "recommended" },
  { label: "Newest",            value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Trending",          value: "trending" },
];

// ── FilterDropdown ────────────────────────────────────────────────────────────

function FilterDropdown({
  label,
  activeCount = 0,
  isOpen,
  onToggle,
  onClose,
  onApply,
  onClear,
  minWidthClass = "min-w-[240px]",
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleMouseDown(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-1.5 px-3 py-2 border text-xs tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
          isOpen
            ? "border-base-content bg-base-100"
            : "border-base-300 hover:border-base-content/50"
        }`}
      >
        <span className={`text-base leading-none select-none ${isOpen ? "text-base-content" : "text-secondary"}`}>
          {isOpen ? "−" : "+"}
        </span>
        <span className="font-medium">
          {label}
          {activeCount > 0 && ` (${activeCount})`}
        </span>
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 mt-1 bg-base-100 border border-base-300 shadow-lg z-30 ${minWidthClass}`}>
          {children}

          {onApply && (
            <div className="border-t border-base-300">
              <button
                type="button"
                onClick={onApply}
                className="w-full py-3 bg-base-content text-base-100 text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-neutral transition-colors cursor-pointer"
              >
                Apply
              </button>
              {onClear && (
                <button
                  type="button"
                  onClick={onClear}
                  className="w-full py-2 text-xs text-secondary hover:text-base-content transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── MobileSection ─────────────────────────────────────────────────────────────

function MobileSection({ label, activeCount, isOpen, onToggle, children }) {
  return (
    <div className="border-b border-base-300">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
      >
        <span className="text-sm">
          {label}
          {activeCount > 0 && ` (${activeCount})`}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform duration-200 shrink-0 ${isOpen ? "rotate-90" : ""}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

// ── FilterBar ─────────────────────────────────────────────────────────────────

export default function FilterBar({
  productCount,
  activeFilters,
  onFilterChange,
  sort,
  onSortChange,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState(null);
  const [designerSearch, setDesignerSearch] = useState("");

  // Per-dropdown draft state (staged before Apply)
  const [draftCategories, setDraftCategories] = useState([]);
  const [draftDesigners, setDraftDesigners]   = useState([]);
  const [draftSizes, setDraftSizes]           = useState([]);
  const [draftColors, setDraftColors]         = useState([]);
  const [draftPrice, setDraftPrice]           = useState("");

  function openFor(key) {
    if (openDropdown === key) {
      setOpenDropdown(null);
      return;
    }
    // Seed draft from current active filters
    if (key === "categories") setDraftCategories(activeFilters.categories || []);
    if (key === "designers")  { setDraftDesigners(activeFilters.designers || []); setDesignerSearch(""); }
    if (key === "sizes")      setDraftSizes(activeFilters.sizes || []);
    if (key === "colors")     setDraftColors(activeFilters.colors || []);
    if (key === "price")      setDraftPrice(activeFilters.price || "");
    setOpenDropdown(key);
  }

  function closeAll() {
    setOpenDropdown(null);
  }

  function applyFilter(key, value) {
    onFilterChange({ ...activeFilters, [key]: value });
    closeAll();
  }

  function clearFilter(key) {
    const empty = Array.isArray(activeFilters[key]) ? [] : "";
    onFilterChange({ ...activeFilters, [key]: empty });
    closeAll();
  }

  function clearAll() {
    onFilterChange({});
  }

  const hasActiveFilters =
    (activeFilters.categories?.length > 0) ||
    (activeFilters.designers?.length > 0)  ||
    (activeFilters.sizes?.length > 0)      ||
    (activeFilters.colors?.length > 0)     ||
    !!activeFilters.price;

  const activeFilterCount =
    (activeFilters.categories?.length || 0) +
    (activeFilters.designers?.length  || 0) +
    (activeFilters.sizes?.length      || 0) +
    (activeFilters.colors?.length     || 0) +
    (activeFilters.price ? 1 : 0);

  const filteredBrands = placeholderBrands.filter((b) =>
    b.name.toLowerCase().includes(designerSearch.toLowerCase())
  );

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label || "Sort by";

  // Build chips from every active filter
  const chips = [
    ...(activeFilters.categories || []).map((val) => ({
      key: `cat-${val}`,
      label: CATEGORIES.find((c) => c.value === val)?.label || val,
      onRemove: () => onFilterChange({
        ...activeFilters,
        categories: activeFilters.categories.filter((v) => v !== val),
      }),
    })),
    ...(activeFilters.designers || []).map((val) => ({
      key: `des-${val}`,
      label: placeholderBrands.find((b) => b.slug === val)?.name || val,
      onRemove: () => onFilterChange({
        ...activeFilters,
        designers: activeFilters.designers.filter((v) => v !== val),
      }),
    })),
    ...(activeFilters.sizes || []).map((val) => ({
      key: `size-${val}`,
      label: val,
      onRemove: () => onFilterChange({
        ...activeFilters,
        sizes: activeFilters.sizes.filter((v) => v !== val),
      }),
    })),
    ...(activeFilters.colors || []).map((val) => ({
      key: `color-${val}`,
      label: COLORS.find((c) => c.value === val)?.label || val,
      onRemove: () => onFilterChange({
        ...activeFilters,
        colors: activeFilters.colors.filter((v) => v !== val),
      }),
    })),
    ...(activeFilters.price ? [{
      key: "price",
      label: PRICE_RANGES.find((r) => r.value === activeFilters.price)?.label || activeFilters.price,
      onRemove: () => onFilterChange({ ...activeFilters, price: "" }),
    }] : []),
  ];

  // ── Desktop ───────────────────────────────────────────────────────────────
  return (
    <>
      <div className="hidden md:block border-y border-base-300 bg-base-100">
        <div className="flex items-center justify-between gap-4 py-3">

          {/* Left — filter triggers */}
          <div className="flex items-center gap-2 flex-wrap">

            {/* Category */}
            <FilterDropdown
              label="Category"
              activeCount={activeFilters.categories?.length || 0}
              isOpen={openDropdown === "categories"}
              onToggle={() => openFor("categories")}
              onClose={closeAll}
              onApply={() => applyFilter("categories", draftCategories)}
              onClear={() => clearFilter("categories")}
              minWidthClass="min-w-[200px]"
            >
              <div className="p-2">
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.value}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-base-200 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={draftCategories.includes(cat.value)}
                      onChange={() =>
                        setDraftCategories((prev) =>
                          prev.includes(cat.value)
                            ? prev.filter((v) => v !== cat.value)
                            : [...prev, cat.value]
                        )
                      }
                      className="w-4 h-4 accent-base-content"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </FilterDropdown>

            {/* Designer */}
            <FilterDropdown
              label="Designer"
              activeCount={activeFilters.designers?.length || 0}
              isOpen={openDropdown === "designers"}
              onToggle={() => openFor("designers")}
              onClose={closeAll}
              onApply={() => applyFilter("designers", draftDesigners)}
              onClear={() => clearFilter("designers")}
              minWidthClass="min-w-[280px]"
            >
              <div className="border-b border-base-300">
                <input
                  type="text"
                  placeholder="Search designer..."
                  value={designerSearch}
                  onChange={(e) => setDesignerSearch(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm focus:outline-none bg-base-100"
                />
              </div>
              <div className="max-h-[320px] overflow-y-auto p-2">
                {filteredBrands.map((brand) => (
                  <label
                    key={brand.slug}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-base-200 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={draftDesigners.includes(brand.slug)}
                      onChange={() =>
                        setDraftDesigners((prev) =>
                          prev.includes(brand.slug)
                            ? prev.filter((v) => v !== brand.slug)
                            : [...prev, brand.slug]
                        )
                      }
                      className="w-4 h-4 accent-base-content"
                    />
                    <span>{brand.name}</span>
                    {brand.productCount > 0 && (
                      <span className="text-xs text-secondary ml-auto">({brand.productCount})</span>
                    )}
                  </label>
                ))}
                {filteredBrands.length === 0 && (
                  <p className="px-3 py-4 text-xs text-secondary">No designers found</p>
                )}
              </div>
            </FilterDropdown>

            {/* Size */}
            <FilterDropdown
              label="Size"
              activeCount={activeFilters.sizes?.length || 0}
              isOpen={openDropdown === "sizes"}
              onToggle={() => openFor("sizes")}
              onClose={closeAll}
              onApply={() => applyFilter("sizes", draftSizes)}
              onClear={() => clearFilter("sizes")}
              minWidthClass="min-w-[200px]"
            >
              <div className="grid grid-cols-3 gap-1.5 p-3">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() =>
                      setDraftSizes((prev) =>
                        prev.includes(size)
                          ? prev.filter((s) => s !== size)
                          : [...prev, size]
                      )
                    }
                    className={`py-2 border text-xs font-medium transition-colors cursor-pointer ${
                      draftSizes.includes(size)
                        ? "border-base-content bg-base-content text-base-100"
                        : "border-base-300 hover:border-base-content/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </FilterDropdown>

            {/* Color */}
            <FilterDropdown
              label="Color"
              activeCount={activeFilters.colors?.length || 0}
              isOpen={openDropdown === "colors"}
              onToggle={() => openFor("colors")}
              onClose={closeAll}
              onApply={() => applyFilter("colors", draftColors)}
              onClear={() => clearFilter("colors")}
              minWidthClass="min-w-[220px]"
            >
              <div className="grid grid-cols-2 gap-0.5 p-2">
                {COLORS.map((color) => (
                  <label
                    key={color.value}
                    className={`flex items-center gap-2 px-2 py-2 cursor-pointer text-sm transition-colors ${
                      draftColors.includes(color.value) ? "bg-base-200" : "hover:bg-base-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={draftColors.includes(color.value)}
                      onChange={() =>
                        setDraftColors((prev) =>
                          prev.includes(color.value)
                            ? prev.filter((v) => v !== color.value)
                            : [...prev, color.value]
                        )
                      }
                      className="sr-only"
                    />
                    {/* backgroundColor is dynamic — inline style is the only option here */}
                    <span
                      className={`w-5 h-5 border border-base-300 shrink-0 transition-shadow ${
                        draftColors.includes(color.value)
                          ? "ring-2 ring-base-content ring-offset-1"
                          : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.label}</span>
                  </label>
                ))}
              </div>
            </FilterDropdown>

            {/* Price */}
            <FilterDropdown
              label="Price"
              activeCount={activeFilters.price ? 1 : 0}
              isOpen={openDropdown === "price"}
              onToggle={() => openFor("price")}
              onClose={closeAll}
              onApply={() => applyFilter("price", draftPrice)}
              onClear={() => clearFilter("price")}
              minWidthClass="min-w-[220px]"
            >
              <div className="p-2">
                {PRICE_RANGES.map((range) => (
                  <label
                    key={range.value}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-base-200 cursor-pointer text-sm"
                  >
                    <input
                      type="radio"
                      name="draftPrice"
                      checked={draftPrice === range.value}
                      onChange={() => setDraftPrice(range.value)}
                      className="w-4 h-4 accent-base-content"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </FilterDropdown>

          </div>

          {/* Right — product count + sort */}
          <div className="flex items-center gap-6 shrink-0">
            <span className="text-xs text-secondary whitespace-nowrap">
              {productCount} {productCount === 1 ? "Product" : "Products"}
            </span>

            <FilterDropdown
              label={currentSortLabel}
              isOpen={openDropdown === "sort"}
              onToggle={() => openFor("sort")}
              onClose={closeAll}
              minWidthClass="min-w-[200px]"
            >
              <div className="py-1">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onSortChange(opt.value);
                      closeAll();
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-base-200 transition-colors cursor-pointer ${
                      sort === opt.value
                        ? "font-semibold text-base-content"
                        : "text-base-content/70"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </FilterDropdown>
          </div>
        </div>
      </div>

      {/* ── Mobile trigger bar ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between py-3 md:hidden border-y border-base-300">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-base-300 text-xs tracking-wider cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
        </button>
        <span className="text-xs text-secondary">{productCount} Products</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-xs bg-transparent text-base-content cursor-pointer focus:outline-none border-0"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* ── Active filter chips ─────────────────────────────────────────────── */}
      <div className={`mb-4 md:mb-6 ${hasActiveFilters ? "pt-2.5" : ""}`}>
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={chip.onRemove}
                className="flex items-center gap-1.5 border border-base-300 px-2.5 py-1 text-xs hover:border-base-content/40 transition-colors group cursor-pointer"
              >
                <span className="text-secondary group-hover:text-base-content transition-colors leading-none">×</span>
                <span className="font-medium text-base-content">{chip.label}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-secondary underline underline-offset-2 hover:text-base-content transition-colors ml-1 cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* ── Mobile full-screen drawer ───────────────────────────────────────── */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-base-100 flex flex-col md:hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-base-300 shrink-0">
            <h2 className="text-sm tracking-[0.2em] uppercase font-semibold">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="cursor-pointer p-1"
              aria-label="Close filters"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Accordion sections */}
          <div className="flex-1 overflow-y-auto">

            <MobileSection
              label="Category"
              activeCount={activeFilters.categories?.length || 0}
              isOpen={openMobileSection === "categories"}
              onToggle={() => setOpenMobileSection((prev) => prev === "categories" ? null : "categories")}
            >
              {CATEGORIES.map((cat) => (
                <label
                  key={cat.value}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 cursor-pointer text-sm border-b border-base-300/50"
                >
                  <input
                    type="checkbox"
                    checked={(activeFilters.categories || []).includes(cat.value)}
                    onChange={() => {
                      const current = activeFilters.categories || [];
                      const next = current.includes(cat.value)
                        ? current.filter((v) => v !== cat.value)
                        : [...current, cat.value];
                      onFilterChange({ ...activeFilters, categories: next });
                    }}
                    className="w-4 h-4 accent-base-content"
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </MobileSection>

            <MobileSection
              label="Designer"
              activeCount={activeFilters.designers?.length || 0}
              isOpen={openMobileSection === "designers"}
              onToggle={() => setOpenMobileSection((prev) => prev === "designers" ? null : "designers")}
            >
              <div className="border-b border-base-300 px-4 py-2">
                <input
                  type="text"
                  placeholder="Search designer..."
                  value={designerSearch}
                  onChange={(e) => setDesignerSearch(e.target.value)}
                  className="w-full text-sm focus:outline-none bg-transparent"
                />
              </div>
              {placeholderBrands
                .filter((b) => b.name.toLowerCase().includes(designerSearch.toLowerCase()))
                .map((brand) => (
                  <label
                    key={brand.slug}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 cursor-pointer text-sm border-b border-base-300/50"
                  >
                    <input
                      type="checkbox"
                      checked={(activeFilters.designers || []).includes(brand.slug)}
                      onChange={() => {
                        const current = activeFilters.designers || [];
                        const next = current.includes(brand.slug)
                          ? current.filter((v) => v !== brand.slug)
                          : [...current, brand.slug];
                        onFilterChange({ ...activeFilters, designers: next });
                      }}
                      className="w-4 h-4 accent-base-content"
                    />
                    <span>{brand.name}</span>
                  </label>
                ))}
            </MobileSection>

            <MobileSection
              label="Size"
              activeCount={activeFilters.sizes?.length || 0}
              isOpen={openMobileSection === "sizes"}
              onToggle={() => setOpenMobileSection((prev) => prev === "sizes" ? null : "sizes")}
            >
              <div className="grid grid-cols-3 gap-2 p-4">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      const current = activeFilters.sizes || [];
                      const next = current.includes(size)
                        ? current.filter((s) => s !== size)
                        : [...current, size];
                      onFilterChange({ ...activeFilters, sizes: next });
                    }}
                    className={`py-3 border text-xs font-medium transition-colors cursor-pointer ${
                      (activeFilters.sizes || []).includes(size)
                        ? "border-base-content bg-base-content text-base-100"
                        : "border-base-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </MobileSection>

            <MobileSection
              label="Color"
              activeCount={activeFilters.colors?.length || 0}
              isOpen={openMobileSection === "colors"}
              onToggle={() => setOpenMobileSection((prev) => prev === "colors" ? null : "colors")}
            >
              <div className="grid grid-cols-2 gap-0.5 p-3">
                {COLORS.map((color) => (
                  <label
                    key={color.value}
                    className={`flex items-center gap-3 px-3 py-2 cursor-pointer text-sm ${
                      (activeFilters.colors || []).includes(color.value) ? "bg-base-200" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={(activeFilters.colors || []).includes(color.value)}
                      onChange={() => {
                        const current = activeFilters.colors || [];
                        const next = current.includes(color.value)
                          ? current.filter((v) => v !== color.value)
                          : [...current, color.value];
                        onFilterChange({ ...activeFilters, colors: next });
                      }}
                      className="sr-only"
                    />
                    <span
                      className={`w-5 h-5 border border-base-300 shrink-0 ${
                        (activeFilters.colors || []).includes(color.value)
                          ? "ring-2 ring-base-content ring-offset-1"
                          : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.label}</span>
                  </label>
                ))}
              </div>
            </MobileSection>

            <MobileSection
              label="Price"
              activeCount={activeFilters.price ? 1 : 0}
              isOpen={openMobileSection === "price"}
              onToggle={() => setOpenMobileSection((prev) => prev === "price" ? null : "price")}
            >
              {PRICE_RANGES.map((range) => (
                <label
                  key={range.value}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 cursor-pointer text-sm border-b border-base-300/50"
                >
                  <input
                    type="radio"
                    name="mobilePrice"
                    checked={activeFilters.price === range.value}
                    onChange={() => onFilterChange({ ...activeFilters, price: range.value })}
                    className="w-4 h-4 accent-base-content"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </MobileSection>
          </div>

          {/* Bottom action bar */}
          <div className="border-t border-base-300 shrink-0">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-4 bg-base-content text-base-100 text-sm tracking-[0.15em] uppercase font-semibold cursor-pointer"
            >
              Show Results ({productCount})
            </button>
            <button
              type="button"
              onClick={() => { clearAll(); setMobileFiltersOpen(false); }}
              className="w-full py-3 text-sm text-secondary cursor-pointer"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </>
  );
}
