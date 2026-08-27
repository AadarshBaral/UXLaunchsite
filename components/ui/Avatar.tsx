export default function Avatar({
  src,
  name,
  size = 32,
  className = "",
}: {
  src?: string;
  name: string;
  size?: number;
  className?: string;
}) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        style={{ width: size, height: size }}
        className={`rounded-full object-cover border border-line shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      className={`rounded-full border border-line bg-surface text-ink-muted font-medium flex items-center justify-center shrink-0 ${className}`}
    >
      {initial}
    </div>
  );
}
