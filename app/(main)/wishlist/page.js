"use client";

import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import { useAuthModal } from "@/lib/auth-modal-context";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Wishlist" },
];

export default function WishlistPage() {
  const { openAuthModal } = useAuthModal();

  return (
    <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <BreadcrumbNav items={breadcrumbs} />

      <h1 className="text-2xl md:text-3xl font-display text-base-content mb-8">
        Your Wishlist
      </h1>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-12 h-12 text-base-300 mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <h3 className="font-display text-xl text-base-content">
          Sign in to view your wishlist
        </h3>
        <p className="text-sm text-secondary mt-2 max-w-sm">
          Save your favourite pieces and keep track of price drops by signing in to your account.
        </p>
        <button
          type="button"
          onClick={openAuthModal}
          className="btn btn-sm bg-base-content text-base-100 hover:bg-base-content/80 mt-6 text-[11px] tracking-[0.15em] uppercase font-body cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </main>
  );
}
