import AnimatedSection from "./AnimatedSection";
import { Brain, BarChart3, Sparkles } from "lucide-react";

const results = [
  { icon: Brain, title: "Better Understanding", desc: "Deeper comprehension of subjects through personalised teaching." },
  { icon: BarChart3, title: "Improved Performance", desc: "Measurable improvement in school grades and assessments." },
  { icon: Sparkles, title: "Increased Confidence", desc: "Pupils gain the confidence to take on new challenges." },
];

const ResultsSection = () => (
  <section className="py-16 sm:py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <AnimatedSection className="text-center mb-12 sm:mb-16">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
          Building Confidence. Improving Results.
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
        {results.map((r, i) => (
          <AnimatedSection key={r.title} delay={i * 0.15}>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <r.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-primary mb-3">{r.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ResultsSection;
