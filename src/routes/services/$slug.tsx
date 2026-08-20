import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

import educationLoanImage from "@/assets/education loan.png";
import moneyTransferImage from "@/assets/money transfer.png";
import forexServiceImage from "@/assets/forex.png";
import accommodationServiceImage from "@/assets/accommodation.png";
import healthInsuranceImage from "@/assets/health-insurance.png";
import studentIdImage from "@/assets/student-id.png";
import simCardImage from "@/assets/sim-card.png";

import { getService, services, type Service } from "@/data/services";
import { serviceIcon } from "@/components/site/icons";
import { PartnerCard } from "@/components/site/PartnerCard";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Reveal } from "@/components/site/Reveal";

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

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);

    if (!service) {
      throw notFound();
    }

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
  const { service } = Route.useLoaderData() as {
    service: Service;
  };

  const Icon = serviceIcon(service.icon);

  const serviceImage = serviceImages[service.slug];

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="pb-8">
      {/* =====================================================
          SERVICE HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-border">
        {/* =================================================
            BACKGROUND IMAGE
        ================================================= */}

        {serviceImage && (
          <div className="absolute inset-0">
            <img
              src={serviceImage}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center"
            />

            {/* Light overlay - keeps image clearly visible */}
            <div className="absolute inset-0 bg-white/35" />

            {/* Readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/35 to-white/15" />
          </div>
        )}

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div className="relative z-10">
          <div className="container-page py-10 sm:py-12 lg:py-16">
            {/* Breadcrumb */}

            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm text-muted-foreground"
            >
              <Link to="/" className="transition-colors hover:text-brand">
                Home
              </Link>

              <ChevronRight className="size-4" />

              <span className="font-medium text-foreground">{service.name}</span>
            </nav>

            {/* =================================================
                MAIN HERO
            ================================================= */}

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <Reveal>
                <div className="max-w-3xl">
                  {/* Student Service Badge */}

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand shadow-sm backdrop-blur-md">
                    <Icon className="size-4" />
                    Student service
                  </span>

                  {/* Title */}

                  <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    {service.title}
                  </h1>

                  {/* Description */}

                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                    {service.tagline}
                  </p>

                  {/* Buttons */}

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
                      className="inline-flex items-center rounded-full border border-border bg-white/90 px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white"
                    >
                      Explore Partners
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* =================================================
                  KEY BENEFITS
              ================================================= */}

              <Reveal delay={120}>
                <div className="rounded-3xl border border-white/90 bg-white/88 p-6 shadow-lift backdrop-blur-xl sm:p-8 lg:p-9">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                      <Icon className="size-5" />
                    </span>

                    <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                      Key Benefits
                    </h2>
                  </div>

                  <ul className="mt-6 grid gap-4">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground sm:text-base"
                      >
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft">
                          <Check className="size-3.5 text-brand" />
                        </span>

                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PARTNER COMPANIES
      ===================================================== */}

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
            {service.partners.map((partner, index) => (
              <Reveal key={partner.name} delay={(index % 2) * 80}>
                <PartnerCard partner={partner} cta={service.partnerCta} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          GET STARTED
      ===================================================== */}

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="container-page">
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-primary px-6 py-10 text-center shadow-lift sm:px-10 sm:py-12 lg:px-16">
              <h2 className="text-2xl font-semibold text-primary-foreground sm:text-3xl">
                Ready to get started?
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
                Tell us a few details about your plans and our team will help you choose the right{" "}
                {service.name.toLowerCase()} option.
              </p>

              <a
                href="#enquiry"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                Get Started
                <ArrowRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          ENQUIRY FORM
      ===================================================== */}

      <div id="enquiry">
        <EnquiryForm serviceName={service.name} />
      </div>

      {/* =====================================================
          OTHER SERVICES
      ===================================================== */}

      <section className="py-16 lg:py-24">
        <div className="container-page">
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Explore other services
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((otherService) => {
              const OtherIcon = serviceIcon(otherService.icon);

              return (
                <Link
                  key={otherService.slug}
                  to="/services/$slug"
                  params={{ slug: otherService.slug }}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                    <OtherIcon className="size-5" />
                  </span>

                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {otherService.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {otherService.short}
                  </p>

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
