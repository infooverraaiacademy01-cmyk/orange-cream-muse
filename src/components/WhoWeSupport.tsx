import AnimatedSection from "./AnimatedSection";
import { GraduationCap, Globe } from "lucide-react";

const cards = [
  {
    icon: GraduationCap,
    title: "UK School Pupils",
    items: ["Ages 5–18", "KS1 to KS5", "Tailored academic support"],
  },
  {
    icon: Globe,
    title: "International Learners",
    items: ["Online tutoring", "IELTS preparation", "Study abroad guidance"],
  },
];

const WhoWeSupport = () => (
  <section className="py-16 sm:py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <AnimatedSection className="text-center mb-12 sm:mb-16">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
          Who We Support
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {cards.map((c, i) => (
          <AnimatedSection key={c.title} delay={i * 0.15}>
            <div className="rounded-2xl border border-border p-6 sm:p-8 hover:border-accent/50 hover:shadow-lg transition-all duration-300 h-full">
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-5">
                <c.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-primary mb-4">{c.title}</h3>
              <ul className="space-y-3">
                {c.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WhoWeSupport;
