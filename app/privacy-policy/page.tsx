import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Apollo Fitness",
  description: "How Apollo Fitness Studio handles your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-apollo-black text-apollo-muted min-h-screen px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-apollo-teal mb-8 inline-block text-sm hover:underline"
        >
          ← Back to site
        </Link>

        <h1 className="font-display mb-2 text-3xl text-white">
          Privacy Policy
        </h1>
        <p className="mb-10 text-sm">Last updated: 15 June 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="font-display mb-2 text-lg text-white">Who we are</h2>
            <p>
              Apollo Fitness Studio, based in Maidenhead, UK. If you have
              questions about this policy, email us at
              apollofitnessstudio@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-2 text-lg text-white">
              What we collect
            </h2>
            <p>
              When you use our trial booking flow, your name, phone number,
              email address, preferred start date, training goals, availability,
              and how you heard about us are used to prepare a WhatsApp message
              to Apollo Fitness Studio. We use this solely to get you booked in
              and follow up about your trial.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-2 text-lg text-white">
              How we use it
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>To contact you about your free trial or membership</li>
              <li>To tailor your training experience</li>
              <li>
                To send occasional updates about classes or schedules (you can
                opt out anytime)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display mb-2 text-lg text-white">
              Where it goes
            </h2>
            <p>
              Trial enquiries are sent through WhatsApp rather than stored by
              this website. We don&apos;t sell or share your data with third
              parties. Our website is hosted on Vercel and uses basic analytics
              — no advertising trackers.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-2 text-lg text-white">
              Your rights
            </h2>
            <p>
              You can ask us to see, update, or delete your personal data at any
              time. Just email apollofitnessstudio@gmail.com and we&apos;ll sort
              it within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-2 text-lg text-white">Cookies</h2>
            <p>
              We use essential cookies only (no tracking or advertising
              cookies). Third-party embeds (Instagram, Vimeo) may set their own
              cookies when loaded.
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 text-xs">
          <p>
            © {new Date().getFullYear()} Apollo Fitness Studio. All rights
            reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
