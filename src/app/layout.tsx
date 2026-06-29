import type { Metadata } from "next";
import { TrackingScripts } from "@/components/analytics/TrackingScripts";
import { CinematicRuntime } from "@/components/cinematic/CinematicRuntime";
import { baseUrl } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Domaine Limoune | Destination nature premium près d'Agadir",
    template: "%s | Domaine Limoune",
  },
  description:
    "Domaine Limoune réunit hébergements, réserve africaine, parc animalier, restaurants, Canopy Spa, mariages, événements et expériences près d'Agadir.",
  applicationName: "Domaine Limoune",
  authors: [{ name: "Domaine Limoune" }],
  creator: "Domaine Limoune",
  publisher: "Domaine Limoune",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">
          Aller au contenu principal
        </a>
        {children}
        <CinematicRuntime />
        <TrackingScripts />
      </body>
    </html>
  );
}
