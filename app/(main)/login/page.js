"use client";

import { useState } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Sign In" },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <BreadcrumbNav items={breadcrumbs} />

      <div className="max-w-md mx-auto mt-8 md:mt-16">
        <h1 className="text-3xl font-display text-base-content text-center">
          Sign In
        </h1>

        <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="text-xs font-medium text-base-content block mb-1.5 font-body">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-base-200 border-base-300 focus:border-base-content text-sm font-body"
            />
          </div>

          <div className="mb-6">
            <label className="text-xs font-medium text-base-content block mb-1.5 font-body">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full bg-base-200 border-base-300 focus:border-base-content text-sm font-body pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-base-content transition-colors cursor-pointer text-xs font-medium font-body"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn bg-base-content text-base-100 hover:bg-base-content/80 w-full py-3 text-[11px] tracking-[0.2em] uppercase font-body font-semibold"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 border-t border-base-300" />
          <span className="text-xs text-secondary font-body">or</span>
          <div className="flex-1 border-t border-base-300" />
        </div>

        <button
          type="button"
          className="btn btn-outline w-full border-base-300 hover:bg-base-200 hover:border-base-300 text-base-content text-sm font-body"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-sm text-secondary text-center mt-6 font-body">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-base-content font-medium hover:text-primary transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
