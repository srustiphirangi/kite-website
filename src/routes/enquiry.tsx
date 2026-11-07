
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { services } from "@/data/services";

export const Route = createFileRoute("/enquiry")({
  component: EnquiryPage,
});

function EnquiryPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  if (selectedService) {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="mb-6 text-sm font-medium text-brand hover:underline"
            >
              ← Back to services
            </button>

            <div className="mb-8 text-center">
              <span className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-medium text-brand">
                {selectedService}
              </span>

              <h1 className="mt-4 text-3xl font-semibold text-foreground">
                Tell us how we can help
              </h1>

              <p className="mt-3 text-muted-foreground">
                Share your details and our team will guide you through the next steps.
              </p>
            </div>

            <EnquiryForm serviceName={selectedService} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container-page">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-medium text-brand">
              Kite Connects
            </span>

            <h1 className="mt-4 text-3xl font-semibold text-foreground sm:text-5xl">
              How can we help you?
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Select a service to continue with your enquiry.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <button
                key={service.slug}
                type="button"
                onClick={() => setSelectedService(service.name)}
                className="group flex min-h-48 flex-col rounded-2xl border border-border bg-background p-6 text-left transition hover:border-brand hover:shadow-md"
              >
                <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-muted text-brand">
                  <BriefcaseBusiness className="size-6" />
                </span>

                <span className="text-lg font-semibold text-foreground">
                  {service.name}
                </span>

                <span className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  {service.short}
                </span>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand">
                  Select service
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border p-6 text-center">
            <h2 className="text-lg font-semibold text-foreground">
              Need general guidance?
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Choose a free consultation instead.
            </p>

            <button
              type="button"
              onClick={() => setSelectedService("Free Consultation")}
              className="mt-4 inline-flex items-center gap-2 font-medium text-brand hover:underline"
            >
              Free Consultation
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
