import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const STORAGE_KEY = "bpanacea_subscribed_or_dismissed";
const emailSchema = z.string().trim().email({ message: "Please enter a valid email" }).max(255);

const SubscribePopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("subscribers")
      .insert({ email: parsed.data, source: "homepage_popup" });
    setLoading(false);

    // 23505 = unique violation (already subscribed) — treat as success
    if (error && error.code !== "23505") {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setOpen(false), 2200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-card rounded-3xl overflow-hidden shadow-2xl border border-border"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/80 hover:bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Decorative gradient header */}
            <div className="relative h-32 bg-gradient-to-br from-primary via-primary to-accent overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              <div className="absolute -bottom-10 -right-8 w-40 h-40 rounded-full bg-accent/30 blur-2xl" />
              <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-white">Free Insights</span>
              </div>
            </div>

            <div className="px-7 pt-6 pb-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-primary mb-2">You're on the list!</h3>
                  <p className="text-sm text-muted-foreground">We'll send you tutoring opportunities and updates straight to your inbox.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold text-primary leading-tight">
                    Don't miss the next learning <span className="italic text-accent">opportunity</span>
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Get exclusive tutoring offers, free resources, and study tips for UK pupils — straight to your inbox.
                  </p>

                  <form onSubmit={onSubmit} className="mt-5 space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:bg-dark-blue-light transition-all shadow-lg shadow-primary/20 disabled:opacity-60"
                    >
                      {loading ? "Subscribing…" : "Subscribe Free"}
                    </button>
                  </form>
                  <p className="mt-3 text-[11px] text-muted-foreground text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscribePopup;
