import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { destinations, indianStates } from "@/data/services";
import { supabase } from "@/lib/supabase";

const GOOGLE_LEADS_API_URL =
  "https://script.google.com/macros/s/AKfycbzGN_ljYJ97nCpdSs5cU6Zb9NO5qEMV-LVtPb2faZNbFE396n7nNNR7LmUIhuIRnQp_Cw/exec";

type ServiceField = {
  name: string;
  label: string;
  type?: "text" | "date" | "select";
  placeholder?: string;
  options?: string[];
  optional?: boolean;
};

const fieldClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

const SERVICE_FIELDS: Record<string, ServiceField[]> = {
  "education-loan": [
    {
      name: "university",
      label: "University name",
      placeholder: "University name",
    },
    {
      name: "course_name",
      label: "Course name",
      placeholder: "Course name",
    },
    {
      name: "course_level",
      label: "Course level",
      type: "select",
      options: ["Undergraduate", "Postgraduate", "PhD", "Other"],
    },
    {
      name: "intake",
      label: "Intake",
      placeholder: "e.g. September 2026",
    },
    {
      name: "loan_amount_required",
      label: "Loan amount required",
      placeholder: "Amount required",
    },
  ],

  "money-transfer": [
    {
      name: "transfer_purpose",
      label: "Purpose of transfer",
      placeholder: "Purpose of transfer",
    },
    {
      name: "bank_account_available",
      label: "Bank account available?",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      name: "preferred_contact_method",
      label: "Preferred contact method",
      type: "select",
      options: ["Phone", "Email", "SMS", "WhatsApp"],
    },
  ],

  accommodation: [
    {
      name: "university",
      label: "University",
      placeholder: "University name",
    },
    {
      name: "city",
      label: "City",
      placeholder: "City",
    },
    {
      name: "accommodation_type",
      label: "Preferred accommodation type",
      type: "select",
      options: ["Private room", "Shared room", "Studio", "Apartment", "Other"],
    },
    {
      name: "move_in_date",
      label: "Move-in date",
      type: "date",
    },
    {
      name: "number_of_students",
      label: "Number of students",
      placeholder: "Number of students",
    },
    {
      name: "preferred_location",
      label: "Preferred location",
      placeholder: "Preferred area/location",
    },
  ],

  forex: [
    {
      name: "currency_required",
      label: "Currency required",
      placeholder: "e.g. USD, GBP, EUR",
    },
    {
      name: "amount_required",
      label: "Amount required",
      placeholder: "Amount required",
    },
    {
      name: "travel_date",
      label: "Travel / departure date",
      type: "date",
    },
    {
      name: "forex_type",
      label: "Cash / Forex card / both",
      type: "select",
      options: ["Cash", "Forex card", "Both"],
    },
    {
      name: "forex_card_required",
      label: "Forex card required?",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      name: "existing_forex_card",
      label: "Existing forex card?",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      name: "preferred_contact_method",
      label: "Preferred contact method",
      type: "select",
      options: ["Phone", "Email", "SMS", "WhatsApp"],
    },
  ],

  "health-insurance": [
    {
      name: "university",
      label: "University",
      placeholder: "University name",
    },
    {
      name: "course",
      label: "Course",
      placeholder: "Course name",
    },
    {
      name: "course_duration",
      label: "Course duration",
      placeholder: "e.g. 2 years",
    },
    {
      name: "intake",
      label: "Intake",
      placeholder: "e.g. September 2026",
    },
    {
      name: "coverage_type",
      label: "Individual / family coverage",
      type: "select",
      options: ["Individual", "Family"],
    },
    {
      name: "existing_insurance",
      label: "Existing insurance?",
      type: "select",
      options: ["Yes", "No"],
    },
  ],

  "student-id-card": [
    {
      name: "university",
      label: "University",
      placeholder: "University name",
    },
    {
      name: "student_status",
      label: "Student status",
      type: "select",
      options: ["Admitted", "Currently studying", "Incoming student", "Other"],
    },
    {
      name: "course",
      label: "Course",
      placeholder: "Course name",
    },
    {
      name: "student_university_id",
      label: "Student ID / University ID",
      placeholder: "Enter ID if applicable",
      optional: true,
    },
    {
      name: "expected_travel_date",
      label: "Expected travel date",
      type: "date",
    },
  ],

  "sim-card": [
    {
      name: "mobile_network_preference",
      label: "Mobile network preference",
      placeholder: "Enter preference, if any",
      optional: true,
    },
    {
      name: "sim_type",
      label: "Physical SIM / eSIM",
      type: "select",
      options: ["Physical SIM", "eSIM"],
    },
    {
      name: "number_before_travel",
      label: "Need number before travelling?",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      name: "expected_travel_date",
      label: "Expected travel date",
      type: "date",
    },
    {
      name: "data_requirement",
      label: "Data requirement",
      placeholder: "e.g. 20 GB/month",
    },
    {
      name: "call_requirement",
      label: "Call requirement",
      placeholder: "e.g. Unlimited / 100 minutes",
    },
    {
      name: "preferred_plan_duration",
      label: "Preferred plan duration",
      placeholder: "e.g. 30 days / 3 months",
    },
  ],
};

