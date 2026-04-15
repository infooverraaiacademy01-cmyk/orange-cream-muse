import AnimatedSection from "./AnimatedSection";
import { Users, Monitor, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "One-to-One Personalised Learning",
    desc: "Every session is tailored to your child's unique needs, strengths, and goals.",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    icon: Monitor,
    title: "Virtual & Physical Classes",
    desc: "Flexible learning options — online from anywhere or face-to-face in the comfort of your home.",
    gradient: "from-accent/15 to-accent/5",
  },
  {
    icon: TrendingUp,
    title: "Real Academic Improvement",
    desc: "Focused tutoring that delivers measurable progress and builds lasting confidence.",
    gradient: "from-primary/10 to-accent/5",
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
            <div className="card-premium p-7 sm:p-9 h-full group">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                <v.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-primary mb-3">{v.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ValueSection;