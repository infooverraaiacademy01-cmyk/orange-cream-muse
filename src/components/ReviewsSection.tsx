import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Send, MessageSquarePlus } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AnimatedSection from "./AnimatedSection";

type Review = {
  id: string;
  name: string;
  role: string | null;
  rating: number;
  comment: string;
  created_at: string;
};

const seedReviews: Review[] = [
  { id: "s1", name: "Sarah M.", role: "Parent of Year 6 pupil", rating: 5, comment: "B-Panacea transformed my daughter's confidence in Maths. She went from dreading homework to actually enjoying it. The personalised approach made all the difference.", created_at: new Date().toISOString() },
  { id: "s2", name: "James O.", role: "Parent of Year 10 student", rating: 5, comment: "The GCSE preparation has been outstanding. My son's grades improved significantly within just two months. The tutor truly understands the UK curriculum inside out.", created_at: new Date().toISOString() },
  { id: "s3", name: "Amina K.", role: "Parent of SEN learner", rating: 5, comment: "Finding the right SEN support felt impossible until we found B-Panacea. They matched us with a tutor who genuinely understands my child's needs. Absolutely brilliant.", created_at: new Date().toISOString() },
  { id: "s4", name: "Michael R.", role: "Parent of A-Level student", rating: 5, comment: "Our son was predicted a C in Chemistry. B-Panacea paired him with a specialist tutor, and he achieved an A*. We couldn't be more grateful for the support.", created_at: new Date().toISOString() },
];

const reviewSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  role: z.string().trim().max(80).optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(10, "Please write at least 10 characters").max(800),
});

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", rating: 5, comment: "" });

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, role, rating, comment, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(20);
    if (!error && data && data.length > 0) {
      // Combine real reviews first, fallback to seeds if too few
      setReviews([...(data as Review[]), ...(data.length < 4 ? seedReviews.slice(0, 4 - data.length) : [])]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = reviewSchema.safeParse({
      name: form.name,
      role: form.role || undefined,
      rating: form.rating,
      comment: form.comment,
    });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      name: parsed.data.name,
      role: parsed.data.role ?? null,
      rating: parsed.data.rating,
      comment: parsed.data.comment,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit review. Please try again.");
      return;
    }
    toast.success("Thank you! Your review has been posted.");
    setForm({ name: "", role: "", rating: 5, comment: "" });
    setShowForm(false);
    fetchReviews();
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="gold-bar" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Reviews</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              What Parents & Students Say
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Real feedback from families across the UK who trust B-Panacea Education.
            </p>
            <button
              onClick={() => setShowForm((v) => !v)}
              className="mt-7 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent text-accent-foreground font-bold text-sm tracking-wide hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:-translate-y-0.5"
            >
              <MessageSquarePlus className="w-4 h-4" />
              {showForm ? "Close form" : "Leave a Review"}
            </button>
          </div>
        </AnimatedSection>

        {/* Review form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={submit}
            className="max-w-2xl mx-auto mb-14 bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xl shadow-primary/5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-primary mb-1.5 uppercase tracking-wider">Your name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="e.g. Sarah M."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-primary mb-1.5 uppercase tracking-wider">Role (optional)</label>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="e.g. Parent of Year 6 pupil"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setForm({ ...form, rating: n })}
                    className="p-1"
                    aria-label={`Rate ${n} stars`}
                  >
                    <Star className={`w-7 h-7 transition-all ${n <= form.rating ? "fill-accent text-accent" : "text-border"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-bold text-primary mb-1.5 uppercase tracking-wider">Your review *</label>
              <textarea
                required
                rows={4}
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                placeholder="Share your experience with B-Panacea Education…"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-5 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-dark-blue-light transition-all shadow-lg disabled:opacity-60"
            >
              {submitting ? "Posting…" : "Post Review"}
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        )}

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 9).map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
              className="bg-card rounded-2xl p-6 sm:p-7 shadow-lg shadow-primary/5 border border-border/50 relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-accent/20" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic line-clamp-6">"{r.comment}"</p>
              <div className="mt-5 pt-4 border-t border-border/50">
                <p className="font-display font-bold text-primary text-sm">{r.name}</p>
                {r.role && <p className="text-xs text-muted-foreground">{r.role}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
