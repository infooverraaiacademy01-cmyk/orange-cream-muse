import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Send, MessageSquarePlus, Share2, Copy, Check, X as XIcon } from "lucide-react";
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
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const reviewUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/#reviews`
      : "https://bpanacea.co.uk/#reviews";
  const shareText =
    "I've been recommending B-Panacea Education for tutoring & SEN support — they're brilliant. If they've helped you or your child, please leave them a quick review here:";
  const fullShareMessage = `${shareText} ${reviewUrl}`;

  const handleShareClick = async () => {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: "Leave a review for B-Panacea Education",
          text: shareText,
          url: reviewUrl,
        });
        return;
      } catch {
        // user cancelled or share failed → fall back to dialog
      }
    }
    setShareOpen(true);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullShareMessage);
      setCopied(true);
      toast.success("Link copied — paste it anywhere!");
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Couldn't copy. Please copy manually.");
    }
  };

  const shareTargets = [
    {
      name: "WhatsApp",
      color: "bg-[#25D366] hover:bg-[#1faa55] text-white",
      href: `https://wa.me/?text=${encodeURIComponent(fullShareMessage)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.46 0 .12 5.34.12 11.92c0 2.1.55 4.16 1.6 5.97L0 24l6.27-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.18-3.45-8.43ZM12.05 21.3h-.01a9.36 9.36 0 0 1-4.77-1.31l-.34-.2-3.72.97 1-3.62-.22-.37a9.37 9.37 0 0 1-1.43-4.85c0-5.18 4.22-9.4 9.41-9.4 2.51 0 4.87.98 6.65 2.76a9.34 9.34 0 0 1 2.75 6.65c0 5.18-4.22 9.4-9.32 9.4Zm5.42-7c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47a9 9 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.43 0 1.43 1.05 2.82 1.2 3.02.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      color: "bg-[#1877F2] hover:bg-[#145dbf] text-white",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(reviewUrl)}&quote=${encodeURIComponent(shareText)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82V14.706h-3.13v-3.622h3.13V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.326V1.326C24 .593 23.407 0 22.675 0Z" />
        </svg>
      ),
    },
    {
      name: "X / Twitter",
      color: "bg-foreground hover:bg-foreground/85 text-background",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(reviewUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M18.244 2H21.5l-7.59 8.67L23 22h-6.86l-5.36-6.99L4.6 22H1.34l8.12-9.27L1 2h7.02l4.84 6.4L18.24 2Zm-1.2 18h1.9L7.04 4H5.05l11.99 16Z" />
        </svg>
      ),
    },
  ];

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
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowForm((v) => !v)}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent text-accent-foreground font-bold text-sm tracking-wide hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:-translate-y-0.5"
              >
                <MessageSquarePlus className="w-4 h-4" />
                {showForm ? "Close form" : "Leave a Review"}
              </button>
              <button
                onClick={handleShareClick}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-card border-2 border-primary/15 text-primary font-bold text-sm tracking-wide hover:border-primary/40 hover:-translate-y-0.5 transition-all shadow-md"
              >
                <Share2 className="w-4 h-4" />
                Share & Ask for Reviews
              </button>
            </div>
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
