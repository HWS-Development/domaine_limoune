import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[var(--limoune-bg)] px-5 text-center text-[var(--limoune-brown)]">
      <div className="max-w-xl border border-[var(--limoune-brown)]/10 bg-white/70 p-8 shadow-[0_24px_80px_rgba(16,36,58,0.1)]">
        <p className="section-kicker">404</p>
        <h1 className="mt-4 font-serif text-5xl">Page introuvable</h1>
        <p className="mt-4 text-base leading-7 text-[var(--limoune-muted)]">
          {"Cette page n'existe pas encore ou a été déplacée."}
        </p>
        <Link className="mt-8 inline-flex min-h-11 items-center bg-[var(--limoune-brown)] px-5 text-sm font-bold tracking-[0.18em] text-[var(--limoune-ivory)] uppercase" href="/fr">
          {"Retour à l'accueil"}
        </Link>
      </div>
    </main>
  );
}
