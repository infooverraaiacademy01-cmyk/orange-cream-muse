import AnimatedSection from "./AnimatedSection";
import { Users, Monitor, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "One-to-One Personalised Learning",
    desc: "Every session is tailored to your child's unique needs, strengths, and goals.",
  },
  {
    icon: Monitor,
    title: "Virtual & Physical Classes",
    desc: "Flexible learning options — online from anywhere or face-to-face in the comfort of your home.",
  },
  {
    icon: TrendingUp,
    title: "Real Academic Improvement",
    desc: "Focused tutoring that delivers measurable progress and builds lasting confidence.",
  },
];

const ValueSection = () => (
  <section id="about" className="py-16 sm:py-24 bg-secondary">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <AnimatedSection className="text-center mb-12 sm:mb-16">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
          Simple Support. Real Results.
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {values.map((v, i) => (
          <AnimatedSection key={v.title} delay={i * 0.15}>
            <div className="bg-background rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <v.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-primary mb-3">{v.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ValueSection;
