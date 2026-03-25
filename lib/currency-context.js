"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";

const CurrencyContext = createContext(null);

const currencies = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "\u20AC", rate: 0.92 },
  GBP: { symbol: "\u00A3", rate: 0.79 },
  INR: { symbol: "\u20B9", rate: 83 },
  AED: { symbol: "\u062F.\u0625", rate: 3.67 },
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");

  const currencySymbol = currencies[currency]?.symbol || "$";

  const convertPrice = useCallback(
    (priceInUSD) => {
      const rate = currencies[currency]?.rate || 1;
      return priceInUSD * rate;
    },
    [currency]
  );

  const formatPrice = useCallback(
    (priceInUSD) => {
      const converted = convertPrice(priceInUSD);
      const sym = currencySymbol;
      if (currency === "INR") {
        return `${sym}${converted.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
      }
      if (currency === "AED") {
        return `${sym} ${converted.toFixed(2)}`;
      }
      return `${sym}${converted.toFixed(2)}`;
    },
    [currency, currencySymbol, convertPrice]
  );

  const value = useMemo(
    () => ({ currency, setCurrency, currencySymbol, convertPrice, formatPrice }),
    [currency, setCurrency, currencySymbol, convertPrice, formatPrice]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
