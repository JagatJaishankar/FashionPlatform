"use client";

import { useEffect, useCallback } from "react";
import { useAuthModal } from "@/lib/auth-modal-context";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuthModal();

  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") closeAuthModal();
    },
    [closeAuthModal]
  );

  useEffect(() => {
    if (isAuthModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isAuthModalOpen, handleEscape]);

  if (!isAuthModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={closeAuthModal}
    >
      <div className="absolute inset-0 bg-neutral/50 backdrop-blur-sm" />
      <div
        className="relative bg-base-100 max-w-md w-full mx-auto p-8 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-secondary hover:text-base-content transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        {/* Heading */}
        <h2 className="text-xl font-display text-center text-base-content mt-4">
          Become a TrendHub member to save items you love.
        </h2>

        {/* Email input */}
        <div className="mt-6">
          <label className="text-[11px] tracking-[0.15em] uppercase text-secondary font-body block mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email to login or register"
            className="w-full border-b border-base-300 focus:border-base-content bg-transparent py-2 text-sm font-body text-base-content placeholder:text-secondary/40 outline-none transition-colors"
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-start gap-2 mt-4 cursor-pointer">
          <input type="checkbox" className="checkbox checkbox-xs mt-0.5 border-base-300" />
          <span className="text-xs text-secondary leading-tight">
            I would like to hear about products, services, and sales, including personalized email alerts from TrendHub.
          </span>
        </label>

        {/* Continue button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="btn bg-base-content text-base-100 w-full py-3 text-[11px] tracking-[0.2em] uppercase font-semibold mt-4 hover:bg-neutral transition-colors cursor-pointer"
        >
          Continue
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 border-t border-base-300" />
          <span className="text-xs text-secondary">OR</span>
          <div className="flex-1 border-t border-base-300" />
        </div>

        {/* Social login buttons */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={closeAuthModal}
            className="btn btn-outline w-full text-sm font-body flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={closeAuthModal}
            className="btn btn-outline w-full text-sm font-body flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Continue with Apple
          </button>

          <button
            type="button"
            onClick={closeAuthModal}
            className="btn btn-outline w-full text-sm font-body flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        {/* Footer text */}
        <p className="text-[10px] text-secondary text-center mt-4">
          By creating an account, you consent to TrendHub&apos;s{" "}
          <span className="underline cursor-pointer">Terms & Conditions</span>.
        </p>
      </div>
    </div>
  );
}
