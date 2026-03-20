"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function RedirectPage() {
  return (
    <Suspense fallback={null}>
      <RedirectContent />
    </Suspense>
  );
}

function RedirectContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";
  const brand = searchParams.get("brand") || "the store";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const start = Date.now();
    const duration = 2500;
    function tick() {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct * 100);
      if (pct < 1) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);

    // Redirect after 2.5s
    if (url) {
      const timer = setTimeout(() => {
        window.location.href = url;
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [url]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-sm w-full text-center">
        {/* Logo */}
        <p className="font-display text-2xl text-base-content mb-8">
          TrendHub
        </p>

        {/* Progress bar */}
        <div className="w-full h-0.5 bg-base-300 overflow-hidden mb-8">
          <div
            className="h-full bg-primary transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Message */}
        <p className="text-sm text-secondary">Taking you to</p>
        <p className="text-xl font-display text-base-content mt-1">{brand}</p>

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 animate-pulse" style={{ animationDelay: "0ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 animate-pulse" style={{ animationDelay: "300ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 animate-pulse" style={{ animationDelay: "600ms" }} />
        </div>

        {/* Fallback link */}
        {url && (
          <a
            href={url}
            rel="noopener noreferrer"
            className="text-xs text-secondary hover:text-primary transition-colors mt-8 inline-block font-body"
          >
            If you&apos;re not redirected, click here &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
