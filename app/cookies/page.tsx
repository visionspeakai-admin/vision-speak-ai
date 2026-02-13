'use client';

import { Navigation } from '@/components/shared/navigation';
import { Footer } from '@/components/shared/footer';
import { HeroSection } from '@/components/shared/hero-section';
import { FadeInUp } from '@/components/animations/fade-in-up';

export default function CookiesPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <HeroSection
                badgeText="Legal"
                title="Cookies Policy"
                description="Last updated: February 12, 2026"
                backgroundVariant="gradient"
            />

            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <FadeInUp>
                    <div className="glass-effect p-8 md:p-12 rounded-3xl border border-white/10 prose prose-invert prose-cyan max-w-none">
                        <p className="text-slate-400 leading-relaxed mb-6">
                            This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used.
                        </p>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Cookies do not typically contain any information that personally identifies a user, but personal information that We store about You may be linked to the information stored in and obtained from Cookies.
                        </p>
                        <p className="text-slate-400 leading-relaxed mb-12">
                            We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies We use.
                        </p>

                        <h2 className="text-white mt-12 mb-6 border-b border-white/10 pb-2">Interpretation and Definitions</h2>
                        <h3 className="text-cyan-400 mt-8 mb-4">Interpretation</h3>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                        </p>

                        <h3 className="text-cyan-400 mt-8 mb-4">Definitions</h3>
                        <p className="text-slate-400 leading-relaxed mb-4">For the purposes of this Cookies Policy:</p>
                        <ul className="list-disc pl-6 space-y-4 text-slate-400 mb-12">
                            <li><strong className="text-white">Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Cookies Policy) refers to VisionSpeak AI, 200 Park Ave, New York, NY 10166, United States.</li>
                            <li><strong className="text-white">Cookies</strong> means small files that are placed on Your computer, mobile device or any other device by a website.</li>
                            <li><strong className="text-white">Website</strong> refers to VisionSpeak AI, accessible from <a href="https://visionspeakai.com" className="text-cyan-400 hover:underline">https://visionspeakai.com</a>.</li>
                            <li><strong className="text-white">You</strong> means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.</li>
                        </ul>

                        <h2 className="text-white mt-12 mb-6 border-b border-white/10 pb-2">The use of the Cookies</h2>
                        <h3 className="text-cyan-400 mt-8 mb-4">Type of Cookies We Use</h3>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.
                        </p>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Where required by law, We will request your consent before using Cookies that are not strictly necessary. Strictly necessary Cookies are used to provide the Website and cannot be switched off in our systems.
                        </p>

                        <p className="text-slate-400 leading-relaxed mb-4">We use both session and persistent Cookies for the purposes set out below:</p>
                        <ul className="list-disc pl-6 space-y-4 text-slate-400 mb-12">
                            <li>
                                <strong className="text-white">Necessary / Essential Cookies</strong>
                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Type: Session | Administered by: Us</p>
                                <p className="mt-2">These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts.</p>
                            </li>
                            <li>
                                <strong className="text-white">Functionality Cookies</strong>
                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Type: Persistent | Administered by: Us</p>
                                <p className="mt-2">These Cookies allow Us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience.</p>
                            </li>
                        </ul>

                        <h2 className="text-white mt-12 mb-6 border-b border-white/10 pb-2">Your Choices Regarding Cookies</h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with the Website.
                        </p>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            If You'd like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-400 mb-12">
                            <li><a href="https://support.google.com/accounts/answer/32050" className="text-cyan-400 hover:underline">Chrome Browser</a></li>
                            <li><a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-cyan-400 hover:underline">Microsoft Edge</a></li>
                            <li><a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" className="text-cyan-400 hover:underline">Firefox Browser</a></li>
                            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-cyan-400 hover:underline">Safari Browser</a></li>
                        </ul>

                        <h2 className="text-white mt-12 mb-6 border-b border-white/10 pb-2">Contact Us</h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            If you have any questions about this Cookies Policy, You can contact us:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-400">
                            <li>By email: support@visionspeakai.com</li>
                            <li>By visiting this page on our website: <a href="https://visionspeakai.com/contact" className="text-cyan-400 hover:underline">https://visionspeakai.com/contact</a></li>
                        </ul>
                    </div>
                </FadeInUp>
            </section>

            <Footer />
        </main>
    );
}
