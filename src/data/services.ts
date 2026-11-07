export type Partner = {
  name: string;
  desc: string;
  long?: string;
  bestFor?: string;
  interestRate?: string;
  countries: string[];
  features: string[];
  why?: { t: string; d: string }[];
};

export type Service = {
  slug: string;
  name: string;
  icon: string;
  short: string;
  title: string;
  tagline: string;
  partnerCta: string;
  benefits: string[];
  partners: Partner[];
};

export const services: Service[] = [
  {
    slug: "education-loan",
    name: "Education Loan",
    icon: "GraduationCap",
    short:
      "Get financial assistance for your studies abroad with competitive interest rates",
    title: "Education Loan",
    tagline:
      "Finance your dreams with our trusted education loan partners. Get competitive rates and flexible repayment options.",
    partnerCta: "Visit Partner",
    benefits: [
      "Cover tuition fees and living expenses",
      "Flexible repayment schedules",
      "Competitive interest rates",
      "Tax deductions on interest paid",
      "No prepayment penalties",
      "Quick approval process",
    ],
    partners: [
      {
        name: "Credila Financial Services",
        desc: "Specialized education loan provider focused on helping students study abroad.",
        bestFor: "Students requiring higher education loan amounts",
        interestRate: "As per Credila's prevailing education loan rates",
        countries: ["Australia", "Canada", "USA", "UK", "Ireland"],
        features: [
          "Higher Loan Amount",
          "Doorstep Documentation",
          "Fast Sanction",
          "Flexible Repayment",
        ],
      },
      {
        name: "Axis Bank",
        desc: "Education loans for Indian students planning higher studies abroad with flexible repayment options.",
        bestFor: "Students seeking faster loan approval",
        interestRate: "As per Axis Bank's prevailing education loan rates",
        countries: ["Australia", "Canada", "United States", "United Kingdom", "Germany"],
        features: [
          "Competitive Interest Rates",
          "Quick Loan Processing",
          "Flexible EMI Options",
          "Tax Benefits under Section 80E",
        ],
      },
      {
        name: "ICICI Bank",
        desc: "Education loans for undergraduate and postgraduate students studying at top universities worldwide.",
        bestFor: "Students who want a trusted national bank with wide branch network",
        interestRate: "As per ICICI Bank's prevailing education loan rates",
        countries: ["Australia", "Canada", "United Kingdom", "United States", "Germany"],
        features: [
          "Easy Documentation",
          "Fast Approval",
          "Flexible EMI",
          "Collateral-free options available",
        ],
      },
      {
        name: "Avanse Financial Services",
        desc: "Dedicated education finance company offering loans for study abroad with minimal paperwork.",
        bestFor: "Students needing higher loan amounts with flexible co-applicant options",
        interestRate: "As per Avanse's prevailing education loan rates",
        countries: ["Australia", "Canada", "United Kingdom", "United States", "Ireland"],
        features: [
          "100% Finance Available",
          "Quick Disbursement",
          "No Margin Money Options",
          "Co-applicant Flexibility",
        ],
      },
      {
        name: "Poonawalla Fincorp",
        desc: "Education loans designed for students pursuing degrees at recognized international institutions.",
        bestFor: "Students looking for pre-admission loan support",
        interestRate: "As per Poonawalla Fincorp's prevailing rates",
        countries: ["Australia", "Canada", "United Kingdom", "United States"],
        features: [
          "Competitive Rates",
          "Simple Application",
          "Flexible Tenure",
          "Pre-admission Loans",
        ],
      },
      {
        name: "Union Bank of India",
        desc: "Government-backed education loans with attractive interest rates for study abroad programs.",
        bestFor: "Cost-conscious students preferring public sector bank rates",
        interestRate: "As per Union Bank's prevailing education loan rates",
        countries: ["Australia", "Canada", "United Kingdom", "United States", "Germany"],
        features: [
          "Low Interest Rates",
          "Wide Branch Network",
          "Moratorium Period",
          "Section 80E Tax Benefits",
        ],
      },
      {
        name: "YES Bank",
        desc: "Education loans with streamlined processing for students heading to top global destinations.",
        bestFor: "Students who prefer digital-first loan application",
        interestRate: "As per YES Bank's prevailing education loan rates",
        countries: ["Australia", "Canada", "United Kingdom", "United States"],
        features: [
          "Quick Processing",
          "Competitive Rates",
          "Flexible Repayment",
          "Online Application",
        ],
      },
      {
        name: "State Bank of India",
        desc: "India's largest bank offering global education loans with extensive branch support nationwide.",
        bestFor: "Students seeking the most affordable public sector bank loan",
        interestRate: "As per SBI's prevailing education loan rates",
        countries: [
          "Australia",
          "Canada",
          "United Kingdom",
          "United States",
          "Germany",
          "Ireland",
        ],
        features: [
          "Lowest Interest Rates",
          "Largest Branch Network",
          "Moratorium During Study",
          "Government Scheme Benefits",
        ],
      },
      {
        name: "Prodigy Finance",
        desc: "International lender offering collateral-free loans based on future earning potential — no co-signer required.",
        bestFor: "International students without Indian co-applicants or collateral",
        interestRate: "Variable rates based on profile and destination",
        countries: ["United Kingdom", "United States", "Canada", "Australia", "Germany"],
        features: [
          "No Collateral Required",
          "No Co-signer Needed",
          "Future Income Based",
          "Global University Network",
        ],
      },
      {
        name: "Canara Bank",
        desc: "Affordable education loans for study abroad with flexible repayment and government-backed schemes.",
        bestFor: "Students seeking reliable public sector bank financing",
        interestRate: "As per Canara Bank's prevailing education loan rates",
        countries: ["Australia", "Canada", "United Kingdom", "United States"],
        features: [
          "Attractive Interest Rates",
          "Wide Coverage",
          "Moratorium Period",
          "Simple Documentation",
        ],
      },
      {
        name: "Bank of Baroda",
        desc: "Comprehensive education loans covering tuition, living expenses, and travel for overseas study.",
        bestFor: "Students who want a trusted PSU bank with full expense coverage",
        interestRate: "As per Bank of Baroda's prevailing education loan rates",
        countries: ["Australia", "Canada", "United Kingdom", "United States", "Germany"],
        features: [
          "Competitive Rates",
          "Flexible Tenure",
          "Tax Benefits",
          "Nationwide Branch Access",
        ],
      },
      {
        name: "IDFC FIRST Bank",
        desc: "Education loans with customer-friendly terms and quick digital processing for study abroad.",
        bestFor: "Students who value personalized service and fast processing",
        interestRate: "As per IDFC FIRST Bank's prevailing education loan rates",
        countries: ["Australia", "Canada", "United Kingdom", "United States"],
        features: [
          "Quick Digital Process",
          "Competitive Rates",
          "Flexible EMI",
          "Dedicated Relationship Manager",
        ],
      },
      {
        name: "HDFC",
        desc: "Education loan options for students pursuing higher studies in India and abroad, subject to eligibility.",
        bestFor: "Students exploring education financing from a major Indian bank",
        interestRate: "As per HDFC's prevailing education loan terms",
        countries: ["India", "International destinations"],
        features: [
          "Study-abroad education financing",
          "Loan options based on eligibility",
          "Repayment terms based on loan offer",
          "Support for education-related expenses",
        ],
      },
    ],
  },
  {
    slug: "money-transfer",
    name: "Money Transfer",
    icon: "Send",
    short: "Safe and secure international money transfers with low fees",
    title: "Money Transfer",
    tagline:
      "Send money internationally with ease. Safe, secure, and affordable money transfer services for students.",
    partnerCta: "Visit Partner",
    benefits: [
      "Competitive exchange rates",
      "Low transfer fees",
      "Fast processing times",
      "Secure and reliable",
      "Multiple payment options",
      "Real-time tracking",
    ],
    partners: [
      {
        name: "Flywire",
        desc: "Trusted by universities worldwide for tuition and fee payments",
        bestFor: "Paying university tuition and official fees directly",
        countries: [
          "United Kingdom",
          "Australia",
          "United States",
          "Canada",
          "Germany",
          "Ireland",
        ],
        features: [
          "University partnerships",
          "Multi-currency",
          "Real-time tracking",
          "Competitive rates",
        ],
      },
      {
        name: "Convera",
        desc: "Global payments platform for education and living expense transfers",
        bestFor: "Large tuition payments and recurring living expense transfers",
        countries: [
          "United Kingdom",
          "Australia",
          "United States",
          "Canada",
          "Ireland",
          "New Zealand",
        ],
        features: [
          "Bulk payments",
          "Competitive FX rates",
          "Regulatory compliance",
          "Dedicated support",
        ],
      },
      {
        name: "Easy Transfer",
        desc: "Student-focused international transfers with low fees and fast delivery",
        bestFor: "Quick personal transfers for living expenses",
        countries: ["United Kingdom", "Australia", "United States", "Canada", "Ireland"],
        features: ["Low transfer fees", "Fast processing", "Student discounts", "Mobile app"],
      },
      {
        name: "Orient Exchange",
        desc: "Reliable forex and remittance services for students heading abroad",
        bestFor: "Students who prefer in-person support with competitive exchange rates",
        countries: ["India", "United Kingdom", "Australia"],
        features: [
          "Branch support across India",
          "Competitive rates",
          "Student packages",
          "Same-day service",
        ],
      },
      {
        name: "Zolve",
        desc: "Digital financial services to help students manage money across India and international destinations.",
        bestFor: "Students looking for digital-first cross-border money services",
        countries: ["India", "United States", "International destinations"],
        features: [
          "International money transfer options",
          "Digital account access",
          "Cross-border money management",
          "Student-focused financial services",
        ],
      },
    ],
  },
  {
    slug: "forex",
    name: "Forex",
    icon: "Banknote",
    short: "Best forex rates for students with transparent pricing",
    title: "Forex Services",
    tagline:
      "Get the best forex rates for your international education. Transparent pricing and hassle-free currency exchange.",
    partnerCta: "Visit Partner",
    benefits: [
      "Best exchange rates",
      "Zero commission charges",
      "Doorstep delivery available",
      "Multiple currency options",
      "Prepaid forex cards",
      "Easy online booking",
    ],
    partners: [
      {
        name: "BookMyForex",
        desc: "India's largest online forex marketplace — best rates with free home delivery",
        bestFor: "Students who want the best exchange rates with doorstep delivery",
        countries: ["India"],
        features: [
          "Best rate guarantee",
          "Free home delivery",
          "Live order tracking",
          "Multi-currency card",
        ],
      },
      {
        name: "Thomas Cook Forex",
        desc: "Trusted forex services with global presence and multi-currency travel cards",
        bestFor: "Students who want a prepaid forex card plus cash for initial expenses",
        countries: ["India", "United Kingdom", "Australia"],
        features: [
          "Multi-currency card",
          "Competitive rates",
          "Wide branch network",
          "Travel insurance add-ons",
        ],
      },
      {
        name: "Orient Exchange",
        desc: "Student-friendly forex with competitive rates and branch support across India",
        bestFor: "Students who prefer visiting a branch for forex and travel cards",
        countries: ["India"],
        features: [
          "Student packages",
          "Competitive rates",
          "Branch pickup",
          "Same-day service",
        ],
      },
      {
        name: "Niyo Forex",
        desc: "Digital forex and international money services for students preparing to study abroad.",
        bestFor: "Students managing travel and money needs for overseas study",
        countries: ["India", "International destinations"],
        features: [
          "Forex services for international travel",
          "International money service options",
          "Digital service access",
          "Support for overseas student journeys",
        ],
      },
    ],
  },
  {
    slug: "accommodation",
    name: "Accommodation",
    icon: "Home",
    short: "Find verified student accommodation near your university",
    title: "Student Accommodation",
    tagline:
      "Find your home away from home. Browse verified student accommodations near your university with flexible terms.",
    partnerCta: "Book Now",
    benefits: [
      "Verified and secure properties",
      "Close to university campuses",
      "Furnished accommodations",
      "Flexible lease terms",
      "All-inclusive bills option",
      "Virtual property tours",
    ],
    partners: [
      {
        name: "Casita",
        desc: "Your gateway to seamless student living worldwide",
        long: "Casita is your trusted partner in finding the perfect home away from home. With accommodation options tailored to student needs, Casita ensures a smooth transition into student life with quality, safety, and convenience at every step.",
        bestFor:
          "Casita offers student housing in Melbourne, Sydney, London, Manchester, New York, Toronto, Dublin, Berlin, and more — close to major universities with flexible lease terms.",
        countries: ["Australia", "United Kingdom", "United States", "Canada", "Germany"],
        features: [
          "Quality assurance",
          "Easy booking",
          "24/7 support",
          "Community atmosphere",
        ],
        why: [
          {
            t: "Quality Assurance",
            d: "Every property is handpicked to meet rigorous standards for safety and comfort.",
          },
          { t: "Easy Booking", d: "Browse, compare, and book accommodation online in minutes." },
          { t: "24/7 Support", d: "Dedicated support team available throughout your stay." },
          {
            t: "Community",
            d: "Connect with fellow international students and build lasting friendships.",
          },
        ],
      },
      {
        name: "Amber",
        desc: "Find your perfect student home near university — no booking fees",
        long: "Amber Student helps you find and book verified accommodation near your university with transparent pricing and no hidden booking fees.",
        bestFor:
          "London, Birmingham, Sydney, Melbourne, Berlin, Amsterdam, Toronto, and more — all close to universities and transport links.",
        countries: ["United Kingdom", "Australia", "Germany", "Netherlands", "Canada"],
        features: [
          "No booking fees",
          "Virtual tours",
          "Price match guarantee",
          "Verified listings",
        ],
        why: [
          {
            t: "No Booking Fees",
            d: "Book without extra charges — transparent student-friendly pricing.",
          },
          { t: "Virtual Tours", d: "Explore properties online before you commit." },
          { t: "Price Match", d: "Found it cheaper elsewhere? Amber will match the price." },
        ],
      },
      {
        name: "UniAcco",
        desc: "Global student accommodation platform with exclusive deals and instant booking",
        long: "UniAcco connects students with verified housing worldwide, offering exclusive discounts and a hassle-free booking experience.",
        bestFor:
          "Properties across the UK, Australia, USA, Canada, and Ireland in major university cities.",
        countries: ["United Kingdom", "Australia", "United States", "Canada", "Ireland"],
        features: [
          "Exclusive deals",
          "Instant booking",
          "Price guarantee",
          "Free cancellation",
        ],
        why: [
          { t: "Exclusive Deals", d: "Student-only discounts not available on other platforms." },
          { t: "Instant Booking", d: "Secure your room with immediate confirmation." },
          { t: "Free Cancellation", d: "Flexible cancellation on eligible bookings." },
        ],
      },
      {
        name: "University Living",
        desc: "Premium student housing with personalized assistance for international students",
        long: "University Living provides end-to-end support for international students — from property search to move-in — with a dedicated advisor at every step.",
        bestFor:
          "Accommodation in 250+ cities including London, Sydney, New York, Toronto, Dublin, and Berlin.",
        countries: ["United Kingdom", "Australia", "United States", "Canada", "Ireland"],
        features: [
          "Personal advisor",
          "Verified properties",
          "Best price guarantee",
          "Flexible terms",
        ],
        why: [
          {
            t: "Personal Advisor",
            d: "A dedicated expert guides you through the entire booking process.",
          },
          {
            t: "Verified Properties",
            d: "Every listing is checked for quality, safety, and legitimacy.",
          },
          { t: "Best Price", d: "Price match guarantee on eligible bookings." },
        ],
      },
      {
        name: "UniLodgers",
        desc: "Verified student housing with instant booking and a wide selection of rooms",
        long: "UniLodgers lists verified student properties worldwide with instant booking and round-the-clock support.",
        countries: ["United Kingdom", "Australia", "United States", "Canada"],
        features: ["Instant booking", "24/7 support", "Wide selection", "Verified properties"],
        why: [
          {
            t: "Verified Properties",
            d: "Every listing meets strict quality and safety standards.",
          },
          { t: "Instant Booking", d: "Secure your room online with instant confirmation." },
          { t: "24/7 Support", d: "Round-the-clock assistance for bookings and stay issues." },
        ],
      },
      {
        name: "Uhomes",
        desc: "Smart student housing search with AI-powered recommendations",
        long: "Uhomes uses smart technology to match students with the best accommodation options based on budget, location, and preferences.",
        bestFor:
          "Student housing across the UK, Australia, USA, and Canada near top-ranked universities.",
        countries: ["United Kingdom", "Australia", "United States", "Canada"],
        features: [
          "AI recommendations",
          "Price comparison",
          "Virtual viewings",
          "Secure payments",
        ],
        why: [
          {
            t: "Smart Matching",
            d: "AI-powered recommendations based on your preferences and budget.",
          },
          { t: "Price Comparison", d: "Compare multiple properties to find the best value." },
          { t: "Secure Payments", d: "Book safely with protected payment processing." },
        ],
      },
    ],
  },
  {
    slug: "health-insurance",
    name: "Health Insurance",
    icon: "HeartPulse",
    short: "Comprehensive health coverage for international students",
    title: "Health Insurance",
    tagline:
      "Stay protected with comprehensive health coverage. Affordable insurance plans designed specifically for international students.",
    partnerCta: "Select Partner",
    benefits: [
      "Comprehensive medical coverage",
      "Emergency medical evacuation",
      "Prescription drug coverage",
      "Mental health support",
      "Dental and vision coverage",
      "24/7 global assistance",
    ],
    partners: [
      {
        name: "ISO Student Health Insurance",
        desc: "Comprehensive health coverage for international students",
        countries: ["United States", "Canada", "Australia", "United Kingdom"],
        features: ["Worldwide coverage", "Pre-existing conditions", "Mental health support"],
      },
      {
        name: "GeoBlue Student Insurance",
        desc: "Global health insurance designed for students",
        countries: ["United States", "Canada", "Australia", "New Zealand", "Ireland"],
        features: ["24/7 telemedicine", "Emergency evacuation", "Prescription coverage"],
      },
      {
        name: "Allianz Care",
        desc: "Trusted international health insurance provider",
        countries: [
          "United Kingdom",
          "Australia",
          "Germany",
          "Netherlands",
          "Ireland",
          "India",
        ],
        features: ["Cashless hospitalization", "Dental coverage", "Multilingual support"],
      },
    ],
  },
  {
    slug: "student-id-card",
    name: "Student ID Card",
    icon: "IdCard",
    short: "International student identity card with exclusive discounts",
    title: "Student ID Card",
    tagline:
      "Unlock exclusive student discounts worldwide. Get your international student identity card and start saving today.",
    partnerCta: "Select Partner",
    benefits: [
      "Access to thousands of discounts",
      "International recognition",
      "Travel and accommodation deals",
      "Entertainment and dining offers",
      "Technology and software discounts",
      "Valid for 12 months",
    ],
    partners: [
      {
        name: "ISIC - International Student Identity Card",
        desc: "The only internationally recognized student ID card",
        countries: [
          "Australia",
          "Canada",
          "United Kingdom",
          "United States",
          "New Zealand",
          "Germany",
          "Netherlands",
          "India",
          "Ireland",
        ],
        features: ["Global discounts", "Travel insurance", "Valid worldwide"],
      },
      {
        name: "Student Advantage Card",
        desc: "Exclusive discounts on travel, shopping, and dining",
        countries: ["United States", "Canada"],
        features: ["15% off Amtrak", "Retail discounts", "Online deals"],
      },
      {
        name: "UniDays",
        desc: "Digital student verification and discounts platform",
        countries: [
          "United Kingdom",
          "Australia",
          "United States",
          "Canada",
          "Ireland",
          "New Zealand",
          "India",
        ],
        features: ["Instant verification", "Exclusive brands", "Year-round savings"],
      },
    ],
  },
  {
    slug: "sim-card",
    name: "SIM Card",
    icon: "Smartphone",
    short: "Stay connected with affordable international SIM cards",
    title: "SIM Card Services",
    tagline:
      "Stay connected wherever you study. Get affordable international SIM cards with flexible plans and no hidden fees.",
    partnerCta: "Select Partner",
    benefits: [
      "Affordable international rates",
      "No roaming charges",
      "Easy activation process",
      "Flexible data plans",
      "Multiple country coverage",
      "Student-friendly pricing",
    ],
    partners: [
      {
        name: "Airalo",
        desc: "Global eSIM marketplace with instant connectivity",
        countries: [
          "Australia",
          "Canada",
          "United Kingdom",
          "United States",
          "New Zealand",
          "Germany",
          "Netherlands",
          "Ireland",
          "India",
        ],
        features: ["eSIM technology", "190+ countries", "Instant activation"],
      },
      {
        name: "KnowRoaming",
        desc: "International SIM with no roaming charges",
        countries: ["United States", "Canada", "United Kingdom", "Australia"],
        features: ["Keep your number", "Data plans", "Free incoming calls"],
      },
      {
        name: "Lebara Mobile",
        desc: "Affordable international calling and data plans",
        countries: ["United Kingdom", "Australia", "Germany", "Netherlands", "Ireland"],
        features: ["Student discounts", "Flexible plans", "International calls"],
      },
    ],
  },
  {
    slug: "flight-ticket-booking",
    name: "Flight Ticket Booking",
    icon: "Plane",
    short: "Book flights for your study abroad journey with trusted travel partners",
    title: "Flight Ticket Booking",
    tagline:
      "Plan your journey to your study destination with flight booking assistance from our travel partners.",
    partnerCta: "Contact Partner",
    benefits: [
      "Explore flight options for your destination",
      "Get support with booking your student travel",
      "Compare itineraries to suit your plans",
      "Plan your travel dates with guidance",
    ],
    partners: [
      {
        name: "Hotspot",
        desc: "Flight ticket booking assistance for students travelling to their study destination.",
        countries: ["India", "International destinations"],
        features: [
          "Flight booking assistance",
          "Domestic and international travel options",
          "Itinerary guidance",
        ],
      },
      {
        name: "Wizzmoni",
        desc: "Travel booking support to help students plan flights for their overseas studies.",
        countries: ["India", "International destinations"],
        features: [
          "Student travel support",
          "Flight itinerary options",
          "Booking guidance",
        ],
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const destinations = [
  "Australia",
  "Canada",
  "United Kingdom",
  "United States",
  "New Zealand",
  "Ireland",
  "Germany",
  "Netherlands",
];

export const currencies = ["USD", "GBP", "EUR", "AUD", "CAD", "NZD"];

export const indianStates = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];