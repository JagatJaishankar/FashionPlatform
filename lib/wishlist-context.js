"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = useCallback((productId) => {
    setWishlistItems((prev) =>
      prev.includes(productId) ? prev : [...prev, productId]
    );
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) => prev.filter((id) => id !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId) => wishlistItems.includes(productId),
    [wishlistItems]
  );

  const wishlistCount = wishlistItems.length;

  const value = useMemo(
    () => ({
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      wishlistCount,
    }),
    [wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
