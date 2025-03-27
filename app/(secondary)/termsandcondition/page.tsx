import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms and Conditions</h1>

        <div className="space-y-8 text-black">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using Quizzer, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">2. User Accounts</h2>
            <p className="leading-relaxed">
              You must be at least 13 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">3. Content Guidelines</h2>
            <p className="leading-relaxed">
              Users are responsible for the content they create and share on Quizzer. Content must not:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Violate intellectual property rights</li>
              <li>Contain inappropriate or offensive material</li>
              <li>Include misleading or false information</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">4. Intellectual Property</h2>
            <p className="leading-relaxed">
              The Quizzer platform, including its original content, features, and functionality, is owned by Quizzer and protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">5. Termination</h2>
            <p className="leading-relaxed">
              We reserve the right to terminate or suspend your account and access to Quizzer at our sole discretion, without notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" className="bg-transparent border-black text-black hover:bg-white/10">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}