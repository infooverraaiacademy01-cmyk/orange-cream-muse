import AnimatedSection from "./AnimatedSection";
import { Brain, BarChart3, Sparkles } from "lucide-react";

const results = [
  { icon: Brain, title: "Better Understanding", desc: "Deeper comprehension of subjects through personalised teaching." },
  { icon: BarChart3, title: "Improved Performance", desc: "Measurable improvement in school grades and assessments." },
  { icon: Sparkles, title: "Increased Confidence", desc: "Pupils gain the confidence to take on new challenges." },
];

const ResultsSection = () => (
  <section className="py-20 sm:py-28">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <AnimatedSection className="text-center mb-14 sm:mb-20">
        <div className="gold-bar mx-auto mb-5" />
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-balance">
          Building Confidence. Improving Results.
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
        {results.map((r, i) => (
          <AnimatedSection key={r.title} delay={i * 0.15}>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                <r.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-primary mb-3">{r.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xs mx-auto">{r.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ResultsSection;