"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Check, Zap, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { DEFAULT_PLANS } from "@/lib/plans";

interface Plan {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  price_yearly: number | null;
  features?: string[];
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  imageUrl: string;
}

// DEFAULT_PLANS imported from `lib/plans` (used as fallback / seed source)

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "VSpeakX 1.0 transformed how we handle accessibility. Our team can now reach 40% more users without additional resources. The accuracy is incredible.",
    author: "Sophia Carter",
    role: "Accessibility Director",
    company: "TechAccessHub Inc.",
    rating: 5,
    imageUrl: "/images/pf_1.webp",
  },
  {
    quote:
      "The real-time processing speed is unmatched. We integrated VSpeakX 1.0 into our retail operations and saw a 35% improvement in customer engagement metrics.",
    author: "Liam Bennett",
    role: "CTO",
    company: "RetailVision Solutions",
    rating: 5,
    imageUrl: "/images/pm_1.webp",
  },
  {
    quote:
      "Enterprise support is exceptional. Their team helped us scale from 100 to 1M+ requests per day seamlessly. Worth every penny.",
    author: "Isabella Thompson",
    role: "Head of Innovation",
    company: "CloudScale Analytics",
    rating: 5,
    imageUrl: "/images/pf_2.webp",
  },
  {
    quote:
      "The API documentation is thorough and the developer experience is smooth. We had our integration running in production within 48 hours.",
    author: "Noah Anderson",
    role: "Senior Engineer",
    company: "NeuralWorks",
    rating: 5,
    imageUrl: "/images/pm_2.webp",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const canSeed =
    process.env.NEXT_PUBLIC_ENABLE_PLAN_SEED === "true" ||
    process.env.NODE_ENV !== "production";

  const seedPlans = async () => {
    if (!canSeed || isSeeding) return;
    setIsSeeding(true);
    setSeedStatus(null);

    try {
      for (const p of DEFAULT_PLANS) {
        const payload = {
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: p.price,
          price_yearly: p.price_yearly ?? null,
          features: p.features ?? [],
          currency: "USD",
          interval: "monthly",
          is_active: true,
        } as any;

        try {
          await api.post("/subscription-plans", payload);
        } catch (innerErr) {
          // ignore individual failures (may require admin rights on backend)
          console.warn("Seed plan failed for", p.slug, innerErr);
        }
      }

      setSeedStatus("Seed completed — reloading plans");
      await fetchPlans();
    } catch (err) {
      console.error("Failed to seed plans", err);
      setSeedStatus("Seed failed — check console or authenticate as admin");
    } finally {
      setIsSeeding(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await api.get<Plan[]>("/subscription-plans");
      if (response.status === "success" && Array.isArray(response.data)) {
        if (response.data.length > 0) {
          setPlans(response.data);
        } else {
          // backend returned empty list — use local defaults and optionally seed backend (dev/test only)
          setPlans(
            DEFAULT_PLANS.map((p) => ({
              ...p,
              price_yearly: p.price_yearly ?? null,
            })),
          );
          if (canSeed) {
            // try to push defaults to backend (best-effort; requires admin token)
            seedPlans();
          }
        }
      } else {
        setPlans(
          DEFAULT_PLANS.map((p) => ({
            ...p,
            price_yearly: p.price_yearly ?? null,
          })),
        );
      }
    } catch (error) {
      console.error("Failed to fetch plans:", error);
      setPlans(
        DEFAULT_PLANS.map((p) => ({
          ...p,
          price_yearly: p.price_yearly ?? null,
        })),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = (plan: Plan, interval: "monthly" | "yearly") => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/pricing`);
      return;
    }

    router.push(`/checkout?plan=${plan.slug}&interval=${interval}`);
  };

  const addOns = [
    {
      name: "GPU Acceleration (NVIDIA)",
      price: "+$50/month",
      description: "RTX-powered latency optimization",
    },
    {
      name: "Advanced Analytics",
      price: "+$100/month",
      description: "Real-time metrics and dashboards",
    },
    {
      name: "Custom Model Training",
      price: "Starting $2,000",
      description: "Domain-specific fine-tuning",
    },
    {
      name: "Priority Support",
      price: "+$200/month",
      description: "24/7 dedicated support engineer",
    },
  ];

  return (
    <main className='min-h-screen bg-background'>
      <Navigation />

      {/* Hero */}
      <HeroSection
        badgeText='Simple, Transparent Pricing'
        title='Performance Plans for Every Vision'
        description='Scalable pricing for real-time lip-reading and gesture recognition, designed for applications of every size.'
        backgroundVariant='grid'
      />

      {/* Pricing Cards */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        {/* Billing Toggle */}
        <div className='flex justify-center items-center gap-6 mb-20'>
          <span
            className={`text-xs font-black uppercase tracking-widest transition-colors ${!isYearly ? "text-cyan-electric" : "text-slate-500"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className='relative inline-flex h-10 w-20 items-center rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-cyan-electric/40'
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-lg shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all duration-500 ${
                isYearly
                  ? "translate-x-12 bg-lime-bio shadow-[0_0_15px_rgba(204,255,0,0.5)]"
                  : "translate-x-2 bg-cyan-electric"
              }`}
            />
          </button>
          <span
            className={`text-xs font-black uppercase tracking-widest transition-colors ${isYearly ? "text-lime-bio" : "text-slate-500"}`}
          >
            Yearly{" "}
            <span className='glass-effect-strong px-2 py-1 rounded ml-2 text-[10px] text-lime-bio'>
              -20%
            </span>
          </span>
        </div>

        {/* Dev-only: seed backend with default plans (opt-in via NEXT_PUBLIC_ENABLE_PLAN_SEED=true) */}
        {canSeed && (
          <div className='text-center mb-6'>
            <button
              onClick={seedPlans}
              disabled={isSeeding}
              className='px-4 py-2 text-sm font-bold rounded bg-amber-500/20 hover:bg-amber-500/30'
            >
              {isSeeding
                ? "Seeding plans..."
                : "Push default plans to backend (dev only)"}
            </button>
            {seedStatus && (
              <p className='text-xs text-slate-400 mt-2'>{seedStatus}</p>
            )}
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {isLoading ? (
            <div className='col-span-3 flex justify-center py-12'>
              <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary'></div>
            </div>
          ) : (
            plans.map((plan: Plan, index: number) => {
              const rawDisplayPrice = isYearly
                ? (plan.price_yearly ?? Number(plan.price) * 10)
                : Number(plan.price ?? 0);
              const displayPrice = Number.isFinite(Number(rawDisplayPrice))
                ? Number(rawDisplayPrice)
                : 0;
              const period = isYearly ? "/year" : "/month";
              const isPro = plan.slug === "pro";

              return (
                <FadeInUp key={index} delay={index * 0.1}>
                  <div
                    className={`relative rounded-3xl transition-all duration-500 card-modern h-full ${
                      isPro
                        ? "border-lime-bio/40 bg-lime-bio/5 md:scale-105 shadow-[0_0_50px_rgba(204,255,0,0.1)]"
                        : "border-white/10"
                    }`}
                  >
                    {/* Badge */}
                    {plan.slug === "pro" && (
                      <div className='absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-primary-foreground bg-primary'>
                        Most Popular
                      </div>
                    )}

                    <div className='p-6 md:p-8'>
                      {/* Header */}
                      <h3
                        className={`${isYearly ? "text-base md:text-lg" : "text-lg md:text-xl"} font-bold text-foreground mb-2`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`${isYearly ? "text-xs" : "text-sm"} text-muted-foreground mb-6`}
                      >
                        {plan.description}
                      </p>

                      {/* Price */}
                      <div className='mb-10'>
                        {displayPrice > 0 ? (
                          <div className='flex items-baseline gap-2 mb-2'>
                            <span
                              className={`${isYearly ? "text-4xl md:text-5xl" : "text-5xl md:text-6xl"} font-black text-cyan-electric tracking-tighter drop-shadow-sm`}
                            >
                              ${displayPrice.toFixed(2)}
                            </span>
                            <span className='text-slate-500 text-xs font-bold uppercase tracking-widest'>
                              {period}
                            </span>
                          </div>
                        ) : (
                          <div className='text-5xl md:text-6xl font-black text-cyan-electric tracking-tighter'>
                            FREE
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() =>
                          handleCheckout(plan, isYearly ? "yearly" : "monthly")
                        }
                        className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 mb-8 ${
                          isPro ? "glow-button-accent" : "glow-button-secondary"
                        }`}
                      >
                        {plan.price > 0 ? "Get Started" : "Start Free Trial"}
                      </button>

                      {/* Features */}
                      <div className='space-y-4'>
                        {(plan.features || []).map(
                          (feature: any, idx: number) => (
                            <div key={idx} className='flex gap-4'>
                              <Check className='w-4 h-4 text-lime-bio flex-shrink-0 mt-0.5' />
                              <span
                                className={`${isYearly ? "text-xs" : "text-sm"} font-bold text-slate-300 uppercase tracking-tight`}
                              >
                                {feature.name || feature}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </FadeInUp>
              );
            })
          )}
        </div>
      </section>

      {/* Add-Ons */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <ScrollReveal className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>Enhance Your Plan</h2>
          <p className='body-text max-w-2xl mx-auto'>
            Add powerful features to supercharge your deployment.
          </p>
        </ScrollReveal>

        <div className='mb-8 rounded-2xl overflow-hidden'>
          <img
            src='/images/pricing.webp'
            alt='Add-ons overview'
            className='w-full rounded-2xl shadow-md'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {addOns.map((addon, index) => (
            <FadeInUp key={index} delay={index * 0.1}>
              <div className='card-modern flex flex-col justify-between'>
                <div>
                  <h3 className='font-semibold text-foreground mb-2'>
                    {addon.name}
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    {addon.description}
                  </p>
                </div>
                <span className='text-primary font-bold mt-4'>
                  {addon.price}
                </span>
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative'>
        {/* Background Elements */}
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-0 left-1/4 w-96 h-96 bg-cyan-electric/10 rounded-full blur-3xl opacity-20'></div>
          <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20'></div>
        </div>

        <ScrollReveal className='text-center mb-16'>
          <h2 className='heading-lg mb-4 text-pretty'>What Our Users Say</h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Join thousands of businesses transforming their operations with
            VSpeakX 1.0
          </p>
        </ScrollReveal>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {TESTIMONIALS.map((testimonial, index) => (
            <FadeInUp key={index} delay={index * 0.1}>
              <div className='card-modern group transition-all duration-300 min-h-[280px] flex flex-col'>
                {/* Star Rating */}
                <div className='flex gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className='w-5 h-5 text-yellow-400'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className='text-foreground mb-6 flex-grow italic text-sm leading-relaxed'>
                  "{testimonial.quote}"
                </p>

                {/* Author Avatar & Info */}
                <div className='border-t border-white/10 pt-4 flex items-center gap-4'>
                  {/* Avatar Image */}
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.author}
                    className='flex-shrink-0 w-12 h-12 rounded-full object-cover border-2 border-cyan-electric/60 group-hover:border-lime-bio group-hover:shadow-[0_0_15px_rgba(204,255,0,0.8)] transition-all duration-300'
                  />

                  {/* Author Details */}
                  <div>
                    <p className='font-semibold text-foreground'>
                      {testimonial.author}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {testimonial.role}
                    </p>
                    <p className='text-xs text-cyan-electric font-bold mt-1'>
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto'>
        <ScrollReveal className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>
            Frequently Asked Questions
          </h2>
        </ScrollReveal>

        <div className='space-y-4'>
          {[
            {
              q: "Can I change plans anytime?",
              a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.",
            },
            {
              q: "Do you offer custom pricing?",
              a: "Absolutely. For enterprise needs with high volume requirements, we offer custom contracts. Contact our sales team.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, wire transfers, and ACH payments for enterprise customers.",
            },
            {
              q: "Is there a free trial?",
              a: "Yes! All Starter plans include a 14-day free trial with full feature access. No credit card required.",
            },
            {
              q: "What happens if I exceed my quota?",
              a: "We'll notify you when you're approaching your limit. You can purchase additional capacity immediately.",
            },
            {
              q: "Do you offer discounts for annual billing?",
              a: "Yes! We offer 20% discount when you pay annually instead of monthly across all plans.",
            },
          ].map((item, index) => (
            <FadeInUp key={index} delay={index * 0.05}>
              <div className='card-modern'>
                <h3 className='font-semibold text-foreground mb-2'>{item.q}</h3>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {item.a}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8'>
        <FadeInUp>
          <div className='max-w-2xl mx-auto text-center card-modern p-12'>
            <h2 className='heading-lg mb-4 text-pretty'>
              Ready To Activate Gesture & Lip Recognition?
            </h2>
            <p className='body-text mb-8'>
              Choose your plan and start building in minutes. Our team is here
              to help you succeed.
            </p>
            <Link href='/VSpeakX' className='inline-block glow-button'>
              Get Started Free
            </Link>
          </div>
        </FadeInUp>
      </section>

      <Footer />
    </main>
  );
}
