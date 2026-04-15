import { Star } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Parent of Year 6 pupil",
    text: "B-Panacea transformed my daughter's confidence in Maths. She went from dreading homework to actually enjoying it. The personalised approach made all the difference.",
    stars: 5,
  },
  {
    name: "James O.",
    role: "Parent of Year 10 student",
    text: "The GCSE preparation has been outstanding. My son's grades improved significantly within just two months. The tutor truly understands the UK curriculum inside out.",
    stars: 5,
  },
  {
    name: "Amina K.",
    role: "Parent of SEN learner",
    text: "Finding the right SEN support felt impossible until we found B-Panacea. They matched us with a tutor who genuinely understands my child's needs. Absolutely brilliant.",
    stars: 5,
  },
  {
    name: "David T.",
    role: "Parent of Year 3 pupil",
    text: "The online sessions are so well-structured. My child stays focused and engaged the whole time. It's like having a top teacher in our living room.",
    stars: 5,
  },
];

const TestimonialsSection = () => (
  <section className="py-20 sm:py-28 bg-secondary/30">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <AnimatedSection>
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="gold-bar" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Testimonials</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
            What Parents Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Real feedback from families across the UK who trust B-Panacea Education.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <AnimatedSection key={t.name} delay={i * 0.1}>
            <div className="bg-card rounded-2xl p-6 shadow-lg shadow-primary/5 border border-border/50 h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 italic">
                "{t.text}"
              </p>
              <div className="mt-5 pt-4 border-t border-border/50">
                <p className="font-display font-bold text-primary text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
