import { createFileRoute } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/enquiry")({
  component: FreeConsultationPage,
});

function FreeConsultationPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container-page">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-brand">
              Free Consultation
            </span>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
              Talk to a Student Services Advisor
            </h1>

            <p className="mt-3 text-base text-muted-foreground">
              Share your details and our team will help you understand the services available for
              your study abroad journey.
            </p>
          </div>

          <EnquiryForm serviceName="Free Consultation" />
        </div>
      </div>
    </main>
  );
}
