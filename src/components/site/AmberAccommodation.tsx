import { useEffect, useRef } from "react";

const PARTNER_UUID = import.meta.env["VITE_AMBER_PARTNER_UUID"] as string;

const WHITELABEL_DOMAIN_URL = import.meta.env[
  "VITE_AMBER_WHITELABEL_DOMAIN_URL"
] as string;

export function AmberAccommodation() {
  const amberIframe = useRef<HTMLIFrameElement | null>(null);

  const amberUrl =
    PARTNER_UUID && WHITELABEL_DOMAIN_URL
      ? `${WHITELABEL_DOMAIN_URL.replace(/\/$/, "")}?partner_id=${encodeURIComponent(
          PARTNER_UUID,
        )}`
      : "";

  useEffect(() => {
    const iframe = amberIframe.current;

    if (!iframe || !amberUrl) return;

    const handleLoad = () => {
      if (!iframe.contentWindow) return;

      const targetOrigin = new URL(amberUrl).origin;

      iframe.contentWindow.postMessage(
        {
          type: "amber_custom_event",
          payload: {
            source: "Kite International Services",
            source_page: window.location.pathname,
          },
        },
        targetOrigin,
      );
    };

    iframe.addEventListener("load", handleLoad);

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, [amberUrl]);

  if (!amberUrl) {
    return (
      <section className="py-12">
        <div className="container-page">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            Amber accommodation integration is not configured yet.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="amber-accommodation"
      className="scroll-mt-24 py-16 lg:py-24"
    >
      <div className="container-page">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Amber Student Accommodation
          </p>

          <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Find your accommodation
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Search student accommodation and explore available properties
            through Amber directly on the Kite website.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
          <iframe
            id="amber-iframe"
            ref={amberIframe}
            src={amberUrl}
            title="Amber Student Accommodation Platform"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            allow="fullscreen"
            className="block min-h-[600px] w-full border-0 sm:min-h-[700px]"
          />
        </div>
      </div>
    </section>
  );
}