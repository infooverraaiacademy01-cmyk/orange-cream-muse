import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PageTransition from "@/components/PageTransition";
import logo from "@/assets/logo.png";
import PageTransition from "@/components/PageTransition";
import logo from "@/assets/logo.png";

const serviceOptions = [
  { id: "sen", label: "Special Needs (SEN) Tuition" },
  { id: "pe", label: "Physical Education (PE) Tuition" },
  { id: "music", label: "Musical Instrument Tuition" },
  { id: "ks", label: "KS1–KS5 Maths, English & Science Tuition" },
  { id: "ielts", label: "IELTS & Study Abroad Support" },
];

const Questionnaire = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    learnerName: "",
    ageGroup: "",
    email: "",
    phone: "",
    services: [] as string[],
    instrument: "",
    subjects: "",
    goals: "",
    specialRequirements: "",
    availability: "",
  });

  const handleServiceToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to database
    try {
      await supabase.from("feedback").insert({
        parent_name: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        learner_name: formData.learnerName || null,
        learner_year_group: formData.ageGroup,
        subjects: [
          ...formData.services.map((s) => serviceOptions.find((o) => o.id === s)?.label),
          formData.instrument ? `Instrument: ${formData.instrument}` : null,
          formData.subjects || null,
        ].filter(Boolean).join(", "),
        learning_goals: formData.goals,
        session_preference: formData.availability,
        additional_info: formData.specialRequirements || null,
      });
    } catch (err) {
      // silently continue — email fallback
    }

    // Also open email
    const body = `
New Client Questionnaire Submission

1. Parent/Guardian Name: ${formData.parentName}
2. Learner's Name: ${formData.learnerName || "Same as above"}
3. Age/Year Group: ${formData.ageGroup}
4. Email: ${formData.email}
5. Phone/WhatsApp: ${formData.phone}
6. Services: ${formData.services.map((s) => serviceOptions.find((o) => o.id === s)?.label).join(", ")}${formData.instrument ? `\n   Instrument: ${formData.instrument}` : ""}${formData.subjects ? `\n   Subjects: ${formData.subjects}` : ""}
7. Goals: ${formData.goals}
8. Special Requirements: ${formData.specialRequirements || "None"}
9. Availability: ${formData.availability}
    `.trim();

    window.open(
      `mailto:info@bpanacea.co.uk?subject=${encodeURIComponent("New Client Questionnaire")}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold text-primary mb-4">Thank You!</h2>
          <p className="text-muted-foreground mb-2">Your questionnaire has been prepared.</p>
          <p className="text-sm text-muted-foreground mb-8">
            We will contact you within 1 working day to discuss next steps.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-dark-blue-light transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6 sm:py-8">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="B-Panacea Education" className="h-12 sm:h-14 w-auto brightness-200" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            New Client Questionnaire
          </h1>
          <p className="mt-3 text-sm sm:text-base text-primary-foreground/70 max-w-xl">
            Thank you for your interest in our one-to-one personalised tuition services. This short form helps us understand your needs quickly so we can match you with the right tutor.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Parent Name */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <label className="block font-display font-bold text-primary mb-2">
              1. Your full name <span className="text-accent">(parent/guardian or learner)</span> *
            </label>
            <input
              type="text"
              required
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              placeholder="Enter your full name"
            />
          </motion.div>

          {/* 2. Learner Name */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <label className="block font-display font-bold text-primary mb-2">
              2. Learner's full name <span className="text-muted-foreground text-sm">(if different from above)</span>
            </label>
            <input
              type="text"
              value={formData.learnerName}
              onChange={(e) => setFormData({ ...formData, learnerName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              placeholder="Enter learner's name"
            />
          </motion.div>

          {/* 3. Age/Year Group */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <label className="block font-display font-bold text-primary mb-2">
              3. Learner's age and current year group / level *
            </label>
            <input
              type="text"
              required
              value={formData.ageGroup}
              onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              placeholder="e.g. Year 4, KS3, Year 12, adult"
            />
          </motion.div>

          {/* 4. Contact Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <label className="block font-display font-bold text-primary mb-3">4. Contact details *</label>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="+44..."
                />
              </div>
            </div>
          </motion.div>

          {/* 5. Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <label className="block font-display font-bold text-primary mb-3">
              5. Which service(s) are you interested in? *
            </label>
            <div className="space-y-3">
              {serviceOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    formData.services.includes(opt.id)
                      ? "border-accent bg-accent/10 shadow-sm"
                      : "border-border bg-card hover:border-accent/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.services.includes(opt.id)}
                    onChange={() => handleServiceToggle(opt.id)}
                    className="w-5 h-5 rounded border-border text-accent focus:ring-accent"
                  />
                  <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>

            {formData.services.includes("music") && (
              <div className="mt-4 ml-8">
                <label className="text-sm text-muted-foreground mb-1 block">Which instrument?</label>
                <input
                  type="text"
                  value={formData.instrument}
                  onChange={(e) => setFormData({ ...formData, instrument: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="e.g. Piano, Guitar, Violin"
                />
              </div>
            )}

            {formData.services.includes("ks") && (
              <div className="mt-4 ml-8">
                <label className="text-sm text-muted-foreground mb-1 block">Which subject(s)?</label>
                <input
                  type="text"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="e.g. Maths, English, Science"
                />
              </div>
            )}
          </motion.div>

          {/* 6. Goals */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <label className="block font-display font-bold text-primary mb-2">6. What are your main goals? *</label>
            <textarea
              required
              rows={3}
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
              placeholder="e.g. exam preparation, confidence building, specific skill, university application..."
            />
          </motion.div>

          {/* 7. Special Requirements */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <label className="block font-display font-bold text-primary mb-2">
              7. Any special requirements or background information?
            </label>
            <textarea
              rows={3}
              value={formData.specialRequirements}
              onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
              placeholder="e.g. SEN details, current challenges, preferred tutor gender/language..."
            />
          </motion.div>

          {/* 8. Availability */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <label className="block font-display font-bold text-primary mb-2">
              8. Preferred days and times for tuition *
            </label>
            <textarea
              required
              rows={3}
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
              placeholder="Please list your availability..."
            />
          </motion.div>

          {/* Submit */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <button
              type="submit"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-4 rounded-full bg-primary text-primary-foreground font-bold text-base tracking-wide hover:bg-dark-blue-light transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1"
            >
              Submit Questionnaire
              <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="mt-4 text-xs text-muted-foreground">
              We will contact you within 1 working day to discuss next steps.
            </p>
          </motion.div>
        </form>
      </div>
    </div>
    </PageTransition>
  );
};

export default Questionnaire;
