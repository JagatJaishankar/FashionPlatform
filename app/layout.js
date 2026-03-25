import { Cormorant, Manrope } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency-context";
import { AuthModalProvider } from "@/lib/auth-modal-context";
import { QuickViewProvider } from "@/lib/quickview-context";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: {
    default: "TrendHub — Curated Fashion & Exclusive Deals",
    template: "%s | TrendHub",
  },
  description:
    "Discover curated styles from top fashion brands with exclusive coupon codes and deals. Shop clothing, shoes, bags, and jewelry from Burberry, Gucci, Prada, and more.",
  openGraph: {
    title: "TrendHub — Curated Fashion & Exclusive Deals",
    description:
      "Discover curated styles from top fashion brands with exclusive coupon codes and deals.",
    siteName: "TrendHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrendHub — Curated Fashion & Exclusive Deals",
    description:
      "Discover curated styles from top fashion brands with exclusive coupon codes and deals.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="adil" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="bg-base-100 text-base-content font-body antialiased">
        <CurrencyProvider>
          <AuthModalProvider>
            <QuickViewProvider>
              {children}
            </QuickViewProvider>
          </AuthModalProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
