import AnimatedSection from "./AnimatedSection";
import { Heart, Dumbbell, Music, BookOpen, Plane } from "lucide-react";

const services = [
  { icon: Heart, title: "Special Educational Needs (SEN) Tuition", desc: "Tailored support for pupils with special educational needs." },
  { icon: Dumbbell, title: "Physical Education (PE) Tuition", desc: "Structured PE sessions to support physical development." },
  { icon: Music, title: "Musical Instrument Tuition", desc: "Learn instruments with skilled, patient music tutors." },
  { icon: BookOpen, title: "KS1 – KS5 Maths, English & Science", desc: "Core subject support across all UK key stages." },
  { icon: Plane, title: "IELTS & Study Abroad Support", desc: "Preparation for international study and IELTS exams." },
];

const ServicesSection = () => (
  <section id="services" className="py-20 sm:py-28 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-background" />
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 relative">
      <AnimatedSection className="text-center mb-14 sm:mb-20">
        <div className="gold-bar mx-auto mb-5" />
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-balance">
          Our Services
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {services.map((s, i) => (
          <AnimatedSection key={s.title} delay={i * 0.1}>
            <div className="card-premium p-6 sm:p-8 h-full group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/20">
                <s.icon className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-primary mb-2 leading-snug">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.5} className="text-center mt-12">
        <p className="text-sm sm:text-base text-muted-foreground italic max-w-md mx-auto">
          All tuition is one-to-one and tailored to each pupil's individual needs.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ServicesSection;