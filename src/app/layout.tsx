import type { Metadata } from "next";
import { TrackingScripts } from "@/components/analytics/TrackingScripts";
import { CinematicRuntime } from "@/components/cinematic/CinematicRuntime";
import { SkipLink } from "@/components/layout/SkipLink";
import { baseUrl } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Safari Experience près d’Agadir | Le Domaine Limoune",
    template: "%s | Le Domaine Limoune",
  },
  description:
    "Vivez Le Domaine Limoune près d’Agadir : lodges safari, réserve africaine, parc animalier, restaurants, Canopy Spa, activités, mariages et événements.",
  applicationName: "Le Domaine Limoune",
  authors: [{ name: "Le Domaine Limoune" }],
  creator: "Le Domaine Limoune",
  publisher: "Le Domaine Limoune",
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
        <SkipLink />
        {children}
        <CinematicRuntime />
        <TrackingScripts />
      </body>
    </html>
  );
}
