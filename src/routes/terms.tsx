import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const TITLE = "Terms and Conditions | Kite International Services";
const DESCRIPTION =
  "Read the terms and conditions that apply when using Kite International Services student services and partner referrals.";

export const Route = createFileRoute("/terms")({
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
  component: () => (
    <LegalPage
      title="Terms and Conditions"
      intro="These terms govern your use of the Kite International Services website and our student service referrals."
      sections={[
        {
          h: "Use of our services",
          p: "Kite International Services connects students with third-party providers for education loans, money transfer, forex, accommodation, insurance, student ID cards and SIM cards. We facilitate introductions and support; the final terms of any product are set by the partner you choose.",
        },
        {
          h: "Information accuracy",
          p: "We make every effort to keep partner information current, including interest rates, coverage and availability. Details may change without notice, so please confirm final terms directly with the partner before committing.",
        },
        {
          h: "Your responsibilities",
          p: "You agree to provide accurate personal information in enquiry forms and to use the site only for lawful purposes related to your study abroad plans.",
        },
        {
          h: "Partner relationships",
          p: "We may receive a referral fee from partners when you proceed with their product. This never changes the price you pay and does not affect the guidance we provide.",
        },
        {
          h: "Contact",
          p: "For any questions about these terms, write to us at info@kiteinternationals.com.",
        },
      ]}
    />
  ),
});