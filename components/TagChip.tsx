import Link from "next/link";
import { cn } from "@/lib/utils";

interface TagChipProps {
  tag: string;
  href?: string;
  active?: boolean;
  size?: "sm" | "md" | "lg";
}

export function TagChip({ tag, href, active = false, size = "md" }: TagChipProps) {
  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3.5 py-1.5 text-sm",
    lg: "px-4 py-2 text-sm",
  };

  const baseClasses = cn(
    "tag-chip inline-flex items-center rounded-full font-medium transition-all cursor-pointer",
    sizeClasses[size],
    active
      ? "bg-terracotta-500 text-cream-50 shadow-sm"
      : "bg-cream-200/60 text-charcoal-700 hover:bg-cream-300/60"
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {tag}
      </Link>
    );
  }

  return <span className={baseClasses}>{tag}</span>;
}
