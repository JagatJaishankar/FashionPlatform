import Link from "next/link";

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="w-12 h-12 text-base-300 mb-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <h3 className="font-display text-xl text-base-content">{title}</h3>
      {description && (
        <p className="text-sm text-secondary mt-2 max-w-sm">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="btn btn-sm bg-base-content text-base-100 hover:bg-base-content/80 mt-6 text-[11px] tracking-[0.15em] uppercase font-body"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
