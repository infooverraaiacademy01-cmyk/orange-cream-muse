import AnimatedSection from "./AnimatedSection";
import confidentStudent from "@/assets/confident-student.jpg";

const reasons = [
  "Experienced and dedicated tutors",
  "Personalised learning approach",
  "One-to-one focused sessions",
  "Virtual and in-person flexibility",
  "Supportive and encouraging environment",
  "All tutors hold current Enhanced DBS certification",
];

const WhyChooseUs = () => (
  <section id="why-us" className="py-20 sm:py-28 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-background" />
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-primary/10">
            <img src={confidentStudent} alt="Confident UK school pupil smiling with books" className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover" loading="lazy" width={800} height={600} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
        </AnimatedSection>

        <div>
          <AnimatedSection>
            <div className="gold-bar mb-5" />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-8 leading-tight">
              Why Parents Choose Us
            </h2>
          </AnimatedSection>

          <div className="space-y-4 sm:space-y-5">
            {reasons.map((r, i) => (
              <AnimatedSection key={r} delay={i * 0.08}>
                <div className="flex items-center gap-4 bg-background rounded-2xl p-5 sm:p-6 shadow-sm border border-border/50 hover:shadow-md hover:border-accent/30 transition-all duration-300">
                  <span className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 font-display text-sm font-bold text-accent">
                    ✓
                  </span>
                  <span className="text-sm sm:text-base text-foreground font-semibold">{r}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
