"use client";

const defaultOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Trending", value: "trending" },
];

export default function SortDropdown({
  value,
  onChange,
  options = defaultOptions,
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="select select-sm border-base-300 bg-transparent text-sm font-body focus:border-base-content focus:outline-none min-h-0 h-auto py-1.5 px-3"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
