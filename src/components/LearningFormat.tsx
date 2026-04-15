import AnimatedSection from "./AnimatedSection";
import virtualImg from "@/assets/virtual-learning.jpg";
import inPersonImg from "@/assets/in-person-tutor.jpg";

const LearningFormat = () => (
  <section className="py-20 sm:py-28">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <AnimatedSection className="text-center mb-14 sm:mb-20">
        <div className="gold-bar mx-auto mb-5" />
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-balance">
          Flexible Learning That Works for You
        </h2>
        <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          We run both virtual and physical classes, bringing expert UK educators
          directly to your home and online.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
        <AnimatedSection delay={0.1}>
          <div className="card-premium overflow-hidden h-full group">
            <div className="relative h-56 sm:h-64 overflow-hidden">
              <img
                src={virtualImg}
                alt="Child learning online with a virtual UK tutor"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-primary mb-3">Virtual Classes</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Learn from anywhere with expert online tutors. Flexible scheduling, interactive sessions, and real-time support from the comfort of home.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <div className="card-premium overflow-hidden h-full group">
            <div className="relative h-56 sm:h-64 overflow-hidden">
              <img
                src={inPersonImg}
                alt="In-person tutoring session at home"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-primary mb-3">In-Person Sessions</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Face-to-face tutoring in the comfort of your home. Personal attention, hands-on learning, and a supportive environment for every pupil.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default LearningFormat;
