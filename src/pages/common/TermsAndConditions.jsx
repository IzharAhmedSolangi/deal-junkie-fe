/* eslint-disable react/no-unescaped-entities */

import AppHead from "../../seo/AppHead";

const TermsAndConditions = () => {
  return (
    <>
      <AppHead title="Terms & Conditions - Deal Junkie" />
      <div className="bg-white w-full h-auto relative">
        <div className="w-full md:h-[320px] h-[260px] flex justify-center items-center">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            Terms & Conditions
          </h1>
        </div>
        <div className="max-w-4xl mx-auto px-2 pt-8 pb-40">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Terms and Conditions – Deal Junkie
          </h1>
          <p className="text-gray-600 mb-6">Effective Date: April 6, 2025</p>

          <div className="prose prose-lg text-gray-700 mb-6">
            <p className="mb-4">
              Welcome to Deal Junkie! These Terms of Service ("Terms") govern
              your use of www.dealjunkie.net and our services. By using our
              platform, you agree to be bound by these Terms.
            </p>

            <div className="flex flex-col gap-4">
              {/* Section 1 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  1. Account Registration
                </h2>
                <p>To use Deal Junkie, you must:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Be at least 18 years old</li>
                  <li>Provide accurate, complete account information</li>
                  <li>Keep your login credentials secure and confidential</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  2. Use of the Platform
                </h2>
                <p>You agree to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Use the platform only for lawful purposes</li>
                  <li>
                    Not circumvent our payment system or transact off-platform
                  </li>
                  <li>Not upload harmful, misleading, or infringing content</li>
                </ul>
                <p className="mt-4">
                  Deal Junkie may suspend or terminate accounts for any misuse
                  or violation of these Terms.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  3. Fees & Payments
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Clients pay the agreed-upon project fee</li>
                  <li>
                    Service providers are paid the project fee minus a platform
                    fee (typically 20%)
                  </li>
                  <li>
                    Corporate subscriptions provide enhanced access and
                    discounted rates as described on the Pricing Page
                  </li>
                </ul>
                <p className="mt-4">
                  All payments are processed via third-party providers, and
                  funds are held in escrow until project completion.
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  4. Intellectual Property
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Content submitted by users remains their property</li>
                  <li>
                    You grant Deal Junkie a non-exclusive license to display
                    your content on the platform as necessary
                  </li>
                  <li>
                    All platform branding, design, and code remain the property
                    of Deal Junkie, LLC.
                  </li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  5. Disintermediation
                </h2>
                <p>
                  Users may not solicit or complete transactions outside the
                  platform. Doing so may result in account suspension, financial
                  penalties, or legal action.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  6. Disputes & Resolution
                </h2>
                <p>
                  We encourage users to resolve conflicts directly. If
                  unresolved, Deal Junkie may assist with mediation but does not
                  guarantee resolution.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  7. Disclaimers & Limitation of Liability
                </h2>
                <p>
                  We do not guarantee the accuracy, availability, or performance
                  of any user or project outcome.
                </p>
                <p className="mt-4">
                  To the fullest extent permitted by law, Deal Junkie is not
                  liable for indirect, incidental, or consequential damages.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  8. Governing Law
                </h2>
                <p>
                  These Terms are governed by the laws of the State of Delaware,
                  USA, without regard to conflict of law principles.
                </p>
              </div>

              {/* Section 9 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  9. Contact Us
                </h2>
                <p>
                  If you have questions about these Terms or our Privacy Policy,
                  please contact us at:
                </p>
                <p className="mt-2 font-medium">
                  Email: support@dealjunkie.net
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
