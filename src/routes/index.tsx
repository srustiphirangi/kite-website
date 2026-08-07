import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Headphones, ShieldCheck, Sparkles, Users } from "lucide-react";
import heroImage from "@/assets/hero-student.jpg";
import counselingImage from "@/assets/counseling.jpg";
import accommodationImage from "@/assets/accommodation.jpg";
import forexImage from "@/assets/forex-travel.jpg";
import { services } from "@/data/services";
import { serviceIcon } from "@/components/site/icons";
import { Reveal } from "@/components/site/Reveal";

const TITLE = "Kite International Services | Study Abroad Student Services";
const DESCRIPTION =
  "One-stop student services for studying abroad — education loans, money transfer, forex, accommodation, health insurance, student ID and SIM cards.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const stats = [
  { value: "7", label: "Essential services" },
  { value: "30+", label: "Trusted partners" },
  { value: "10+", label: "Study destinations" },
  { value: "24/7", label: "Student support" },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: "Verified partners only",
    desc: "Every lender, insurer and housing platform we list is vetted for reliability and student-friendly terms.",
  },
  {
    icon: Users,
    title: "Guidance at every step",
    desc: "From your first loan enquiry to your move-in day, an advisor stays with you through the process.",
  },
  {
    icon: Headphones,
    title: "One place for everything",
    desc: "Skip the scattered paperwork — manage loans, forex, insurance and housing from a single dashboard.",
  },
];

function Index() {
  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="container-page grid gap-12 py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
              <Sparkles className="size-4" />
              Your study abroad partner
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
              Your study abroad journey starts here
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              One-stop solution for all your student essential services. From education loans to
              accommodation, we've got you covered.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/services/$slug"
                params={{ slug: "education-loan" }}
                hash="enquiry"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                Free Counseling
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Explore Services
              </a>
              <Link
                to="/dashboard"
                className="inline-flex items-center rounded-full px-2 py-3.5 text-sm font-semibold text-brand underline-offset-4 transition-colors hover:underline"
              >
                Go to Dashboard
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {["No hidden fees", "Verified partners", "Free guidance"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="size-4 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-lift">
              <img
                src={heroImage}
                alt="International student on a university campus holding a laptop"
                width={1280}
                height={1280}
                className="h-[22rem] w-full object-cover object-top sm:h-[28rem] lg:h-[32rem]"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:absolute sm:-bottom-8 sm:left-6 sm:mt-0 sm:w-64 sm:grid-cols-1">
              <div className="rounded-2xl border border-border bg-background p-4 shadow-soft">
                <p className="font-display text-2xl font-semibold text-foreground">7 services</p>
                <p className="text-xs text-muted-foreground">Everything in one place</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container-page grid grid-cols-2 gap-8 py-10 lg:grid-cols-4 lg:py-14">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <p className="font-display text-3xl font-semibold text-primary sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="services" className="scroll-mt-24 py-16 lg:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Our Services</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Comprehensive solutions tailored for international students.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = serviceIcon(s.icon);
              return (
                <Reveal key={s.slug} delay={(i % 3) * 80}>
                  <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-lift">
                    <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                      {s.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.short}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        hash="enquiry"
                        className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:shadow-lift"
                      >
                        Free Counseling
                      </Link>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-brand"
                      >
                        Learn more
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Why students choose Kite
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We handle the essentials so you can focus on your studies.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:shadow-lift">
                  <span className="grid size-12 place-items-center rounded-xl bg-accent text-primary">
                    <w.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border shadow-lift">
              <img
                src={counselingImage}
                alt="Education counselor guiding two students through their study abroad plan"
                width={1280}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-brand-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
              Free counseling
            </span>
            <h2 className="mt-5 text-3xl font-semibold text-foreground sm:text-4xl">
              Talk to an advisor — at no cost
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Share a few details and our team will walk you through loans, forex, housing and
              insurance options that fit your destination and budget. No fees, no obligation.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Personalised service shortlist for your university",
                "Document checklist and timeline planning",
                "Support until you land and settle in",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/services/$slug"
              params={{ slug: "education-loan" }}
              hash="enquiry"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              Free Counseling
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 lg:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Settled in, sorted out
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Housing, money and travel essentials handled before you board your flight.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                img: accommodationImage,
                alt: "Bright modern student apartment with study desk and city view",
                title: "Verified student accommodation",
                desc: "Compare student residences and apartments near your campus with transparent pricing.",
                slug: "accommodation",
              },
              {
                img: forexImage,
                alt: "Student holding a passport, boarding pass and foreign currency notes",
                title: "Forex & money transfer",
                desc: "Live rates, low fees and fast transfers for fees, deposits and living costs.",
                slug: "forex",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 80}>
                <article className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                  <img
                    src={card.img}
                    alt={card.alt}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-7">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {card.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-page">
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-primary px-7 py-14 text-center shadow-lift sm:px-14">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-primary-foreground sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/75">
                Access your personalized dashboard and manage all your student services in one
                place.
              </p>
              <Link
                to="/dashboard"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                Go to Dashboard
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
