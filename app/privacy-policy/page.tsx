import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Apollo Fitness',
  description: 'How Apollo Fitness Studio handles your data.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-apollo-black text-apollo-muted py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-apollo-teal text-sm hover:underline mb-8 inline-block">
          ← Back to site
        </Link>

        <h1 className="font-display text-3xl text-white mb-2">Privacy Policy</h1>
        <p className="text-sm mb-10">Last updated: 23 March 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-display text-lg mb-2">Who we are</h2>
            <p>Apollo Fitness Studio, based in Maidenhead, UK. If you have questions about this policy, email us at apollofitnessstudio@gmail.com.</p>
          </section>

          <section>
            <h2 className="text-white font-display text-lg mb-2">What we collect</h2>
            <p>When you fill in our trial booking form we collect your name, phone number, email address, preferred start date, training goals, availability, and how you heard about us. We use this solely to get you booked in and follow up about your trial.</p>
          </section>

          <section>
            <h2 className="text-white font-display text-lg mb-2">How we use it</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To contact you about your free trial or membership</li>
              <li>To tailor your training experience</li>
              <li>To send occasional updates about classes or schedules (you can opt out anytime)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-display text-lg mb-2">Where it goes</h2>
            <p>Form submissions are stored in Google Workspace. We don&apos;t sell or share your data with third parties. Our website is hosted on Vercel and uses basic analytics — no advertising trackers.</p>
          </section>

          <section>
            <h2 className="text-white font-display text-lg mb-2">Your rights</h2>
            <p>You can ask us to see, update, or delete your personal data at any time. Just email apollofitnessstudio@gmail.com and we&apos;ll sort it within 30 days.</p>
          </section>

          <section>
            <h2 className="text-white font-display text-lg mb-2">Cookies</h2>
            <p>We use essential cookies only (no tracking or advertising cookies). Third-party embeds (Instagram, Vimeo) may set their own cookies when loaded.</p>
          </section>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 text-xs">
          <p>© {new Date().getFullYear()} Apollo Fitness Studio. All rights reserved.</p>
        </div>
      </div>
    </main>
  )
}
