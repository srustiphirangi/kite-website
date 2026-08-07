import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { services } from "@/data/services";
import { serviceIcon } from "./icons";
import logoAsset from "@/assets/kite-logo.jpeg.asset.json";

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
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logoAsset.url}
            alt="Kite International Services logo"
            width={40}
            height={40}
            className="size-10 rounded-xl object-contain"
          />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-base font-semibold text-foreground">
              Kite International
            </span>
            <span className="block text-xs text-muted-foreground">Student Services</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
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
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
            >
              Services
              <ChevronDown
                className={`size-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
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
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/services/$slug"
            params={{ slug: "education-loan" }}
            hash="enquiry"
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
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

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
                activeProps={{ className: "bg-accent text-foreground" }}
              >
                {s.name}
              </Link>
            ))}
            <MobileLink to="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </MobileLink>
            <Link
              to="/services/$slug"
              params={{ slug: "education-loan" }}
              hash="enquiry"
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

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
      activeProps={{ className: "bg-accent text-foreground" }}
    >
      {children}
    </Link>
  );
}

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
      activeProps={{ className: "bg-accent text-foreground" }}
    >
      {children}
    </Link>
  );
}