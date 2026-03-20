import Link from "next/link";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Account" },
];

export default function AccountPage() {
  return (
    <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <BreadcrumbNav items={breadcrumbs} />

      <h1 className="text-2xl md:text-3xl font-display text-base-content mb-8">
        My Account
      </h1>

      <div className="max-w-2xl space-y-8">
        {/* Profile */}
        <section className="border border-base-300 p-6">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body font-semibold mb-4">
            Profile
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-xs text-secondary font-body">Name</span>
              <p className="text-sm text-base-content font-medium font-body">
                Jane Doe
              </p>
            </div>
            <div>
              <span className="text-xs text-secondary font-body">Email</span>
              <p className="text-sm text-base-content font-medium font-body">
                jane@example.com
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline border-base-300 text-base-content hover:bg-base-200 hover:border-base-300 mt-4 text-[11px] tracking-[0.15em] uppercase font-body"
          >
            Edit Profile
          </button>
        </section>

        {/* Order History */}
        <section className="border border-base-300 p-6">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body font-semibold mb-4">
            Order History
          </h2>
          <p className="text-sm text-secondary font-body">No orders yet</p>
        </section>

        {/* Wishlist */}
        <section className="border border-base-300 p-6">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body font-semibold mb-4">
            Wishlist
          </h2>
          <p className="text-sm text-secondary font-body">
            Sign in to view and manage your saved items.
          </p>
          <Link
            href="/wishlist"
            className="text-sm font-medium text-base-content hover:text-primary transition-colors mt-3 inline-block group"
          >
            Go to Wishlist{" "}
            <span
              className="inline-block transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </Link>
        </section>

        {/* Sign Out */}
        <button
          type="button"
          className="btn btn-outline border-base-300 text-base-content hover:bg-base-content hover:text-base-100 text-[11px] tracking-[0.15em] uppercase font-body font-semibold"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}
