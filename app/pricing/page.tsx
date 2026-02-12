'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'
import { HeroSection } from '@/components/shared/hero-section'
import { FadeInUp } from '@/components/animations/fade-in-up'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { Check, Zap } from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface Plan {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  price_yearly: number | null;
  features?: any[];
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await api.get<Plan[]>('/plans')
      if (response.status === 'success' && Array.isArray(response.data)) {
        setPlans(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch plans:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckout = async (planId: number, interval: 'monthly' | 'yearly') => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/pricing`)
      return
    }

    try {
      const response = await api.post<{ url: string }>('/subscriptions/checkout', {
        plan_id: planId,
        interval,
        success_url: `${window.location.origin}/dashboard?checkout=success`,
        cancel_url: `${window.location.origin}/pricing?checkout=cancelled`,
      })

      if (response.status === 'success' && response.data?.url) {
        window.location.href = response.data.url
      }
    } catch (error) {
      console.error('Checkout failed:', error)
    }
  }

  const addOns = [
    { name: 'GPU Acceleration (NVIDIA)', price: '+$50/month', description: 'RTX-powered latency optimization' },
    { name: 'Advanced Analytics', price: '+$100/month', description: 'Real-time metrics and dashboards' },
    { name: 'Custom Model Training', price: 'Starting $2,000', description: 'Domain-specific fine-tuning' },
    { name: 'Priority Support', price: '+$200/month', description: '24/7 dedicated support engineer' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <HeroSection
        badgeText="Simple, Transparent Pricing"
        title="Choose Your Plan"
        description="Flexible pricing for projects of any scale. Always know what you'll pay."
        backgroundVariant="grid"
      />

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative inline-flex h-8 w-16 items-center rounded-full bg-secondary transition-colors"
            style={{ backgroundColor: isYearly ? 'hsl(186, 100%, 50%)' : 'hsl(0, 0%, 15%)' }}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${isYearly ? 'translate-x-9' : 'translate-x-1'
                }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Yearly <span className="text-primary font-bold text-xs ml-1">Save 20%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {isLoading ? (
            <div className="col-span-3 flex justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            </div>
          ) : (
            plans.map((plan: Plan, index: number) => {
              const displayPrice = isYearly ? plan.price_yearly || plan.price * 10 : plan.price
              const period = isYearly ? '/year' : '/month'

              return (
                <FadeInUp key={index} delay={index * 0.1}>
                  <div
                    className={`relative rounded-lg transition-all duration-300 card-modern ${plan.slug === 'pro' ? 'border-primary/60 md:scale-105' : ''
                      }`}
                  >
                    {/* Badge */}
                    {plan.slug === 'pro' && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-primary-foreground bg-primary">
                        Most Popular
                      </div>
                    )}

                    <div className="p-6 md:p-8">
                      {/* Header */}
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                      {/* Price */}
                      <div className="mb-8">
                        {displayPrice > 0 ? (
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl md:text-5xl font-bold text-primary">${displayPrice}</span>
                            <span className="text-muted-foreground text-sm">{period}</span>
                          </div>
                        ) : (
                          <div className="text-4xl md:text-5xl font-bold text-primary">Free</div>
                        )}
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => handleCheckout(plan.id, isYearly ? 'yearly' : 'monthly')}
                        className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-200 mb-8 ${plan.slug === 'pro'
                          ? 'glow-button'
                          : 'border border-border hover:border-primary/40 hover:bg-primary/5 text-foreground'
                          }`}>
                        {plan.price > 0 ? 'Get Started' : 'Start Free Trial'}
                      </button>

                      {/* Features - Assuming features are stored in description or separate field */}
                      <div className="space-y-3">
                        {(plan.features || []).map((feature: any, idx: number) => (
                          <div key={idx} className="flex gap-3">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature.name || feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeInUp>
              )
            })
          )}
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="heading-lg mb-4 text-pretty">Enhance Your Plan</h2>
          <p className="body-text max-w-2xl mx-auto">Add powerful features to supercharge your deployment.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addOns.map((addon, index) => (
            <FadeInUp key={index} delay={index * 0.1}>
              <div className="card-modern flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{addon.name}</h3>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </div>
                <span className="text-primary font-bold mt-4">{addon.price}</span>
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="heading-lg mb-4 text-pretty">Frequently Asked Questions</h2>
        </ScrollReveal>

        <div className="space-y-4">
          {[
            {
              q: 'Can I change plans anytime?',
              a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.',
            },
            {
              q: 'Do you offer custom pricing?',
              a: 'Absolutely. For enterprise needs with high volume requirements, we offer custom contracts. Contact our sales team.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, wire transfers, and ACH payments for enterprise customers.',
            },
            {
              q: 'Is there a free trial?',
              a: 'Yes! All Starter plans include a 14-day free trial with full feature access. No credit card required.',
            },
            {
              q: 'What happens if I exceed my quota?',
              a: 'We\'ll notify you when you\'re approaching your limit. You can purchase additional capacity immediately.',
            },
            {
              q: 'Do you offer discounts for annual billing?',
              a: 'Yes! We offer 20% discount when you pay annually instead of monthly across all plans.',
            },
          ].map((item, index) => (
            <FadeInUp key={index} delay={index * 0.05}>
              <div className="card-modern">
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="max-w-2xl mx-auto text-center card-modern p-12">
            <h2 className="heading-lg mb-4 text-pretty">Ready to Get Started?</h2>
            <p className="body-text mb-8">
              Choose your plan and start building in minutes. Our team is here to help you succeed.
            </p>
            <Link href="/auth/login" className="inline-block glow-button">
              Get Started Free
            </Link>
          </div>
        </FadeInUp>
      </section>

      <Footer />
    </main>
  )
}
