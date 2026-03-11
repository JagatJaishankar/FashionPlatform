import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ name, slug, image, productCount }) {
  return (
    <Link
      href={`/products?category=${slug}`}
      className="group relative overflow-hidden aspect-[3/4] block"
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="font-display text-2xl text-neutral-content">{name}</h3>
        <p className="text-xs text-neutral-content/70 tracking-wider uppercase mt-0.5">
          {productCount} products
        </p>
      </div>
    </Link>
  );
}
