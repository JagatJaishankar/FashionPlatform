const variants = {
  sale: "bg-error text-error-content",
  trending: "bg-base-content text-base-100",
  new: "bg-primary text-primary-content",
  default: "bg-base-200 text-secondary",
};

export default function TagBadge({ label, variant = "default" }) {
  const colorClasses = variants[variant] || variants.default;

  return (
    <span
      className={`text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 font-body font-semibold inline-block ${colorClasses}`}
    >
      {label}
    </span>
  );
}
