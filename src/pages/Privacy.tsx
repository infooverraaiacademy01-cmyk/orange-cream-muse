import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const Privacy = () => (
  <PageTransition>
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            Privacy Policy
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-14 prose prose-sm max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          <strong>Last updated:</strong>{" "}
          {new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          General Data Protection Regulation (GDPR)
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          This notice explains how B-Panacea Education collects, processes, and
          protects your personal data in accordance with GDPR.
        </p>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          GDPR Principles
        </h2>
        <ul className="text-muted-foreground space-y-1 list-disc pl-5">
          <li>Lawfulness, fairness and transparency</li>
          <li>Purpose limitation</li>
          <li>Data minimisation</li>
          <li>Accuracy</li>
          <li>Storage limitation</li>
          <li>Integrity and confidentiality</li>
        </ul>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          Data Controller
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          B-Panacea Education is the data controller responsible for your
          personal data.
        </p>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          Lawful Processing
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We process your data under GDPR Article 6(1)(a), (b), and (c), based
          on your consent, contractual necessity, and legal obligations.
        </p>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          Information We Collect
        </h2>
        <ul className="text-muted-foreground space-y-1 list-disc pl-5">
          <li>Information you provide through forms</li>
          <li>Communication records</li>
          <li>Survey responses (optional)</li>
          <li>Service-related details</li>
          <li>Website usage data (e.g. traffic, logs)</li>
        </ul>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          How We Use Your Data
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Your data is used for administration, service delivery, communication,
          and improving customer experience.
        </p>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          Consent
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          By submitting your data, you consent to its processing. You may opt out
          of marketing communications at any time.
        </p>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          Cookies
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We use cookies to improve user experience, analyse traffic, and
          personalise content. You can disable cookies in your browser settings.
        </p>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          Your Rights
        </h2>
        <ul className="text-muted-foreground space-y-1 list-disc pl-5">
          <li>Access your data</li>
          <li>Request correction</li>
          <li>Request deletion</li>
          <li>Object to processing</li>
          <li>Withdraw consent</li>
        </ul>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          Data Requests
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          You may request access to your data. We respond within 30 days unless
          the request is complex.
        </p>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          Rectification & Erasure
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          You have the right to correct inaccurate data or request deletion,
          subject to legal obligations.
        </p>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          Disclosure of Information
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We may share your data where required by law or with trusted partners
          for service delivery.
        </p>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          Policy Updates
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We may update this policy from time to time to reflect legal or
          operational changes.
        </p>

        <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">
          Contact Us
        </h2>
        <p className="text-muted-foreground">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:info@bpanacea.co.uk"
            className="text-accent hover:underline"
          >
            info@bpanacea.co.uk
          </a>
          <br />
          <strong>Phone:</strong> +44 7774 587556
          <br />
          <strong>Address:</strong> Brownhill Road, London, England, SE6 2BQ
        </p>
      </div>
    </div>
  </PageTransition>
);

export default Privacy;
