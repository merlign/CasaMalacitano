import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Casa Malacitano — how we collect, use and protect your personal data.',
  robots: { index: false },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-casa-stone font-sans text-casa-text">
      <SiteHeader />

      <main className="pt-24 md:pt-28">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20">

          <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-serif text-casa-text mb-4 leading-tight">Privacy Policy</h1>
          <p className="text-casa-text-light mb-12">Last updated: June 2026</p>

          <div className="prose prose-lg max-w-none text-casa-text-light space-y-10">

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">1. Who we are</h2>
              <p>
                This website is operated by <strong>Jans Pijbes and Minouche van den Bor</strong>, trading as Casa Malacitano,
                located at Cam. de la Fuente de La Zarza, 29240 Valle de Abdalajís, Málaga, Spain.
              </p>
              <p className="mt-2">
                We are the data controller for the personal data collected through this website. You can reach us at{' '}
                <a href="mailto:info.malacitano@gmail.com" className="text-casa-teal hover:underline">info.malacitano@gmail.com</a>{' '}
                or by phone at +34 680 922 373.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">2. What data we collect and why</h2>

              <h3 className="font-semibold text-casa-text mt-5 mb-2">2.1 Enquiries and bookings</h3>
              <p>
                When you contact us or make a booking, we collect: your name, email address, phone number, number of guests,
                and the dates of your stay. We use this to respond to your enquiry, confirm your booking, and communicate
                information relevant to your stay.
              </p>
              <p className="mt-2">
                <strong>Legal basis:</strong> performance of a contract (Art. 6(1)(b) GDPR) and our legitimate interest in
                responding to enquiries (Art. 6(1)(f) GDPR).
              </p>

              <h3 className="font-semibold text-casa-text mt-5 mb-2">2.2 Guest identification — Spanish law</h3>
              <p>
                Spanish law (Real Decreto 933/2021) requires accommodation providers to collect and retain specific identification
                data from all guests aged 14 and over (full name, date of birth, nationality, ID/passport number, and date of arrival).
                This data is reported to the Spanish authorities (Guardia Civil / Policía Nacional) and retained for a minimum of
                three years.
              </p>
              <p className="mt-2">
                <strong>Legal basis:</strong> compliance with a legal obligation (Art. 6(1)(c) GDPR).
              </p>

              <h3 className="font-semibold text-casa-text mt-5 mb-2">2.3 Website analytics (Google Analytics)</h3>
              <p>
                With your consent, we use Google Analytics 4 to understand how visitors use our website. This involves the
                collection of anonymised usage data (pages visited, time spent, device type). No personally identifiable
                information is shared with Google. IP addresses are anonymised.
              </p>
              <p className="mt-2">
                <strong>Legal basis:</strong> your consent (Art. 6(1)(a) GDPR). You can withdraw consent at any time by
                clicking "Cookie preferences" in the footer.
              </p>

              <h3 className="font-semibold text-casa-text mt-5 mb-2">2.4 Cookies</h3>
              <p>
                We use strictly necessary cookies to ensure the website functions correctly. Analytics cookies are only placed
                after you give explicit consent. See our cookie section below for details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">3. How long we keep your data</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Enquiry data (no booking made): deleted within 12 months of last contact.</li>
                <li>Booking and payment data: retained for 7 years (tax and accounting obligations under Spanish law).</li>
                <li>Guest identification data required by Spanish law: retained for a minimum of 3 years.</li>
                <li>Analytics data: retained by Google Analytics for 14 months (our configured retention period).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">4. Who we share your data with</h2>
              <p>We do not sell your personal data. We may share data with:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Spanish authorities</strong> — guest identification data as required by law.</li>
                <li><strong>Google LLC</strong> — anonymised analytics data (via Google Analytics), processed under a Data Processing Agreement. Google may transfer data to the United States under Standard Contractual Clauses.</li>
                <li><strong>Our booking platform</strong> — if you book via a third-party platform (e.g. Booking.com, Airbnb), their privacy policy applies to data shared through that platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">5. Your rights under GDPR</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
                <li><strong>Rectification</strong> — ask us to correct inaccurate or incomplete data.</li>
                <li><strong>Erasure</strong> — ask us to delete your data, where no legal obligation requires us to retain it.</li>
                <li><strong>Restriction</strong> — ask us to limit how we use your data in certain circumstances.</li>
                <li><strong>Portability</strong> — receive your data in a machine-readable format.</li>
                <li><strong>Object</strong> — object to processing based on legitimate interest.</li>
                <li><strong>Withdraw consent</strong> — withdraw consent for analytics cookies at any time.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:info.malacitano@gmail.com" className="text-casa-teal hover:underline">info.malacitano@gmail.com</a>.
                We will respond within 30 days. You also have the right to lodge a complaint with the Spanish data protection
                authority (AEPD) at <a href="https://www.aepd.es" className="text-casa-teal hover:underline" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">6. Cookies</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse mt-2">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4 font-semibold text-casa-text">Cookie</th>
                      <th className="text-left py-2 pr-4 font-semibold text-casa-text">Type</th>
                      <th className="text-left py-2 font-semibold text-casa-text">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs">cookie-consent</td>
                      <td className="py-2 pr-4">Strictly necessary</td>
                      <td className="py-2">Stores your cookie consent preference (localStorage). No personal data.</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs">_ga, _ga_*</td>
                      <td className="py-2 pr-4">Analytics</td>
                      <td className="py-2">Google Analytics — measures website traffic. Only set after consent.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">7. Data security</h2>
              <p>
                This website is served over HTTPS. We take reasonable technical and organisational measures to protect
                your personal data against unauthorised access, loss or disclosure. Email communication is not encrypted
                end-to-end; for sensitive matters, please call us directly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">8. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The date at the top of this page indicates when it was last revised.
                Continued use of the website after changes constitutes acceptance of the updated policy.
              </p>
            </section>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
