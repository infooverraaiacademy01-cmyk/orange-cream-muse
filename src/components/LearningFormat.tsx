import AnimatedSection from "./AnimatedSection";
import { Monitor, Home } from "lucide-react";

const LearningFormat = () => (
  <section className="py-20 sm:py-28">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <AnimatedSection>
          <div className="gold-bar mb-5" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-7 leading-tight">
            Flexible Learning That Works for You
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
            We run both virtual and physical classes, bringing expert UK educators
            directly to your home and online, giving every pupil the flexibility
            to learn in the way that suits them best.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-2 gap-5 sm:gap-7">
            {[
              { icon: Monitor, label: "Virtual Classes", desc: "Learn from anywhere with expert online tutors" },
              { icon: Home, label: "In-Person Sessions", desc: "Face-to-face tutoring in the comfort of home" },
            ].map((item) => (
              <div
                key={item.label}
                className="card-premium p-6 sm:p-8 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/20">
                  <item.icon className="w-7 h-7 text-accent transition-colors duration-300 group-hover:text-accent-foreground" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-primary mb-2">{item.label}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default LearningFormat;