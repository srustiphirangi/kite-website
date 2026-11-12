
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { services } from "@/data/services";
import { serviceIcon } from "./icons";
import kiteLogo from "@/assets/kite logo.jpeg";

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background/90 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-soft" : "border-b border-border"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-2 sm:gap-4 lg:h-20">
        {/* LOGO + COMPANY NAME */}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 sm:gap-4"
          onClick={() => setOpen(false)}
        >
          <img
            src={kiteLogo}
            alt="Kite International Services logo"
            width={64}
            height={64}
            className="size-12 shrink-0 rounded-xl object-contain sm:size-16"
          />

          <span className="whitespace-nowrap font-display text-[clamp(0.875rem,4.5vw,1.25rem)] font-bold leading-tight text-foreground sm:text-2xl">
            Kite International
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-4 lg:flex">
          <NavLink to="/">Home</NavLink>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
            >
              Services

              <ChevronDown
                className={`size-4 transition-transform ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-[36rem] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-popover p-3 shadow-lift">
                  {services.map((s) => {
                    const Icon = serviceIcon(s.icon);

                    return (
                      <Link
                        key={s.slug}
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        onClick={() => setServicesOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-accent"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                          <Icon className="size-4" />
                        </span>

                        <span>
                          <span className="block text-sm font-semibold text-foreground">
                            {s.name}
                          </span>

                          <span className="block text-xs leading-snug text-muted-foreground">
                            {s.short}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* GET STARTED + MOBILE MENU */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/enquiry"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:inline-flex"
          >
            Get Started
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent lg:hidden"
          >
            {open ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-page space-y-1 py-4">
            <MobileLink to="/" onClick={() => setOpen(false)}>
              Home
            </MobileLink>

            <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Services
            </p>

            {services.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent"
                activeProps={{
                  className: "bg-accent text-foreground",
                }}
              >
                {s.name}
              </Link>
            ))}

            <Link
              to="/enquiry"
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-brand-foreground"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* =========================================================
   DESKTOP NAV LINK
========================================================= */

function NavLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      className="rounded-lg px-4 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
      activeProps={{
        className: "bg-accent text-foreground",
      }}
    >
      {children}
    </Link>
  );
}

/* =========================================================
   MOBILE LINK
========================================================= */

function MobileLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      activeOptions={{ exact: to === "/" }}
      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent"
      activeProps={{
        className: "bg-accent text-foreground",
      }}
    >
      {children}
    </Link>
  );
}
