"use client";

import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FeatureCard } from "@/components/shared/feature-card";
import {
  Users,
  Lock,
  Smartphone,
  BarChart3,
  Headphones,
  Eye,
  Zap,
  Shield,
} from "lucide-react";

export default function SolutionsPage() {
  const solutionImages: Record<string, string> = {
    accessibility: "/images/solutions_1.webp",
    security: "/images/solutions_2.webp",
    retail: "/images/solutions_3.webp",
    analytics: "/images/solutions_4.webp",
  };

  const solutions = [
    {
      id: "accessibility",
      icon: <Users className='w-8 h-8' />,
      title: "Accessibility Solutions",
      description:
        "Enable speech-impaired and deaf users to communicate seamlessly.",
      benefits: [
        "Real-time caption generation from lip-reading",
        "Multi-language support for inclusive communication",
        "Integration with existing accessibility frameworks",
        "WCAG 2.1 AAA compliance",
      ],
      useCases: [
        "Speech therapy and rehabilitation",
        "Real-time meeting captioning",
        "Educational accessibility",
      ],
    },
    {
      id: "security",
      icon: <Lock className='w-8 h-8' />,
      title: "Silent Authentication",
      description:
        "Gesture-based biometric security for privacy-first authentication.",
      benefits: [
        "Gesture recognition for secure login flows",
        "Multi-factor authentication without passwords",
        "Works offline with edge processing",
        "SOC 2 Type II certified infrastructure",
      ],
      useCases: [
        "Banking and financial services",
        "Government and defense systems",
        "Healthcare data protection",
      ],
    },
    {
      id: "retail",
      icon: <Smartphone className='w-8 h-8' />,
      title: "Retail & Kiosk Solutions",
      description: "Touchless interactions for modern retail experiences.",
      benefits: [
        "Gesture-driven menu navigation",
        "Touchless payment authorization",
        "Contactless information retrieval",
        "Customer engagement analytics",
      ],
      useCases: [
        "Self-service kiosks",
        "Digital signage interaction",
        "Queue management systems",
      ],
    },
    {
      id: "analytics",
      icon: <BarChart3 className='w-8 h-8' />,
      title: "Enterprise Analytics",
      description:
        "Analyze communication patterns and behavioral data at scale.",
      benefits: [
        "Real-time emotion and intent detection",
        "Communication pattern analysis",
        "Customer engagement insights",
        "Compliance-ready data handling",
      ],
      useCases: [
        "Call center quality assurance",
        "Interview and hiring assessment",
        "User research and UX testing",
      ],
    },
  ];

  return (
    <main className='min-h-screen bg-background'>
      <Navigation />

      {/* Hero */}
      <HeroSection
        badgeText='Industry Solutions'
        title='Real-Time Lip and Gesture Solutions'
        description='VSpeakX 1.0 enables real-time lip-reading and gesture recognition, enhancing accessibility, security, and operational efficiency.'
        backgroundVariant='gradient'
      />

      {/* Solutions Detail Section */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        {solutions.map((solution, index) => (
          <div
            key={solution.id}
            className={`mb-20 ${index !== solutions.length - 1 ? "pb-20 border-b border-white/10" : ""}`}
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
              {/* Left: Icon and Description */}
              <div>
                <div className='w-16 h-16 rounded-xl glass-effect flex items-center justify-center mb-6 text-cyan-400'>
                  {solution.icon}
                </div>
                <h2 className='heading-lg mb-4 text-pretty'>
                  {solution.title}
                </h2>
                <p className='body-text mb-8'>{solution.description}</p>

                {/* Benefits */}
                <div className='mb-8'>
                  <h3 className='font-semibold text-white mb-4'>
                    Key Benefits
                  </h3>
                  <ul className='space-y-3'>
                    {solution.benefits.map((benefit, idx) => (
                      <li key={idx} className='flex gap-3 text-slate-300'>
                        <span className='text-cyan-400 flex-shrink-0 mt-1'>
                          ✓
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                <div>
                  <h3 className='font-semibold text-white mb-4'>Use Cases</h3>
                  <div className='flex flex-wrap gap-2'>
                    {solution.useCases.map((useCase, idx) => (
                      <span
                        key={idx}
                        className='px-3 py-1 rounded-full glass-effect text-sm text-slate-300 border border-white/10'
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Visual Stats and Features */}
              <div className='space-y-6'>
                <div className='rounded-2xl overflow-hidden mb-4'>
                  <img
                    src={solutionImages[solution.id]}
                    alt={`${solution.title} illustration`}
                    className='w-full h-40 object-cover rounded-2xl'
                  />
                </div>
                {/* Stats */}
                <div className='glass-effect p-8 rounded-xl'>
                  <h3 className='font-semibold text-white mb-6'>
                    Impact Metrics
                  </h3>
                  <div className='space-y-4'>
                    {[
                      { stat: "98%", label: "User Satisfaction" },
                      { stat: "40%", label: "Cost Reduction" },
                      { stat: "99.9%", label: "Uptime SLA" },
                      { stat: "<100ms", label: "Latency" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className='flex items-center justify-between p-3 bg-white/5 rounded-lg'
                      >
                        <span className='text-slate-400'>{item.label}</span>
                        <span className='font-bold text-cyan-300'>
                          {item.stat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Integration Example */}
                <div className='glass-effect p-8 rounded-xl'>
                  <h3 className='font-semibold text-white mb-4'>
                    Integration Path
                  </h3>
                  <div className='space-y-2 text-sm text-slate-400'>
                    <p>1. API Key Setup</p>
                    <p>2. Webhook Configuration</p>
                    <p>3. Model Deployment</p>
                    <p>4. Production Scaling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Success Stories / Case Studies Section */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>
            Enterprise Success Stories
          </h2>
          <p className='body-text max-w-2xl mx-auto'>
            Organizations worldwide are transforming customer experiences and
            operations with VSpeakX 1.0.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[
            {
              company: "AccessTech Corp",
              industry: "Accessibility Services",
              metric: "10,000+",
              description:
                "Users enabled to communicate with real-time captioning",
            },
            {
              company: "SecureBank Int'l",
              industry: "Financial Services",
              metric: "99.99%",
              description:
                "Authentication success rate with gesture recognition",
            },
            {
              company: "RetailPro Systems",
              industry: "Retail Tech",
              metric: "45%",
              description: "Improvement in customer self-service adoption",
            },
          ].map((story, index) => (
            <div key={index} className='glass-effect p-8 rounded-xl'>
              <div className='mb-4'>
                <p className='text-cyan-400 text-sm font-semibold'>
                  {story.industry}
                </p>
                <h3 className='heading-sm text-white mt-2'>{story.company}</h3>
              </div>
              <div className='mb-4 p-4 bg-white/5 rounded-lg'>
                <p className='text-3xl font-bold text-cyan-300 mb-1'>
                  {story.metric}
                </p>
                <p className='text-sm text-slate-400'>{story.description}</p>
              </div>
              <a
                href='#'
                className='text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors'
              >
                Read Case Study →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='heading-lg mb-4 text-pretty'>
            VSpeakX 1.0s Traditional Solutions
          </h2>
          <p className='body-text max-w-2xl mx-auto'>
            Why enterprises choose VSpeakX 1.0 for modern AI-powered
            interaction.
          </p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-white/10'>
                <th className='px-4 py-4 text-left font-semibold text-white'>
                  Feature
                </th>
                <th className='px-4 py-4 text-center font-semibold text-cyan-400'>
                  VSpeakX 1.0
                </th>
                <th className='px-4 py-4 text-center font-semibold text-slate-400'>
                  Traditional
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Real-time Processing", vs: true, trad: false },
                { feature: "GPU Acceleration", vs: true, trad: false },
                { feature: "Multi-language Support", vs: true, trad: false },
                { feature: "Edge Deployment", vs: true, trad: false },
                { feature: "NVIDIA Optimized", vs: true, trad: false },
                { feature: "Sub-100ms Latency", vs: true, trad: false },
                { feature: "Easy Integration", vs: true, trad: false },
              ].map((row, index) => (
                <tr
                  key={index}
                  className='border-b border-white/5 hover:bg-white/5 transition-colors'
                >
                  <td className='px-4 py-4 text-slate-300'>{row.feature}</td>
                  <td className='px-4 py-4 text-center'>
                    {row.vs ? (
                      <span className='inline-block w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs'>
                        ✓
                      </span>
                    ) : (
                      <span className='text-slate-500'>-</span>
                    )}
                  </td>
                  <td className='px-4 py-4 text-center'>
                    {row.trad ? (
                      <span className='inline-block w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs'>
                        ✓
                      </span>
                    ) : (
                      <span className='text-slate-500'>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto text-center glass-effect p-12 rounded-2xl'>
          <h2 className='heading-lg mb-4 text-pretty'>Find Your Solution</h2>
          <p className='body-text mb-8'>
            Our enterprise team can help you design the perfect deployment
            strategy for your use case.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a href='/developers' className='glow-button'>
              Explore API
            </a>
            <a
              href='/contact'
              className='px-6 py-3 font-semibold rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all'
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
