import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { destinations, indianStates } from "@/data/services";

const fieldClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

export function EnquiryForm({ serviceName }: { serviceName: string }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="enquiry" className="scroll-mt-24">
      <div className="container-page">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Provide your details
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This will help us share information on how to get started with {serviceName}.
          </p>

          {submitted ? (
            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-brand-soft p-5">
              <Check className="mt-0.5 size-5 shrink-0 text-brand" />
              <p className="text-sm text-foreground">
                Thanks — your enquiry has been recorded. A Kite International advisor will get in
                touch with you shortly.
              </p>
            </div>
          ) : (
            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label className={labelClass} htmlFor="destination">
                  Select destination <span className="text-brand">*</span>
                </label>
                <select id="destination" required className={fieldClass} defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  {destinations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="firstName">
                    First name <span className="text-brand">*</span>
                  </label>
                  <input id="firstName" required className={fieldClass} placeholder="First name" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="lastName">
                    Last name <span className="text-brand">*</span>
                  </label>
                  <input id="lastName" required className={fieldClass} placeholder="Last name" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    Email address <span className="text-brand">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className={fieldClass}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="mobile">
                    Mobile number <span className="text-brand">*</span>
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    required
                    className={fieldClass}
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="city">
                    City <span className="text-brand">*</span>
                  </label>
                  <input id="city" required className={fieldClass} placeholder="City" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="state">
                    State <span className="text-brand">*</span>
                  </label>
                  <select id="state" required className={fieldClass} defaultValue="">
                    <option value="" disabled>
                      Select State
                    </option>
                    {indianStates.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl bg-surface p-5">
                <Checkbox required>
                  I agree to Kite International Services{" "}
                  <Link to="/terms" className="font-medium text-brand underline-offset-2 hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-medium text-brand underline-offset-2 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  <span className="text-brand">*</span>
                </Checkbox>
                <Checkbox>
                  Please contact me by phone, email or SMS to assist with my enquiry.
                </Checkbox>
                <Checkbox>
                  I'd love to hear about special promotions and trusted partner offerings from Kite
                  International Services.
                </Checkbox>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Kite International Services takes your privacy seriously. Please read our{" "}
                <Link to="/privacy" className="text-brand underline-offset-2 hover:underline">
                  personal information collection statement
                </Link>{" "}
                to find out more.
              </p>

              <button
                type="submit"
                className="w-full rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:w-auto"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Checkbox({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
      <input
        type="checkbox"
        required={required}
        className="mt-0.5 size-4 shrink-0 accent-[var(--brand)]"
      />
      <span>{children}</span>
    </label>
  );
}