function normalizeServiceName(serviceName: string) {
  return serviceName.toLowerCase().trim().replace(/\s+/g, "-");
}

function getServiceFields(serviceName: string) {
  const key = normalizeServiceName(serviceName);
  return SERVICE_FIELDS[key] || [];
}

function getGoogleSheetService(serviceName: string) {
  const serviceKey = normalizeServiceName(serviceName);

  const serviceMap: Record<string, string> = {
    "free-consultation": "Free Consultation",
    "education-loan": "Education Loan",
    accommodation: "Accommodation",
    "money-transfer": "Money Transfer",
    forex: "Forex",
    "health-insurance": "Health Insurance",
    "student-id-card": "Student ID Card",
    "sim-card": "SIM Card",
  };

  return serviceMap[serviceKey] || serviceName;
}

export function EnquiryForm({ serviceName }: { serviceName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [destination, setDestination] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [serviceValues, setServiceValues] = useState<Record<string, string>>({});

  const serviceKey = normalizeServiceName(serviceName);
  const serviceFields = getServiceFields(serviceName);

  const updateServiceValue = (name: string, value: string) => {
    setServiceValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !destination ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !mobile.trim() ||
      !city.trim() ||
      !state
    ) {
      return "Please complete all required basic details before submitting.";
    }

    if (!termsAccepted) {
      return "Please accept the Terms and Conditions and Privacy Policy.";
    }

    for (const field of serviceFields) {
      const value = serviceValues[field.name];

      if (!field.optional && !value?.trim()) {
        return `Please complete: ${field.label}.`;
      }
    }

    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError(null);

    const validationError = validateForm();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * =====================================================
       * 1. SAVE LEAD TO SUPABASE
       * =====================================================
       *
       * Supabase remains the primary database.
       */

      /*
       * Keep the common Supabase `course` column useful where the
       * selected service actually has a course field.
       *
       * Do NOT put the service name into `course` for services such
       * as Money Transfer, Forex, Accommodation, etc.
       * Their service-specific values remain inside `service_details`.
       */
      const supabaseCourse =
        serviceKey === "education-loan"
          ? serviceValues["course_name"] || ""
          : serviceKey === "health-insurance"
            ? serviceValues["course"] || ""
            : serviceKey === "student-id-card"
              ? serviceValues["course"] || ""
              : "";

      const supabaseServiceDetails = {
        service: serviceName,
        ...serviceValues,
        contact_consent: contactConsent,
        marketing_consent: marketingConsent,
      };

      const { error: supabaseError } = await supabase.from("leads").insert([
        {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: mobile.trim(),
          city: city.trim(),
          state: state,
          country: destination,
          interested_country: destination,
          service: serviceName,
          course: supabaseCourse,
          source: "website",

          message:
            serviceKey === "free-consultation"
              ? "Free Consultation enquiry"
              : `${serviceName} enquiry`,

          service_details: supabaseServiceDetails,
        },
      ]);

      if (supabaseError) {
        console.error("Supabase enquiry error:", supabaseError);

        throw new Error("Unable to submit your enquiry right now.");
      }

      /*
       * =====================================================
       * 2. DETERMINE GOOGLE SHEET
       * =====================================================
       */

      const sheetService = getGoogleSheetService(serviceName);

      /*
       * =====================================================
       * 3. PREPARE GOOGLE SHEETS SERVICE DETAILS
       * =====================================================
       *
       * These names match the Apps Script mappings.
       */

      const googleServiceDetails: Record<string, string> = {
        ...serviceValues,

        // Education Loan
        university: serviceValues["university"] || "",

        course: serviceValues["course"] || serviceValues["course_name"] || "",

        course_name: serviceValues["course_name"] || "",

        course_level: serviceValues["course_level"] || "",

        intake: serviceValues["intake"] || "",

        loan_amount: serviceValues["loan_amount"] || serviceValues["loan_amount_required"] || "",

        loan_amount_required: serviceValues["loan_amount_required"] || "",

        // Money Transfer
        purpose: serviceValues["purpose"] || serviceValues["transfer_purpose"] || "",

        purpose_of_transfer:
          serviceValues["purpose_of_transfer"] || serviceValues["transfer_purpose"] || "",

        transfer_purpose: serviceValues["transfer_purpose"] || "",

        bank_account_available: serviceValues["bank_account_available"] || "",

        preferred_contact_method: serviceValues["preferred_contact_method"] || "",

        // Accommodation
        accommodation_city: serviceValues["city"] || "",

        accommodation_type:
          serviceValues["accommodation_type"] ||
          serviceValues["preferred_accommodation_type"] ||
          "",

        preferred_accommodation_type:
          serviceValues["preferred_accommodation_type"] ||
          serviceValues["accommodation_type"] ||
          "",

        move_in_date: serviceValues["move_in_date"] || "",

        number_of_students: serviceValues["number_of_students"] || "",

        preferred_location: serviceValues["preferred_location"] || "",

        // Forex
        currency_required: serviceValues["currency_required"] || "",

        amount_required: serviceValues["amount_required"] || "",

        travel_date: serviceValues["travel_date"] || serviceValues["departure_date"] || "",

        departure_date: serviceValues["departure_date"] || serviceValues["travel_date"] || "",

        payment_method: serviceValues["payment_method"] || serviceValues["forex_type"] || "",

        cash_forex_card: serviceValues["cash_forex_card"] || serviceValues["forex_type"] || "",

        forex_type: serviceValues["forex_type"] || "",

        forex_card_required: serviceValues["forex_card_required"] || "",

        existing_forex_card: serviceValues["existing_forex_card"] || "",

        // Health Insurance
        course_duration: serviceValues["course_duration"] || "",

        coverage: serviceValues["coverage"] || serviceValues["coverage_type"] || "",

        individual_family_coverage:
          serviceValues["individual_family_coverage"] || serviceValues["coverage_type"] || "",

        coverage_type: serviceValues["coverage_type"] || "",

        existing_insurance: serviceValues["existing_insurance"] || "",

        // Student ID Card
        student_status: serviceValues["student_status"] || "",

        student_id: serviceValues["student_id"] || serviceValues["student_university_id"] || "",

        student_university_id: serviceValues["student_university_id"] || "",

        university_id:
          serviceValues["university_id"] || serviceValues["student_university_id"] || "",

        expected_travel_date: serviceValues["expected_travel_date"] || "",

        // SIM Card
        network_preference:
          serviceValues["network_preference"] || serviceValues["mobile_network_preference"] || "",

        mobile_network_preference: serviceValues["mobile_network_preference"] || "",

        sim_type: serviceValues["sim_type"] || "",

        need_number_before_travelling:
          serviceValues["need_number_before_travelling"] ||
          serviceValues["number_before_travel"] ||
          "",

        number_before_travel:
          serviceValues["number_before_travel"] ||
          serviceValues["need_number_before_travelling"] ||
          "",

        data_requirement: serviceValues["data_requirement"] || "",

        call_requirement: serviceValues["call_requirement"] || "",

        plan_duration:
          serviceValues["plan_duration"] || serviceValues["preferred_plan_duration"] || "",

        preferred_plan_duration:
          serviceValues["preferred_plan_duration"] || serviceValues["plan_duration"] || "",
      };

      /*
       * =====================================================
       * 4. GOOGLE APPS SCRIPT PAYLOAD
       * =====================================================
       */

      const googlePayload = {
        service: sheetService,

        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: mobile.trim(),
        city: city.trim(),
        state: state,

        interested_country: destination,
        destination_country: destination,

        service_details: googleServiceDetails,
      };

      /*
       * =====================================================
       * 5. SEND TO GOOGLE SHEETS
       * =====================================================
       *
       * Google Sheets is secondary.
       *
       * Supabase has already successfully stored the lead.
       * Therefore a temporary Google Sheets problem will NOT
       * make the website tell the user that their lead failed.
       */

      try {
        await fetch(GOOGLE_LEADS_API_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(googlePayload),
        });

        console.log("Lead sent to Google Sheets:", sheetService);
      } catch (googleError) {
        console.error("Google Sheets submission error:", googleError);
      }

      /*
       * =====================================================
       * 6. SHOW SUCCESS
       * =====================================================
       */

      setSubmitted(true);
    } catch (error) {
      console.error("Enquiry submission error:", error);

      setFormError("Unable to submit your enquiry right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="enquiry"
      className="mx-auto w-full max-w-5xl rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-8"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Provide your details
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          This will help us share information on how to get started with {serviceName}.
        </p>
      </div>

      {submitted ? (
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-5">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
            <Check className="h-4 w-4" />
          </div>

          <div>
            <p className="font-medium text-green-900">
              Thank you — your enquiry has been recorded.
            </p>

            <p className="mt-1 text-sm text-green-800">
              A member of the Kite International team will be in touch with you shortly.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* BASIC DETAILS */}

          <div className="space-y-5">
            <div>
              <label className={labelClass}>Destination country *</label>

              <select
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className={fieldClass}
              >
                <option value="">Select</option>

                {destinations.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>First name *</label>

                <input
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="First name"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Last name *</label>

                <input
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="Last name"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Email address *</label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Mobile number *</label>

                <input
                  type="tel"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                  placeholder="+91 00000 00000"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>City *</label>

                <input
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="City"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>State *</label>

                <select
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  className={fieldClass}
                >
                  <option value="">Select State</option>

                  {indianStates.map((stateName) => (
                    <option key={stateName} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SERVICE-SPECIFIC QUESTIONS */}

          {serviceFields.length > 0 && (
            <div className="border-t border-border pt-7">
              <h3 className="mb-5 text-xl font-semibold text-foreground">{serviceName} details</h3>

              <div className="grid gap-5 sm:grid-cols-2">
                {serviceFields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className={labelClass}>
                      {field.label}
                      {!field.optional && " *"}
                    </label>

                    {field.type === "select" ? (
                      <select
                        value={serviceValues[field.name] || ""}
                        onChange={(event) => updateServiceValue(field.name, event.target.value)}
                        className={fieldClass}
                      >
                        <option value="">Select</option>

                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type || "text"}
                        value={serviceValues[field.name] || ""}
                        onChange={(event) => updateServiceValue(field.name, event.target.value)}
                        placeholder={field.placeholder}
                        className={fieldClass}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONSENTS */}

          <div className="rounded-2xl bg-muted/50 p-5">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input"
              />

              <span className="text-sm leading-6 text-muted-foreground">
                I agree to Kite International Services{" "}
                <a href="/terms" className="text-brand hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-brand hover:underline">
                  Privacy Policy
                </a>{" "}
                *
              </span>
            </label>

            <label className="mt-4 flex items-start gap-3">
              <input
                type="checkbox"
                checked={contactConsent}
                onChange={(event) => setContactConsent(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input"
              />

              <span className="text-sm leading-6 text-muted-foreground">
                Please contact me by phone, email or SMS to assist with my enquiry.
              </span>
            </label>

            <label className="mt-4 flex items-start gap-3">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(event) => setMarketingConsent(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input"
              />

              <span className="text-sm leading-6 text-muted-foreground">
                I'd love to hear about special promotions and trusted partner offerings from Kite
                International Services.
              </span>
            </label>
          </div>

          {/* FORM ERROR */}

          {formError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {formError}
            </div>
          )}

          {/* SUBMIT */}

          <div>
            <p className="mb-5 text-xs leading-5 text-muted-foreground">
              Kite International Services takes your privacy seriously. Please review our privacy
              policy for more information about how your enquiry information is handled.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-brand px-7 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}