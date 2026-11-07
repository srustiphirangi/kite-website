
import { ArrowUpRight, Check, Star } from "lucide-react";
import type { Partner } from "@/data/services";

export function PartnerCard({
  partner,
  cta,
}: {
  partner: Partner;
  cta: string;
}) {
  const isCredila = partner.name === "Credila Financial Services";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-foreground">
          {partner.name}
        </h3>

        <div
          className="flex shrink-0 gap-0.5 text-green-500"
          aria-label="5 out of 5 rating"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-current" />
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {partner.desc}
      </p>

      {partner.long && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {partner.long}
        </p>
      )}

      {partner.bestFor && (
        <p className="mt-4 rounded-xl bg-surface p-3 text-sm text-foreground">
          <span className="font-semibold">Best for: </span>
          <span className="text-muted-foreground">{partner.bestFor}</span>
        </p>
      )}

      {partner.interestRate && (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            Interest rate:{" "}
          </span>
          {partner.interestRate}
        </p>
      )}

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Countries
        </p>

        <ul className="mt-2 flex flex-wrap gap-1.5">
          {partner.countries.map((country) => (
            <li
              key={country}
              className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground"
            >
              {country}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Key features
        </p>

        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {partner.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-foreground"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-brand" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {partner.why && (
        <dl className="mt-5 space-y-2 border-t border-border pt-4">
          {partner.why.map((item) => (
            <div key={item.t} className="text-sm">
              <dt className="inline font-semibold text-foreground">
                {item.t}:{" "}
              </dt>
              <dd className="inline text-muted-foreground">{item.d}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-6 flex flex-wrap gap-3 pt-2">
        <a
          href={partner.url ?? "#enquiry"}
          target={partner.url ? "_blank" : undefined}
          rel={partner.url ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:shadow-lift"
        >
          {isCredila ? "Apply with Credila" : cta}
          <ArrowUpRight className="size-4" />
        </a>

        <a
          href="#enquiry"
          className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
        >
          View details
        </a>
      </div>
    </article>
  );
}
