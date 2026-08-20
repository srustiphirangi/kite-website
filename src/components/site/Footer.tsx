import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { services } from "@/data/services";
import kiteLogo from "@/assets/kite logo.jpeg";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {/* =====================================================
            COMPANY / LOGO
        ===================================================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={kiteLogo}
              alt="Kite International Services logo"
              width={56}
              height={56}
              loading="lazy"
              className="size-14 object-contain"
            />

            <span className="font-display text-lg font-semibold text-foreground">
              Kite International Services
            </span>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Your one-stop solution for all student essential services. Making your study abroad
            journey seamless.
          </p>
        </div>

        {/* =====================================================
            OUR SERVICES
        ===================================================== */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Our Services
          </h3>

          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* =====================================================
            QUICK LINKS
        ===================================================== */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Quick Links
          </h3>

          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-brand">
                Home
              </Link>
            </li>

            <li>
              <Link to="/dashboard" className="transition-colors hover:text-brand">
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/terms" className="transition-colors hover:text-brand">
                Terms and Conditions
              </Link>
            </li>

            <li>
              <Link to="/privacy" className="transition-colors hover:text-brand">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* =====================================================
            GET IN TOUCH
        ===================================================== */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Get in Touch
          </h3>

          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {/* Primary Email */}

            {/* Gmail */}
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand" />

              <a
                href="mailto:kiteinternationalservices@gmail.com"
                className="transition-colors hover:text-brand"
              >
                kiteinternationalservices@gmail.com
              </a>
            </li>

            {/* Phone / Support */}
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand" />

              <span>Student support, 7 days a week</span>
            </li>

            {/* Location */}
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />

              <span>Serving students across India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* =====================================================
          COPYRIGHT
      ===================================================== */}
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Kite International Services. All rights reserved.</p>

          <p>Study abroad made simple.</p>
        </div>
      </div>
    </footer>
  );
}
