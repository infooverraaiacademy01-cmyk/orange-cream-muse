import AnimatedSection from "./AnimatedSection";
import { Monitor, Home } from "lucide-react";

const LearningFormat = () => (
  <section className="py-16 sm:py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <AnimatedSection>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-6">
            Flexible Learning That Works for You
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            We run both virtual and physical classes, bringing expert UK educators
            directly to your home and online, giving every pupil the flexibility
            to learn in the way that suits them best.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-2 gap-5 sm:gap-6">
            {[
              { icon: Monitor, label: "Virtual Classes", desc: "Learn from anywhere with expert online tutors" },
              { icon: Home, label: "In-Person Sessions", desc: "Face-to-face tutoring in the comfort of home" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border p-5 sm:p-6 text-center hover:border-accent/50 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-sm sm:text-base font-semibold text-primary mb-2">{item.label}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default LearningFormat;
