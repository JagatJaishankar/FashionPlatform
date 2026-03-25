import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-100 border-t border-base-300 pt-10 pb-8">
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="font-display text-2xl text-base-content">
              TrendHub
            </Link>
            <p className="text-xs text-secondary mt-2">
              Curated fashion. Exclusive deals.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-base-content mb-4 font-body font-semibold">
              Shop
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/products" className="text-sm text-secondary hover:text-base-content transition-colors">
                Women
              </Link>
              <Link href="/products?tag=new" className="text-sm text-secondary hover:text-base-content transition-colors">
                New In
              </Link>
              <Link href="/products?tag=sale" className="text-sm text-secondary hover:text-base-content transition-colors">
                Sale
              </Link>
              <Link href="/brands" className="text-sm text-secondary hover:text-base-content transition-colors">
                Brands
              </Link>
            </nav>
          </div>

          {/* Coupons */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-base-content mb-4 font-body font-semibold">
              Coupons
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/coupons" className="text-sm text-secondary hover:text-base-content transition-colors">
                All Deals
              </Link>
              <Link href="/coupons?view=brands" className="text-sm text-secondary hover:text-base-content transition-colors">
                By Brand
              </Link>
              <Link href="/coupons?view=collections" className="text-sm text-secondary hover:text-base-content transition-colors">
                Collections
              </Link>
              <Link href="/coupons?view=latest" className="text-sm text-secondary hover:text-base-content transition-colors">
                Latest Codes
              </Link>
            </nav>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-base-content mb-4 font-body font-semibold">
              Account
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/account" className="text-sm text-secondary hover:text-base-content transition-colors">
                My Account
              </Link>
              <Link href="/wishlist" className="text-sm text-secondary hover:text-base-content transition-colors">
                Wishlist
              </Link>
              <Link href="/login" className="text-sm text-secondary hover:text-base-content transition-colors">
                Sign In
              </Link>
            </nav>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-base-content mb-4 font-body font-semibold">
              Follow
            </h4>
            <nav className="flex flex-col gap-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-base-content transition-colors">
                Instagram
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-base-content transition-colors">
                Pinterest
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-base-content transition-colors">
                TikTok
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-base-300 mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-xs text-secondary">
            &copy; 2026 TrendHub. All rights reserved.
          </p>
          <div className="flex gap-3 text-xs text-secondary">
            <Link href="/privacy" className="hover:text-base-content transition-colors">
              Privacy Policy
            </Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-base-content transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
