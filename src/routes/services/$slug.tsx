import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { getService, services, type Service } from "@/data/services";
import { serviceIcon } from "@/components/site/icons";
import { PartnerCard } from "@/components/site/PartnerCard";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    const title = s ? `${s.title} for Students | Kite International` : "Student Services";
    const description = s?.tagline ?? "Student essential services by Kite International.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: Service };
  const Icon = serviceIcon(service.icon);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="pb-8">
      <section className="border-b border-border bg-surface">
        <div className="container-page py-12 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <Link to="/" className="hover:text-brand">
              Home
            </Link>
            <ChevronRight className="size-4" />
            <span className="text-foreground">{service.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                <Icon className="size-4" />
                Student service
              </span>
              <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.1] text-foreground sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {service.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  Apply Now
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#partners"
                  className="inline-flex items-center rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  Explore Partners
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-xl font-semibold text-foreground">Key Benefits</h2>
              <ul className="mt-5 grid gap-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft">
                      <Check className="size-3 text-brand" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="scroll-mt-24 py-16 lg:py-24">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Our Partner Companies
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Compare trusted {service.name.toLowerCase()} providers and choose the one that fits
              your plans best.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {service.partners.map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) * 80}>
                <PartnerCard partner={p} cta={service.partnerCta} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EnquiryForm serviceName={service.name} />

      <section className="py-16 lg:py-24">
        <div className="container-page">
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Explore other services
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => {
              const OtherIcon = serviceIcon(s.icon);
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                    <OtherIcon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}