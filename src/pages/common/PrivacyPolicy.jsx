/* eslint-disable react/no-unescaped-entities */

import AppHead from "../../seo/AppHead";

const PrivacyPolicy = () => {
  return (
    <>
      <AppHead title="Privacy Policy - Deal Junkie" />
      <div className="bg-white w-full h-auto relative">
        <div className="w-full md:h-[320px] h-[260px] flex justify-center items-center">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            Privacy Policy
          </h1>
        </div>
        <div className="max-w-4xl mx-auto px-2 pt-8 pb-40">
          <header className="mb-5">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Privacy Policy – Deal Junkie
            </h1>
            <p className="text-gray-600">Effective Date: April 6, 2025</p>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              Deal Junkie ("we," "us," or "our") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, share,
              and protect your personal information when you use
              www.dealjunkie.com (the "Site") and our related services.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                1. Information We Collect
              </h2>
              <p className="mb-2">
                We may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Account Information:</strong> Name, email, phone
                  number, password, and company affiliation.
                </li>
                <li>
                  <strong>Payment Information:</strong> Billing data submitted
                  during transactions (processed securely via third-party
                  providers).
                </li>
                <li>
                  <strong>User Content:</strong> Messages, files, and project
                  details shared through our platform.
                </li>
                <li>
                  <strong>Usage Data:</strong> Device info, IP address, browser
                  type, interaction data.
                </li>
                <li>
                  <strong>Cookies and Tracking:</strong> To enhance user
                  experience and improve site performance.
                </li>
              </ul>
            </section>

            <section className="mb-5">
              <h2 className="text-2xl font-semibold text-gray-800">
                2. How We Use Your Information
              </h2>
              <p className="mb-2">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Operate and improve our platform and services</li>
                <li>Facilitate transactions between buyers and providers</li>
                <li>Provide customer support and communicate updates</li>
                <li>
                  Prevent fraud, enforce our Terms, and comply with legal
                  obligations
                </li>
              </ul>
            </section>

            <section className="mb-5">
              <h2 className="text-2xl font-semibold text-gray-800">
                3. Sharing of Information
              </h2>
              <p className="mb-2">
                We do not sell your personal data. We may share information
                with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Third-party service providers for payment processing and
                  infrastructure
                </li>
                <li>Law enforcement or government bodies if required by law</li>
                <li>
                  Affiliates or successors in the event of a merger or
                  acquisition
                </li>
              </ul>
            </section>

            <section className="mb-5">
              <h2 className="text-2xl font-semibold text-gray-800">
                4. Your Choices and Rights
              </h2>
              <p className="mb-2">You may:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Access or update your account information at any time</li>
                <li>Request deletion of your account and associated data</li>
                <li>
                  Control cookie preferences through your browser settings
                </li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a
                  href="mailto:support@dealjunkie.net"
                  className="text-blue-600 hover:underline"
                >
                  support@dealjunkie.net
                </a>
                .
              </p>
            </section>

            <section className="mb-5">
              <h2 className="text-2xl font-semibold text-gray-800">
                5. Data Security
              </h2>
              <p>
                We implement industry-standard encryption, firewalls, and access
                controls to protect your data. However, no method of
                transmission is 100% secure.
              </p>
            </section>

            <section className="mb-5">
              <h2 className="text-2xl font-semibold text-gray-800">
                6. Children&apos;s Privacy
              </h2>
              <p>
                Our platform is intended for users 18 and older. We do not
                knowingly collect data from minors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800">
                7. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Revisions
                will be posted with an updated "Effective Date."
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
