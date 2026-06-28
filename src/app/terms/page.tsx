import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: 'Terms and Conditions',
  description: 'Booking terms and conditions for Casa Malacitano vacation rental in Valle de Abdalajís, Andalusia.',
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-casa-stone font-sans text-casa-text">
      <SiteHeader />

      <main className="pt-24 md:pt-28">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20">

          <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-serif text-casa-text mb-4 leading-tight">Terms and Conditions</h1>
          <p className="text-casa-text-light mb-3">Last updated: June 2026</p>
          <p className="text-sm bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-800 mb-12">
            Items marked <strong>[FILL IN]</strong> need to be completed by the property owners before publication.
          </p>

          <div className="prose prose-lg max-w-none text-casa-text-light space-y-10">

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">1. Parties</h2>
              <p>
                These terms apply to all bookings made with <strong>[Full legal name(s) of owners — e.g. Jan and Minouche de Vries]</strong>,
                owners of Casa Malacitano, Cam. de la Fuente de La Zarza, 29240 Valle de Abdalajís, Málaga, Spain
                (hereinafter "we", "us" or "the owner").
              </p>
              <p className="mt-2">
                The "guest" or "you" refers to the lead guest who makes the booking and accepts these terms on behalf of all members of the party.
              </p>
              <p className="mt-2">
                Tourism licence: <strong>CTC-2022245591</strong>. These terms are governed by Spanish law and the regional regulations
                of the Community of Andalusia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">2. The properties</h2>
              <p>Casa Malacitano offers two holiday accommodations on the same estate:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <strong>Casita Malacitano</strong> — boutique guesthouse, maximum <strong>3 guests</strong>.
                  Private terrace, pool access, mountain views.
                </li>
                <li>
                  <strong>Casa Malacitano</strong> — villa, maximum <strong>6 guests</strong>.
                  Large private terrace, shared pool, panoramic views.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">3. Booking and payment</h2>
              <p>
                A booking is confirmed once we have accepted your reservation in writing (by email or via our booking platform)
                and received the required deposit.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong>Deposit:</strong> [FILL IN — e.g. 30%] of the total booking amount is due at the time of booking.</li>
                <li><strong>Balance:</strong> The remaining amount is due [FILL IN — e.g. 6 weeks / 30 days] before arrival.</li>
                <li><strong>Payment methods:</strong> [FILL IN — e.g. bank transfer, credit card via booking platform].</li>
                <li>All prices are in euros and include [FILL IN — e.g. bed linen, towels, pool use, WiFi, final cleaning]. Air conditioning is charged separately at €5 per night for Casita Malacitano (included for Casa Malacitano).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">4. Cancellation policy</h2>
              <p>Cancellations must be submitted in writing to <a href="mailto:info.malacitano@gmail.com" className="text-casa-teal hover:underline">info.malacitano@gmail.com</a>.</p>

              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-6 font-semibold text-casa-text">Notice before arrival</th>
                      <th className="text-left py-2 font-semibold text-casa-text">Amount retained</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 pr-6">More than 60 days</td>
                      <td className="py-2">[FILL IN — e.g. deposit only]</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-6">30 to 60 days</td>
                      <td className="py-2">[FILL IN — e.g. 50% of total]</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-6">15 to 29 days</td>
                      <td className="py-2">[FILL IN — e.g. 75% of total]</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-6">Less than 15 days</td>
                      <td className="py-2">[FILL IN — e.g. 100% of total]</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm">
                We strongly recommend taking out travel insurance that covers cancellation costs.
                We are not responsible for losses due to flight cancellations, illness, or other circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">5. Check-in and check-out</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Check-in:</strong> from 15:00 (3 pm). Earlier check-in may be arranged subject to availability.</li>
                <li><strong>Check-out:</strong> by 11:00 (11 am). Late check-out may be arranged subject to availability.</li>
                <li>Arrival instructions and key handover details will be sent by email prior to your stay.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">6. Security deposit</h2>
              <p>
                A refundable security deposit of <strong>[FILL IN — e.g. €[amount]]</strong> is required [FILL IN — e.g. by bank transfer 14 days before arrival / at check-in in cash / by credit card authorisation]. The deposit will be returned within [FILL IN — e.g. 7 days] of departure, provided the property is left in good condition with no damage beyond normal wear and tear.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">7. Maximum occupancy</h2>
              <p>
                The maximum number of guests must not be exceeded at any time: Casita Malacitano (3 guests), Casa Malacitano (6 guests).
                Exceeding the stated occupancy is not permitted and may result in immediate termination of the rental without refund.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">8. House rules</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Smoking:</strong> [FILL IN — e.g. Smoking is not permitted inside either property. Smoking is permitted on the outdoor terraces.]</li>
                <li><strong>Pets:</strong> [FILL IN — e.g. Pets are not permitted / Pets are welcome with prior agreement. Please contact us before booking.]</li>
                <li><strong>Noise:</strong> We ask guests to respect the quiet of the surrounding village. Loud music or noise after 23:00 is not permitted.</li>
                <li><strong>Events and parties:</strong> The properties may not be used for events, parties or gatherings beyond the stated number of guests without our prior written consent.</li>
                <li><strong>Pool:</strong> Children must be supervised at all times near the pool. Swimming alone at night is not permitted. Please shower before entering the pool.</li>
                <li><strong>Property care:</strong> Guests are expected to leave the property in a reasonable state of cleanliness. Dishes should be washed and rubbish placed in the designated bins.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">9. Guest identification</h2>
              <p>
                Under Spanish law (Real Decreto 933/2021), all guests aged 14 and over must provide valid identification
                (passport or national ID card) upon arrival. This data is reported to the Spanish authorities. By accepting
                these terms you confirm that all members of your party will provide the required documentation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">10. Our right to cancel</h2>
              <p>
                In exceptional circumstances (e.g. serious damage to the property, force majeure) we reserve the right to
                cancel a booking. In such cases we will notify you as soon as possible and refund all payments received in full.
                We are not liable for additional costs such as flights or alternative accommodation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">11. Liability</h2>
              <p>
                We are not liable for any loss, damage, injury or inconvenience suffered by guests or their property during
                their stay, except where caused by our negligence. Guests use the pool, terraces and other outdoor facilities
                at their own risk. We are not responsible for theft from the property.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">12. Governing law and disputes</h2>
              <p>
                These terms are governed by the laws of Spain. Any disputes that cannot be resolved amicably will be submitted
                to the competent courts of Málaga, Spain.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-casa-text mb-3">13. Contact</h2>
              <p>
                Questions about these terms can be directed to:{' '}
                <a href="mailto:info.malacitano@gmail.com" className="text-casa-teal hover:underline">info.malacitano@gmail.com</a>{' '}
                or +34 680 922 373.
              </p>
            </section>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
