import AnimatedSection from "./AnimatedSection";
import { GraduationCap, Globe } from "lucide-react";

const cards = [
  {
    icon: GraduationCap,
    title: "UK School Pupils",
    items: ["Ages 5–18", "KS1 to KS5", "Tailored academic support"],
    accent: "bg-primary",
  },
  {
    icon: Globe,
    title: "International Learners",
    items: ["Online tutoring", "IELTS preparation", "Study abroad guidance"],
    accent: "bg-accent",
  },
];

const WhoWeSupport = () => (
  <section className="py-20 sm:py-28">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <AnimatedSection className="text-center mb-14 sm:mb-20">
        <div className="gold-bar mx-auto mb-5" />
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-balance">
          Who We Support
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {cards.map((c, i) => (
          <AnimatedSection key={c.title} delay={i * 0.15}>
            <div className="card-premium p-7 sm:p-9 h-full relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-1 ${c.accent}`} />
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                <c.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary mb-5">{c.title}</h3>
              <ul className="space-y-4">
                {c.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
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