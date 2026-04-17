import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "5–18", label: "Age Range" },
  { value: "KS1–KS5", label: "Curriculum" },
  { value: "1:1", label: "Personalised" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-28 sm:pt-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-8">
              <div className="gold-bar" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">UK Education Experts</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-bold leading-[1.1] tracking-tight text-primary text-balance">
              Unlock Every Child's True{" "}
              <span className="italic text-accent">Potential.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-7 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
              Expert one-to-one tutoring for pupils aged 5–18, delivered virtually and in-person, tailored to every learner's needs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-10 flex flex-wrap items-center gap-4">
              <Link 
                to="/questionnaire" 
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:bg-dark-blue-light transition-all duration-400 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1"
              >
                Get Started
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <a
                href="https://www.cognitoforms.com/BPanaceaLimited/BPanaceaLimitedTutorApplication"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-primary/15 text-primary font-bold text-sm tracking-wide hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                Register for Work
              </a>
            </motion.div>

            {/* Desktop Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="mt-12 hidden sm:flex items-center gap-8 sm:gap-12">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-8 sm:gap-12">
                  <div>
                    <p className="font-display text-xl sm:text-2xl font-bold text-primary">{s.value}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                  {i < stats.length - 1 && <div className="w-px h-10 bg-border" />}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Image Section */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/15">
              <img src={heroBg} alt="UK tutor helping a school pupil with homework" className="w-full h-[300px] sm:h-[400px] lg:h-[540px] object-cover" width={1280} height={960} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.5 }} className="absolute -bottom-5 -left-3 sm:-left-5 bg-background rounded-2xl shadow-xl shadow-primary/10 p-4 sm:p-5 border border-border/50">
              <p className="text-xs font-bold text-accent uppercase tracking-wider">Trusted by</p>
              <p className="font-display text-xl sm:text-2xl font-bold text-primary mt-1">UK Parents</p>
              <p className="text-xs text-muted-foreground mt-0.5">Nationwide</p>
            </motion.div>
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full border-4 border-accent/20 -z-10 hidden sm:block" />
            <div className="absolute -bottom-3 right-12 w-20 h-20 rounded-2xl bg-secondary -z-10 hidden sm:block" />
          </motion.div>
        </div>

        {/* Mobile Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="mt-10 flex sm:hidden items-center justify-between">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-4">
              <div className="text-center">
                <p className="font-display text-lg font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
              {i < stats.length - 1 && <div className="w-px h-8 bg-border" />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
