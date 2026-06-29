"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  }
}

export function TrackingEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-track]") : null;

      if (!target) {
        return;
      }

      const action = target.dataset.track;

      if (!action) {
        return;
      }

      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: "limoune_interaction", action, label: target.textContent?.trim() });
      window.fbq?.("trackCustom", "LimouneInteraction", { action });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
