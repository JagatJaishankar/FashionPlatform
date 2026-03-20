import Link from "next/link";
import Image from "next/image";
import { placeholderBlogPosts } from "@/lib/placeholder-data";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Blog" },
];

export default function BlogPage() {
  return (
    <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <BreadcrumbNav items={breadcrumbs} />

      <h1 className="text-3xl font-display text-base-content">Blog</h1>
      <p className="text-sm text-secondary mt-1">
        Fashion tips, styling guides, and the latest deals
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {placeholderBlogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="relative aspect-video overflow-hidden bg-base-200">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-secondary mt-3 font-body">
              {post.category}
            </p>
            <h2 className="font-display text-lg text-base-content mt-1 group-hover:underline">
              {post.title}
            </h2>
            <p className="text-sm text-secondary mt-1 line-clamp-2">
              {post.excerpt}
            </p>
            <p className="text-xs text-secondary/60 mt-2">{post.date}</p>
          </Link>
        ))}
      </div>

      <p className="text-sm text-secondary text-center mt-12">
        More posts coming soon.
      </p>
    </main>
  );
}
