import AnimatedSection from "./AnimatedSection";

const TrustSection = () => (
  <section className="py-20 sm:py-28 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-background" />
    <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-12 text-center relative">
      <AnimatedSection>
        <span className="text-5xl mb-6 block">🛡️</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-7 text-balance">
          Support You Can Trust
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          We work closely with parents to ensure every pupil receives the
          guidance, structure, and encouragement they need to succeed.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default TrustSection;
