'use client';

import { Navigation } from '@/components/shared/navigation';
import { Footer } from '@/components/shared/footer';
import { HeroSection } from '@/components/shared/hero-section';
import { FadeInUp } from '@/components/animations/fade-in-up';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <HeroSection
                badgeText="Legal"
                title="Terms and Conditions"
                description="Last updated: February 12, 2026"
                backgroundVariant="gradient"
            />

            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <FadeInUp>
                    <div className="glass-effect p-8 md:p-12 rounded-3xl border border-white/10 prose prose-invert prose-cyan max-w-none">
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Please read these terms and conditions carefully before using Our Service.
                        </p>

                        <h2 className="text-white mt-12 mb-6 border-b border-white/10 pb-2">Interpretation and Definitions</h2>
                        <h3 className="text-cyan-400 mt-8 mb-4">Interpretation</h3>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                        </p>

                        <h3 className="text-cyan-400 mt-8 mb-4">Definitions</h3>
                        <p className="text-slate-400 leading-relaxed mb-4">For the purposes of these Terms and Conditions:</p>
                        <ul className="list-disc pl-6 space-y-4 text-slate-400 mb-12">
                            <li><strong className="text-white">Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
                            <li><strong className="text-white">Country</strong> refers to: New York, United States.</li>
                            <li><strong className="text-white">Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in these Terms and Conditions) refers to VisionSpeak AI, 200 Park Ave, New York, NY 10166, United States.</li>
                            <li><strong className="text-white">Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.</li>
                            <li><strong className="text-white">Service</strong> refers to the Website.</li>
                            <li><strong className="text-white">Terms and Conditions</strong> (also referred to as "Terms") means these Terms and Conditions, including any documents expressly incorporated by reference, which govern Your access to and use of the Service and form the entire agreement between You and the Company regarding the Service.</li>
                            <li><strong className="text-white">Third-Party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third party that is displayed, included, made available, or linked to through the Service.</li>
                            <li><strong className="text-white">Website</strong> refers to VisionSpeak AI, accessible from <a href="https://visionspeakai.com" className="text-cyan-400 hover:underline">https://visionspeakai.com</a></li>
                            <li><strong className="text-white">You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                        </ul>

                        <h2 className="text-white mt-12 mb-6 border-b border-white/10 pb-2">Acknowledgment</h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                        </p>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
                        </p>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
                        </p>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
                        </p>
                        <p className="text-slate-400 leading-relaxed mb-12">
                            Your access to and use of the Service is also subject to Our Privacy Policy. Please read Our Privacy Policy carefully before using Our Service.
                        </p>

                        <h2 className="text-white mt-12 mb-6 border-b border-white/10 pb-2">Termination</h2>
                        <p className="text-slate-400 leading-relaxed mb-12">
                            We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions. Upon termination, Your right to use the Service will cease immediately.
                        </p>

                        <h2 className="text-white mt-12 mb-6 border-b border-white/10 pb-2">Limitation of Liability</h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
                        </p>
                        <p className="text-slate-400 leading-relaxed mb-12">
                            To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, or loss of privacy).
                        </p>

                        <h2 className="text-white mt-12 mb-6 border-b border-white/10 pb-2">"AS IS" and "AS AVAILABLE" Disclaimer</h2>
                        <p className="text-slate-400 leading-relaxed mb-12">
                            The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company expressly disclaims all warranties, whether express, implied, statutory or otherwise.
                        </p>

                        <h2 className="text-white mt-12 mb-6 border-b border-white/10 pb-2">Governing Law</h2>
                        <p className="text-slate-400 leading-relaxed mb-12">
                            The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
                        </p>

                        <h2 className="text-white mt-12 mb-6 border-b border-white/10 pb-2">Contact Us</h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            If you have any questions about these Terms and Conditions, You can contact us:
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
