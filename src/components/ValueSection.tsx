import AnimatedSection from "./AnimatedSection";

const values = [
  {
    number: "01",
    title: "One-to-One Personalised Learning",
    desc: "Every session is tailored to your child's unique needs, strengths, and goals.",
    accentColor: "border-primary",
  },
  {
    number: "02",
    title: "Virtual & Physical Classes",
    desc: "Flexible learning options — online from anywhere or face-to-face in the comfort of your home.",
    accentColor: "border-accent",
  },
  {
    number: "03",
    title: "Real Academic Improvement",
    desc: "Focused tutoring that delivers measurable progress and builds lasting confidence.",
    accentColor: "border-primary",
  },
];

const ValueSection = () => (
  <section id="about" className="py-20 sm:py-28 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-background" />
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 relative">
      <AnimatedSection className="text-center mb-14 sm:mb-20">
        <div className="gold-bar mx-auto mb-5" />
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-balance">
          Simple Support. Real Results.
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {values.map((v, i) => (
          <AnimatedSection key={v.title} delay={i * 0.15}>
            <div className={`card-premium p-7 sm:p-9 h-full group border-l-4 ${v.accentColor}`}>
              <span className="font-display text-5xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors duration-500">
                {v.number}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-primary mb-3 mt-4">{v.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ValueSection;
