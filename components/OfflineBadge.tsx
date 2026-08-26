"use client";

import { useEffect, useState } from "react";

/**
 * Indicador visual do status de conexão e da disponibilidade offline (PWA).
 * É um Client Component pois depende de eventos do navegador (online/offline)
 * e do estado do Service Worker, que não existem no momento do SSG.
 */
export default function OfflineBadge() {
  const [isOnline, setIsOnline] = useState(true);
  const [swReady, setSwReady] = useState(false);

  useEffect(() => {
    // Estado inicial real do navegador (evita flash incorreto)
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then(() => setSwReady(true))
        .catch(() => setSwReady(false));
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        isOnline
          ? "border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-300"
          : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      ].join(" ")}
      title={
        swReady
          ? "Este app funciona offline: o conteúdo já está salvo neste dispositivo."
          : "Preparando o app para uso offline..."
      }
    >
      <span
        className={[
          "h-2 w-2 rounded-full",
          isOnline ? "bg-brand-500" : "bg-amber-500",
        ].join(" ")}
        aria-hidden="true"
      />
      {isOnline ? (swReady ? "Disponível offline" : "Online") : "Modo offline"}
    </div>
  );
}
