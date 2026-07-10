import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { localizedHref, type Cta, type Locale } from "@/lib/content";

type ButtonLinkProps = {
  cta: Cta;
  locale: Locale;
  className?: string;
};

const variants: Record<NonNullable<Cta["variant"]>, string> = {
  primary:
    "bg-[var(--limoune-brown)] text-[var(--limoune-ivory)] shadow-[0_18px_50px_rgba(16,36,58,0.22)] hover:bg-[var(--limoune-black)]",
  secondary:
    "border border-[var(--limoune-brown)]/25 bg-[var(--limoune-ivory)]/80 text-[var(--limoune-brown)] hover:border-[var(--limoune-orange)] hover:bg-white",
  ghost:
    "text-[var(--limoune-brown)] underline decoration-[var(--limoune-orange)]/40 underline-offset-8 hover:decoration-[var(--limoune-orange)]",
};

export function ButtonLink({ cta, locale, className = "" }: ButtonLinkProps) {
  const href = localizedHref(locale, cta.href);
  const variant = cta.variant ?? "primary";
  const classes = `limoune-button group inline-flex min-h-10 items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--limoune-orange)] active:scale-[0.98] ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{cta.label}</span>
      {variant !== "ghost" ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      ) : null}
    </>
  );

  if (href.startsWith("#") || href.startsWith("/assets") || href.startsWith("http")) {
    return (
      <a className={classes} href={href} data-track={cta.track}>
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} data-track={cta.track}>
      {content}
    </Link>
  );
}
