"use client";

import { useState } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Create Account" },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <BreadcrumbNav items={breadcrumbs} />

      <div className="max-w-md mx-auto mt-8 md:mt-16">
        <h1 className="text-3xl font-display text-base-content text-center">
          Create Account
        </h1>

        <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="text-xs font-medium text-base-content block mb-1.5 font-body">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="input input-bordered w-full bg-base-200 border-base-300 focus:border-base-content text-sm font-body"
            />
          </div>

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

          <div className="mb-4">
            <label className="text-xs font-medium text-base-content block mb-1.5 font-body">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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

          <div className="mb-6">
            <label className="text-xs font-medium text-base-content block mb-1.5 font-body">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="input input-bordered w-full bg-base-200 border-base-300 focus:border-base-content text-sm font-body"
            />
          </div>

          <button
            type="submit"
            className="btn bg-base-content text-base-100 hover:bg-base-content/80 w-full py-3 text-[11px] tracking-[0.2em] uppercase font-body font-semibold"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-secondary text-center mt-6 font-body">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-base-content font-medium hover:text-primary transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
