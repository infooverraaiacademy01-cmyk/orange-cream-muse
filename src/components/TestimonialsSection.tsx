import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
  {
    name: "Priya S.",
    role: "Parent of Year 8 student",
    text: "My daughter struggled with English comprehension for years. After just 6 weeks with B-Panacea, her reading age jumped by 2 years. The progress has been remarkable.",
    stars: 5,
  },
  {
    name: "Michael R.",
    role: "Parent of A-Level student",
    text: "Our son was predicted a C in Chemistry. B-Panacea paired him with a specialist tutor, and he achieved an A*. We couldn't be more grateful for the support.",
    stars: 5,
  },
  {
    name: "Fatima A.",
    role: "Parent of Year 5 twins",
    text: "Having twins with different learning styles was a challenge. B-Panacea created individual plans for each child. Both are now thriving and love their sessions.",
    stars: 5,
  },
  {
    name: "Rachel W.",
    role: "IELTS candidate",
    text: "I needed a Band 7 for my university application. My B-Panacea tutor helped me achieve a Band 8 in just 3 months. The structured approach and mock tests were invaluable.",
    stars: 5,
  },
  {
    name: "Tom & Linda H.",
    role: "Parents of Year 9 student",
    text: "Our son has ADHD and finding the right tutor was always difficult. B-Panacea took the time to understand his needs and the sessions are perfectly adapted. He actually looks forward to them now.",
    stars: 5,
  },
  {
    name: "Grace N.",
    role: "Parent of Year 4 pupil",
    text: "The music tuition has been wonderful. My daughter is learning piano with a patient and talented tutor. She performed at her school concert after just 4 months of lessons!",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = typeof window !== "undefined" && window.innerWidth >= 1024 ? 3 : typeof window !== "undefined" && window.innerWidth >= 640 ? 2 : 1;
  const maxIndex = testimonials.length - itemsPerView;

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="gold-bar" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                Testimonials
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              What Parents Say
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Real feedback from families across the UK who trust B-Panacea Education.
            </p>
          </div>
        </AnimatedSection>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden mx-6 sm:mx-10">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${current * (100 / itemsPerView)}%)`,
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="flex-shrink-0 px-2 sm:px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg shadow-primary/5 border border-border/50 h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-accent/20" />
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
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-accent"
                    : "w-2 bg-border hover:bg-accent/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
