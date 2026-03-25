"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useCurrency } from "@/lib/currency-context";

const currencyOptions = [
  { code: "USD", flag: "\uD83C\uDDFA\uD83C\uDDF8", label: "US Dollar" },
  { code: "EUR", flag: "\uD83C\uDDEA\uD83C\uDDFA", label: "Euro" },
  { code: "GBP", flag: "\uD83C\uDDEC\uD83C\uDDE7", label: "British Pound" },
  { code: "INR", flag: "\uD83C\uDDEE\uD83C\uDDF3", label: "Indian Rupee" },
  { code: "AED", flag: "\uD83C\uDDE6\uD83C\uDDEA", label: "UAE Dirham" },
];

export default function CurrencySelector({ variant = "desktop" }) {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  const current = currencyOptions.find((c) => c.code === currency) || currencyOptions[0];

  if (variant === "mobile") {
    return (
      <div className="px-4 py-3 border-b border-base-300">
        <p className="text-[11px] tracking-[0.15em] uppercase text-secondary font-body mb-2">Currency</p>
        <div className="flex flex-wrap gap-1.5">
          {currencyOptions.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => setCurrency(opt.code)}
              className={`text-xs font-medium px-3 py-1.5 border transition-colors cursor-pointer ${
                currency === opt.code
                  ? "border-base-content bg-base-content text-base-100"
                  : "border-base-300 text-base-content hover:border-base-content/30"
              }`}
            >
              {opt.flag} {opt.code}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs font-medium tracking-wider text-base-content hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
      >
        {current.flag} {current.code}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-base-100 border border-base-300 shadow-lg py-2 min-w-[180px] z-50">
          {currencyOptions.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => {
                setCurrency(opt.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-sm hover:bg-base-200 flex items-center gap-2 cursor-pointer transition-colors ${
                currency === opt.code ? "font-semibold" : ""
              }`}
            >
              <span>{opt.flag}</span>
              <span>{opt.code}</span>
              <span className="text-secondary text-xs">{opt.label}</span>
              {currency === opt.code && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 ml-auto text-primary">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
