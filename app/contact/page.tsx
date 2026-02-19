"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { getRecaptchaToken } from "@/components/providers/recaptcha-provider";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [officeLocation, setOfficeLocation] = useState<any | null>(null);
  const [mapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    const fetchOffice = async () => {
      try {
        // Prefer the documented endpoint: POST /maps/pin — it should return an embed URL or coordinates
        const body = {
          address: "200 Park Ave, New York, NY 10166, United States",
        };
        const pinResp = await api.post("/maps/pin", body);

        if (pinResp.status === "success" && pinResp.data) {
          // Expected minimal shape: { embed_url?, lat?, lng?, address?, name? }
          setOfficeLocation(pinResp.data);
          return;
        }

        // Fallback: older endpoint `/tools/map` (returns locations array)
        const listResp = await api.get("/tools/map");
        if (listResp.status === "success" && Array.isArray(listResp.data)) {
          const found = listResp.data.find(
            (l: any) => l.address && l.address.includes("200 Park Ave"),
          );
          if (found) setOfficeLocation(found);
        }
      } catch (err) {
        console.error("Failed to fetch office location:", err);
      } finally {
        setMapLoading(false);
      }
    };

    fetchOffice();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    try {
      const captcha_token = await getRecaptchaToken("contact");
      const response = await api.post("/mail/contact", {
        ...formData,
        captcha_token,
      });

      if (response.status === "success") {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        return;
      }

      // If API returns error-like shape, surface a helpful message
      if (response && response.message) {
        throw response;
      }
    } catch (error: any) {
      console.error("Contact error:", error);
      // show server message when available
      if (error && error.message) {
        setStatus("error");
        // replace generic status with more informative message by rendering error.message in UI
        // store message temporarily in `message` field of formData.subject for display (minimal change)
        setFormData((f) => ({ ...f, subject: error.message }));
      } else {
        setStatus("error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-background'>
      <Navigation />

      <HeroSection
        badgeText='Get in Touch'
        title="We'd Love to Hear From You"
        description='Have questions about our models or pricing? Our team is here to help.'
        backgroundVariant='gradient'
      />

      <section className='py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24'>
          {/* Info Side */}
          <div className='space-y-12'>
            <FadeInUp>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
                Contact Information
              </h2>
              <p className='text-slate-400 leading-relaxed mb-12'>
                Whether you're looking for technical support, enterprise
                solutions, or just want to say hello, we're ready to assist.
              </p>
            </FadeInUp>

            <div className='space-y-8'>
              {[
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "support@visionspeakai.com",
                  sub: "We usually respond within 24 hours.",
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "+1 (212) 758-9364",
                  sub: "Mon-Fri from 9am to 6pm.",
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  content: "200 Park Ave, New York, NY 10166, United States",
                  sub: "Our global headquarters.",
                },
              ].map((item, idx) => (
                <FadeInUp key={idx} delay={idx * 0.1}>
                  <div className='flex gap-6'>
                    <div className='w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0'>
                      <item.icon className='text-cyan-400 w-6 h-6' />
                    </div>
                    <div>
                      <h3 className='font-bold text-white mb-1'>
                        {item.title}
                      </h3>
                      <p className='text-cyan-400 font-medium mb-1'>
                        {item.content}
                      </p>
                      <p className='text-sm text-slate-500'>{item.sub}</p>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>

            {/* Office map (fetched from backend /tools/map) */}
            {mapLoading ? (
              <div className='h-64 flex items-center justify-center mt-6'>
                <Loader2 className='animate-spin text-cyan-400 w-8 h-8' />
              </div>
            ) : officeLocation ? (
              <div className='mt-6 rounded-2xl overflow-hidden border border-white/10'>
                <iframe
                  src={
                    officeLocation.lat && officeLocation.lng
                      ? `https://www.google.com/maps?q=${officeLocation.lat},${officeLocation.lng}&z=15&output=embed`
                      : `https://www.google.com/maps?q=${encodeURIComponent(officeLocation.address)}&z=15&output=embed`
                  }
                  className='w-full h-64'
                  loading='lazy'
                  title='Office location'
                />
                <div className='p-4 bg-obsidian-dark'>
                  <p className='text-sm text-slate-300 font-medium'>
                    {officeLocation.name || "VisionSpeakAI HQ"}
                  </p>
                  <p className='text-xs text-slate-500'>
                    {officeLocation.address}
                  </p>
                </div>
              </div>
            ) : (
              <div className='mt-6 text-sm text-slate-500'>
                Map not available
              </div>
            )}
          </div>

          {/* Form Side */}
          <FadeInUp delay={0.2}>
            <div className='glass-effect p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group'>
              <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />

              <form onSubmit={handleSubmit} className='relative space-y-6'>
                {status === "success" && (
                  <div className='bg-lime-500/10 border border-lime-500/20 text-lime-400 p-4 rounded-xl flex items-center gap-3 mb-6'>
                    <CheckCircle2 size={20} />
                    <p className='text-sm font-medium'>
                      Message sent successfully! We'll be in touch soon.
                    </p>
                  </div>
                )}
                {status === "error" && (
                  <div className='bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium mb-6'>
                    Something went wrong. Please try again later.
                  </div>
                )}

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='text-xs font-bold text-slate-500 uppercase tracking-widest ml-1'>
                      Name
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder='Your Name'
                      className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-xs font-bold text-slate-500 uppercase tracking-widest ml-1'>
                      Email
                    </label>
                    <input
                      type='email'
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder='yourname@example.com'
                      className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-xs font-bold text-slate-500 uppercase tracking-widest ml-1'>
                    Subject
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder='How can we help?'
                    className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-xs font-bold text-slate-500 uppercase tracking-widest ml-1'>
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder='Tell us more about your project...'
                    className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none'
                  />
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-obsidian-dark rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 disabled:opacity-50'
                >
                  {isLoading ? (
                    <Loader2 className='animate-spin' size={20} />
                  ) : (
                    <Send size={20} />
                  )}
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </FadeInUp>
        </div>
      </section>

      <Footer />
    </main>
  );
}
