import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const TITLE = "Privacy Policy | Kite International Services";
const DESCRIPTION =
  "How Kite International Services collects, uses and protects the personal information you share in student service enquiries.";

export const Route = createFileRoute("/privacy")({
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
      title="Privacy Policy"
      intro="Kite International Services takes your privacy seriously. This statement explains what we collect and how we use it."
      sections={[
        {
          h: "Information we collect",
          p: "When you submit an enquiry we collect your name, email address, mobile number, city, state and preferred study destination, along with the service you are interested in.",
        },
        {
          h: "How we use your information",
          p: "We use your details to respond to your enquiry, share relevant partner information, and — where you have agreed — to contact you about promotions and trusted partner offerings.",
        },
        {
          h: "Sharing with partners",
          p: "With your consent we share the details necessary to process your enquiry with the specific partner you select, such as a lender, insurer or accommodation platform.",
        },
        {
          h: "Data security",
          p: "We apply reasonable technical and organisational measures to protect your personal information against unauthorised access, loss or misuse.",
        },
        {
          h: "Your choices",
          p: "You can ask us to update or delete your information, or withdraw marketing consent at any time, by writing to info@kiteinternationals.com.",
        },
      ]}
    />
  ),
});