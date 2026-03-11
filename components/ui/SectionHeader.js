import Link from "next/link";

export default function SectionHeader({
  eyebrow,
  heading,
  linkLabel,
  linkHref,
  align = "left",
}) {
  if (align === "center") {
    return (
      <div className="flex flex-col items-center text-center mb-6 md:mb-8">
        {eyebrow && (
          <span className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body mb-1">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-display text-base-content">
          {heading}
        </h2>
        {linkLabel && linkHref && (
          <Link
            href={linkHref}
            className="text-[11px] tracking-[0.15em] uppercase text-secondary hover:text-base-content transition-colors font-body flex items-center gap-1 mt-3"
          >
            {linkLabel} <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="mb-6 md:mb-8 border-b border-base-300 pb-4">
      <div className="flex justify-between items-end">
        <div>
          {eyebrow && (
            <span className="text-[11px] tracking-[0.2em] uppercase text-secondary font-body mb-1 block">
              {eyebrow}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl font-display text-base-content">
            {heading}
          </h2>
        </div>
        {linkLabel && linkHref && (
          <Link
            href={linkHref}
            className="text-[11px] tracking-[0.15em] uppercase text-secondary hover:text-base-content transition-colors font-body flex items-center gap-1 shrink-0"
          >
            {linkLabel} <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
    </div>
  );
}
