import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { serviceIcon } from "@/components/site/icons";
import { Reveal } from "@/components/site/Reveal";

const TITLE = "Student Dashboard | Kite International Services";
const DESCRIPTION =
  "Manage your education loan, forex, accommodation, insurance and connectivity enquiries from one student dashboard.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-12 lg:py-16">
          <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">Your dashboard</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Pick a service to continue where you left off, or start a new enquiry with one of our
            verified partners.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcon(s.icon);
            return (
              <Reveal key={s.slug} delay={(i % 3) * 70}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {s.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.short}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Open service
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}