export interface Plan {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  price_yearly?: number | null;
  features?: string[];
}

export const DEFAULT_PLANS: Plan[] = [
  {
    id: 1,
    slug: "basic",
    name: "Basic",
    description: "ENTRY-LEVEL PRECISION",
    price: 0,
    price_yearly: 0,
    features: ["5 TELEMETRY QUERIES", "BASIC AI CORE", "COMMUNITY ACCESS"],
  },
  {
    id: 2,
    slug: "pro",
    name: "Pro",
    description: "HIGH-PERFORMANCE ANALYTICS",
    price: 19.99,
    price_yearly: 199.99,
    features: [
      "UNLIMITED TELEMETRY",
      "HARDWARE ACCELERATION",
      "PRIORITY COMPUTE",
      "EXOTIC MODELS",
    ],
  },
  {
    id: 3,
    slug: "enterprise",
    name: "Enterprise",
    description: "UNRESTRICTED SCALABILITY",
    price: 49.99,
    price_yearly: 499.99,
    features: [
      "DEDICATED INSTANCE",
      "QUANTUM SLA",
      "ADVANCED FORENSICS",
      "RAW API ACCESS",
    ],
  },
];
