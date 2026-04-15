import AnimatedSection from "./AnimatedSection";
import { Heart, Dumbbell, Music, BookOpen, Plane } from "lucide-react";

const services = [
  { icon: Heart, title: "Special Educational Needs (SEN) Tuition" },
  { icon: Dumbbell, title: "Physical Education (PE) Tuition" },
  { icon: Music, title: "Musical Instrument Tuition" },
  { icon: BookOpen, title: "KS1 – KS5 Maths, English & Science Tuition" },
  { icon: Plane, title: "IELTS & Study Abroad Support" },
];

const ServicesSection = () => (
  <section id="services" className="py-16 sm:py-24 bg-secondary">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <AnimatedSection className="text-center mb-12 sm:mb-16">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
          Our Services
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {services.map((s, i) => (
          <AnimatedSection key={s.title} delay={i * 0.1}>
            <div className="bg-background rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 h-full">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-base sm:text-lg font-semibold text-primary leading-snug">{s.title}</h3>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.5} className="text-center mt-10">
        <p className="text-sm sm:text-base text-muted-foreground italic">
          All tuition is one-to-one and tailored to each pupil's individual needs.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ServicesSection;
