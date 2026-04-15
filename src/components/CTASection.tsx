import AnimatedSection from "./AnimatedSection";

const CTASection = () => (
  <section id="contact" className="py-20 sm:py-28 bg-primary text-primary-foreground relative overflow-hidden">
    {/* Background pattern */}
    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
    <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
    
    <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-12 text-center relative">
      <AnimatedSection>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance leading-tight">
          Give Your Child the Support They Need to Succeed.
        </h2>
        <p className="text-base sm:text-lg text-primary-foreground/75 mb-10 max-w-lg mx-auto">
          Start today with personalised one-to-one tutoring.
        </p>
        <a
          href="#contact"
          className="group inline-flex items-center gap-3 px-10 py-4.5 rounded-full bg-accent text-accent-foreground font-bold text-base tracking-wide hover:brightness-110 transition-all duration-400 shadow-xl shadow-accent/25 hover:shadow-2xl hover:-translate-y-1"
        >
          Book a Tutor Now
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </AnimatedSection>
    </div>
  </section>
);

export default CTASection;