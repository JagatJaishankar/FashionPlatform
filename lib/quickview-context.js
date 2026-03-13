"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";

const QuickViewContext = createContext(null);

export function QuickViewProvider({ children }) {
  const [activeProduct, setActiveProduct] = useState(null);

  const openQuickView = useCallback((product) => {
    setActiveProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setActiveProduct(null);
  }, []);

  const value = useMemo(
    () => ({ activeProduct, openQuickView, closeQuickView }),
    [activeProduct, openQuickView, closeQuickView]
  );

  return (
    <QuickViewContext.Provider value={value}>
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error("useQuickView must be used within a QuickViewProvider");
  }
  return context;
}
