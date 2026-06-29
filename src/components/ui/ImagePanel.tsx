import Image from "next/image";

type ImagePanelProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

export function ImagePanel({
  src,
  alt,
  priority = false,
  className = "",
  imageClassName = "",
}: ImagePanelProps) {
  return (
    <div
      className={`relative isolate overflow-hidden rounded-[2rem] border border-white/35 bg-[var(--limoune-sand)] shadow-[0_30px_80px_rgba(61,37,24,0.16)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={`object-cover ${imageClassName}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(61,37,24,0.36),rgba(255,248,238,0.08)_42%,rgba(216,118,62,0.24))]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-60 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_22%),radial-gradient(circle_at_80%_70%,white_0,transparent_18%)]" />
    </div>
  );
}
