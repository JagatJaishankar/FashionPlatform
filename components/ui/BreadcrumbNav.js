import Link from "next/link";

export default function BreadcrumbNav({ items = [] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[11px] tracking-wider uppercase font-body text-secondary mb-6"
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {isLast || !item.href ? (
                <span className="text-base-content">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-base-content transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
