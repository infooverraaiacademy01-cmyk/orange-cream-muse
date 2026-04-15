import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const Privacy = () => (
  <PageTransition>
    <div className="bg-primary text-primary-foreground py-8">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
      </div>
    </div>

    <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-14 prose prose-sm max-w-none">
      <p className="text-muted-foreground leading-relaxed">
        <strong>Last updated:</strong> {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
      </p>

      <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">1. Who We Are</h2>
      <p className="text-muted-foreground leading-relaxed">
        B-Panacea Education ("we", "our", "us") is an educational consultancy based at 163 Brownhill Road, London, England, SE6 2BQ. We provide one-to-one personalised tutoring services for learners aged 5–18 across the UK.
      </p>

      <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">2. Information We Collect</h2>
      <p className="text-muted-foreground leading-relaxed">We may collect and process the following personal data:</p>
      <ul className="text-muted-foreground space-y-1 list-disc pl-5">
        <li>Names of parents/guardians and learners</li>
        <li>Contact details (email, phone/WhatsApp)</li>
        <li>Learner age, year group, and educational needs</li>
        <li>Information about special educational needs (SEN)</li>
        <li>Scheduling preferences</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">3. How We Use Your Information</h2>
      <p className="text-muted-foreground leading-relaxed">We use your personal data to:</p>
      <ul className="text-muted-foreground space-y-1 list-disc pl-5">
        <li>Match learners with suitable tutors</li>
        <li>Create personalised learning plans</li>
        <li>Communicate about sessions and progress</li>
        <li>Improve our services</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">4. Data Protection</h2>
      <p className="text-muted-foreground leading-relaxed">
        We are committed to protecting your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. We implement appropriate technical and organisational measures to safeguard your information.
      </p>

      <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">5. Your Rights</h2>
      <p className="text-muted-foreground leading-relaxed">Under UK data protection law, you have the right to:</p>
      <ul className="text-muted-foreground space-y-1 list-disc pl-5">
        <li>Access your personal data</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Object to processing of your data</li>
        <li>Withdraw consent at any time</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">6. Cookies</h2>
      <p className="text-muted-foreground leading-relaxed">
        Our website uses essential cookies to ensure functionality. We may also use analytics cookies to understand how visitors interact with our site. You can manage cookie preferences through your browser settings.
      </p>

      <h2 className="font-display text-xl font-bold text-primary mt-8 mb-3">7. Contact Us</h2>
      <p className="text-muted-foreground leading-relaxed">
        If you have any questions about this privacy policy or wish to exercise your rights, please contact us at:
      </p>
      <p className="text-muted-foreground">
        <strong>Email:</strong>{" "}
        <a href="mailto:info@bpanacea.co.uk" className="text-accent hover:underline">info@bpanacea.co.uk</a>
        <br />
        <strong>Phone:</strong> +44 7774 587556
        <br />
        <strong>Address:</strong> 163 Brownhill Road, London, England, SE6 2BQ
      </p>
    </div>
  </div>
);

export default Privacy;
