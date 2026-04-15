import AnimatedSection from "./AnimatedSection";
import { CheckCircle } from "lucide-react";

const reasons = [
  "Experienced and dedicated tutors",
  "Personalised learning approach",
  "One-to-one focused sessions",
  "Virtual and in-person flexibility",
  "Supportive and encouraging environment",
  "All tutors hold current Enhanced DBS certification",
];

const WhyChooseUs = () => (
  <section id="why-us" className="py-16 sm:py-24 bg-secondary">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <AnimatedSection className="text-center mb-12 sm:mb-16">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
          Why Parents Choose Us
        </h2>
      </AnimatedSection>

      <div className="max-w-2xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {reasons.map((r, i) => (
            <AnimatedSection key={r} delay={i * 0.08}>
              <div className="flex items-start gap-3 bg-background rounded-xl p-4 shadow-sm">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-foreground font-medium">{r}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
