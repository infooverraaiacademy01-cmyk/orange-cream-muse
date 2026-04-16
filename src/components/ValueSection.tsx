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
      {/* About Us — Vision & Mission */}
      <AnimatedSection className="text-center mb-16 sm:mb-20">
        <div className="gold-bar mx-auto mb-5" />
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
          About Us
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
          B-Panacea Education is a UK-based educational consultancy dedicated to unlocking every child's true potential through expert, personalised one-to-one tutoring for pupils aged 5–18.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto text-left">
          <div className="card-premium p-7 sm:p-9 border-l-4 border-accent">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-primary">Our Vision</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              To be the UK's most trusted and transformative education partner — where every child, regardless of background or ability, has the opportunity to study, think, create, and grow into their fullest potential.
            </p>
          </div>

          <div className="card-premium p-7 sm:p-9 border-l-4 border-primary">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-primary">Our Mission</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              To deliver exceptional, personalised one-to-one tutoring that empowers UK pupils aged 5–18 to achieve academic excellence, build confidence, and develop a lifelong love of learning — through expert tutors, flexible delivery, and unwavering commitment to every learner's success.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Value Cards */}
      <AnimatedSection className="text-center mb-14 sm:mb-20">
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary text-balance">
          Simple Support. Real Results.
        </h3>
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
