"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function RedirectPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";
  const brand = searchParams.get("brand") || "the store";

  useEffect(() => {
    if (url) {
      const timer = setTimeout(() => {
        window.location.href = url;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [url]);

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <Link href="/" className="font-display text-2xl text-base-content mb-8">
        TrendHub
      </Link>

      <span className="loading loading-dots loading-lg text-primary mb-6" />

      <h1 className="text-xl font-display text-base-content">
        Taking you to {brand}...
      </h1>
      <p className="text-sm text-secondary mt-2 max-w-sm">
        You are being redirected to an external site. TrendHub may earn a
        commission from your purchase.
      </p>

      {url && (
        <a
          href={url}
          rel="noopener noreferrer"
          className="text-[11px] tracking-[0.15em] uppercase text-secondary hover:text-base-content transition-colors mt-6 font-body"
        >
          If you&apos;re not redirected automatically, click here &rarr;
        </a>
      )}
    </main>
  );
}
