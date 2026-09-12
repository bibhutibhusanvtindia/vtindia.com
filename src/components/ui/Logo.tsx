import Image from "next/image";
import { logo } from "@/data/site";

/**
 * Renders the official VT India logo. Sizing is by height only (`w-auto`), so
 * replacing the asset with a higher-resolution or vector file of any aspect
 * ratio will not shift the layout or distort the mark.
 *
 * Never apply colour, filter or aspect-ratio overrides to this component.
 */
export function Logo({
  variant = "primary",
  className = "h-11 sm:h-12 w-auto",
  priority = false,
}: {
  variant?: "primary" | "footer";
  className?: string;
  priority?: boolean;
}) {
  const isFooter = variant === "footer";
  return (
    <Image
      src={isFooter ? logo.srcFooter : logo.src}
      alt={logo.alt}
      width={isFooter ? logo.intrinsicWidthFooter : logo.intrinsicWidth}
      height={isFooter ? logo.intrinsicHeightFooter : logo.intrinsicHeight}
      priority={priority}
      quality={100}
      className={`${className} object-contain`}
    />
  );
}
