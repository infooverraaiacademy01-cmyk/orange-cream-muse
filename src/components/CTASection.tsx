import AnimatedSection from "./AnimatedSection";

const CTASection = () => (
  <section id="contact" className="py-16 sm:py-24 bg-primary text-primary-foreground">
    <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-12 text-center">
      <AnimatedSection>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-5">
          Give Your Child the Support They Need to Succeed.
        </h2>
        <p className="text-base sm:text-lg text-primary-foreground/80 mb-8">
          Start today with personalised one-to-one tutoring.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-bold text-sm sm:text-base tracking-wide hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Book a Tutor Now
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </AnimatedSection>
    </div>
  </section>
);

export default CTASection;
