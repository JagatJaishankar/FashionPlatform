import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

export default function BlogPreview({ posts }) {
  return (
    <section className="py-8 md:py-12 border-t border-base-300">
      <div className="max-w-[1520px] mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader
          heading="From the Blog"
          linkLabel="Read More"
          linkHref="/blog"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
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
              <h3 className="font-display text-lg text-base-content mt-1 group-hover:underline">
                {post.title}
              </h3>
              <p className="text-sm text-secondary mt-1 line-clamp-2">
                {post.excerpt}
              </p>
              <p className="text-xs text-secondary/60 mt-2">{post.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
