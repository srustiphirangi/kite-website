import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Headphones, ShieldCheck, Sparkles, Users } from "lucide-react";

import heroImage from "@/assets/hero-student.jpg";
import counselingImage from "@/assets/counseling.jpg";
import accommodationImage from "@/assets/accommodation.jpg";
import forexImage from "@/assets/forex-travel.jpg";

import educationLoanImage from "@/assets/education loan.png";
import moneyTransferImage from "@/assets/money transfer.png";
import forexServiceImage from "@/assets/forex.png";
import accommodationServiceImage from "@/assets/accommodation.png";
import healthInsuranceImage from "@/assets/health-insurance.png";
import studentIdImage from "@/assets/student-id.png";
import simCardImage from "@/assets/sim-card.png";

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

/* =========================================================
   SERVICE COVER IMAGES
========================================================= */

const serviceImages: Record<string, string> = {
  "education-loan": educationLoanImage,
  "money-transfer": moneyTransferImage,
  forex: forexServiceImage,
  accommodation: accommodationServiceImage,
  "health-insurance": healthInsuranceImage,
  "student-id-card": studentIdImage,
  "sim-card": simCardImage,
};

/* =========================================================
   ANIMATED STATISTICS
========================================================= */

const stats = [
  { value: 7, suffix: "", label: "Essential services" },
  { value: 30, suffix: "+", label: "Trusted partners" },
  { value: 10, suffix: "+", label: "Study destinations" },
  { value: 24, suffix: "/7", label: "Student support" },
];

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setCount(0);
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setCount(0);
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const duration = 1400;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value]);

  return (
    <div ref={ref}>
      <p className="font-display text-3xl font-semibold text-primary sm:text-4xl">
        {count}
        {suffix}
      </p>

      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

/* =========================================================
   SERVICE CARD REPEATING ANIMATION
========================================================= */

function ServiceCardAnimation({ children, delay }: { children: React.ReactNode; delay: number }) {
  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsVisible(false);

          requestAnimationFrame(() => {
            setIsVisible(true);
          });
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={isVisible ? "service-card-visible" : "service-card-hidden"}
      style={
        {
          "--service-delay": `${delay}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/* =========================================================
   WHY KITE
========================================================= */

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

/* =========================================================
   HOME PAGE
========================================================= */

function Index() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-border bg-surface">
        <div className="container-page grid gap-10 py-8 sm:gap-12 sm:py-10 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-8">
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

            <div className="mt-8 flex flex-wrap gap-3 sm:mt-9">
              <Link
                to="/enquiry"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:shadow-lift"
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
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 sm:mt-10">
              {["No hidden fees", "Verified partners", "Free guidance"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="size-4 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-lift">
              <img
                src={heroImage}
                alt="International student on a university campus holding a laptop"
                width={1280}
                height={1280}
                className="h-[22rem] w-full object-cover object-top sm:h-[30rem] lg:h-[calc(100vh-12rem)] lg:min-h-[34rem] lg:max-h-[48rem]"
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

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="border-b border-border bg-background">
        <div className="container-page grid grid-cols-2 gap-8 py-10 lg:grid-cols-4 lg:py-14">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <AnimatedStat value={s.value} suffix={s.suffix} label={s.label} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

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
              const image = serviceImages[s.slug];

              return (
                <ServiceCardAnimation key={s.slug} delay={i * 120}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-lift">
                    {/* SERVICE COVER IMAGE */}

                    <div className="h-52 w-full overflow-hidden bg-surface">
                      {image ? (
                        <img
                          src={image}
                          alt={`${s.name} service`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="grid h-full place-items-center">
                          <Icon className="size-12 text-brand" />
                        </div>
                      )}
                    </div>

                    {/* SERVICE CONTENT */}

                    <div className="flex flex-1 flex-col p-7">
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
                          Enquiry Now
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
                    </div>
                  </article>
                </ServiceCardAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY STUDENTS CHOOSE KITE
      ===================================================== */}

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

      {/* =====================================================
          FREE COUNSELING
      ===================================================== */}

      <section className="py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border shadow-lift">
              <img
                src={counselingImage}
                alt="Education counselor guiding students"
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
              insurance options that fit your destination and budget.
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
              to="/enquiry"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              Free Consultation
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SETTLED IN
      ===================================================== */}

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
            <Reveal>
              <article className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <img
                  src={accommodationImage}
                  alt="Bright modern student accommodation"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="p-8">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Verified student accommodation
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Compare student residences and apartments near your campus with transparent
                    pricing.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <img
                  src={forexImage}
                  alt="Passport and foreign currency"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="p-8">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Forex & money transfer
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Live rates, low fees and fast transfers for fees, deposits and living costs.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="py-16 lg:py-24">
        <div className="container-page">
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-primary px-7 py-14 text-center shadow-lift sm:px-14">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-primary-foreground sm:text-4xl">
                Ready to get started?
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/75">
                Get personalized guidance and choose the right student services for your study
                abroad journey.
              </p>

              <Link
                to="/enquiry"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                Enquire Now
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SERVICE ANIMATION
      ===================================================== */}

      <style>
        {`
          @keyframes servicePopIn {
            0% {
              opacity: 0;
              transform: translateY(45px) scale(0.88);
              filter: blur(3px);
            }

            60% {
              opacity: 1;
              transform: translateY(-8px) scale(1.03);
              filter: blur(0);
            }

            80% {
              transform: translateY(3px) scale(0.99);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          .service-card-hidden {
            opacity: 0;
            transform: translateY(45px) scale(0.88);
            filter: blur(3px);
          }

          .service-card-visible {
            opacity: 1;
            animation: servicePopIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
            animation-delay: var(--service-delay);
            will-change: transform, opacity, filter;
          }

          @media (prefers-reduced-motion: reduce) {
            .service-card-hidden,
            .service-card-visible {
              opacity: 1;
              transform: none;
              filter: none;
              animation: none;
            }
          }
        `}
      </style>
    </div>
  );
}
