import { notFound } from "next/navigation";
import { placeholderBlogPosts } from "@/lib/placeholder-data";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = placeholderBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <main className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <BreadcrumbNav items={breadcrumbs} />

      <article className="max-w-2xl">
        <p className="text-[11px] tracking-[0.15em] uppercase text-secondary font-body">
          {post.category}
        </p>
        <h1 className="text-3xl md:text-4xl font-display text-base-content mt-2">
          {post.title}
        </h1>
        <p className="text-xs text-secondary mt-2">{post.date}</p>

        <div className="border-t border-base-300 my-6" />

        <p className="text-sm text-secondary leading-relaxed">
          This blog post is coming soon. Check back later for fashion tips,
          styling guides, and the latest deals.
        </p>
      </article>
    </main>
  );
}
