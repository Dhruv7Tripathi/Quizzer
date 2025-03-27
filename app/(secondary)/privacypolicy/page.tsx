import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

        <div className="space-y-8 text-black">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">1. Information We Collect</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-black">Personal Information</h3>
              <p className="leading-relaxed">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and email address when you create an account</li>
                <li>Profile information you choose to add</li>
                <li>Content you create, share, or upload</li>
                <li>Communications with us</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">2. How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">3. Information Sharing</h2>
            <p className="leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">4. Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">5. Your Rights</h2>
            <p className="leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to our processing of your data</li>
              <li>Request data portability</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" className="bg-transparent border-white/30 text-black hover:bg-white/10">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}