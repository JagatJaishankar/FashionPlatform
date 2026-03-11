"use client";

import { useState } from "react";

export default function SearchInput({
  placeholder = "Search...",
  defaultValue = "",
  onSearch,
  className = "",
}) {
  const [value, setValue] = useState(defaultValue);

  function handleSubmit() {
    if (onSearch) onSearch(value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div
      className={`relative border-b border-base-300 focus-within:border-base-content transition-colors ${className}`}
    >
      <button
        type="button"
        onClick={handleSubmit}
        className="absolute left-0 top-1/2 -translate-y-1/2 text-secondary hover:text-base-content transition-colors cursor-pointer"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="bg-transparent w-full py-2 pl-8 text-sm font-body text-base-content placeholder:text-secondary/60 outline-none"
      />
    </div>
  );
}
