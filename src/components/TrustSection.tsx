import AnimatedSection from "./AnimatedSection";

const TrustSection = () => (
  <section className="py-16 sm:py-24 bg-secondary">
    <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-12 text-center">
      <AnimatedSection>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-6">
          Support You Can Trust
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          We work closely with parents to ensure every pupil receives the
          guidance, structure, and encouragement they need to succeed.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default TrustSection;
