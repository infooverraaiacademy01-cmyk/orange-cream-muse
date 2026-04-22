import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Lock, LogOut, RefreshCw, Clock, Mail, Phone, User, BookOpen, Target,
  Calendar, AlertCircle, CheckCircle2, Eye, Star, Users, MessageSquare, Inbox, ShieldAlert
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ADMIN_EMAIL = "info@bpanacea.co.uk";

type Feedback = {
  id: string; parent_name: string; email: string | null; phone: string | null;
  learner_name: string | null; learner_year_group: string | null; subjects: string | null;
  learning_goals: string | null; session_preference: string | null; additional_info: string | null;
  status: string; created_at: string;
};
type Review = { id: string; name: string; role: string | null; rating: number; comment: string; created_at: string; approved: boolean };
type Subscriber = { id: string; email: string; source: string | null; created_at: string };

type Tab = "feedback" | "reviews" | "subscribers";

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [tab, setTab] = useState<Tab>("feedback");
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Feedback | null>(null);

  // Auth bootstrap
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
      if (s?.user) checkAdmin(s.user.id);
      else setIsAdmin(null);
    });
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) checkAdmin(s.user.id);
      else setIsAdmin(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    setIsAdmin(!!data);
  };

  const fetchAll = async () => {
    setLoading(true);
    const [fb, rv, sb] = await Promise.all([
      supabase.from("feedback").select("*").order("created_at", { ascending: false }),
      supabase.from("reviews").select("*").order("created_at", { ascending: false }),
      supabase.from("subscribers").select("*").order("created_at", { ascending: false }),
    ]);
    if (fb.data) setFeedback(fb.data as Feedback[]);
    if (rv.data) setReviews(rv.data as Review[]);
    if (sb.data) setSubscribers(sb.data as Subscriber[]);
    setLoading(false);
  };

  useEffect(() => {
    if (session && isAdmin) fetchAll();
  }, [session, isAdmin]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    // Try sign in first
    let { error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
    // If account doesn't exist yet, create it then sign in
    if (error && /invalid login credentials/i.test(error.message)) {
      const { error: signupErr } = await supabase.auth.signUp({
        email: ADMIN_EMAIL,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (signupErr) {
        setAuthLoading(false);
        return setAuthError(signupErr.message);
      }
      const retry = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
      error = retry.error;
    }
    setAuthLoading(false);
    if (error) return setAuthError("Incorrect password");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null); setIsAdmin(null);
  };

  // ── Auth screen
  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="bg-card rounded-3xl p-8 sm:p-10 shadow-2xl border border-border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-2xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-2">Enter password to continue</p>
            </div>
            <form onSubmit={handleAuth} className="space-y-4">
              <input
                type="password" required autoFocus value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" autoComplete="current-password" minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
              {authError && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> {authError}
                </p>
              )}
              <button
                type="submit" disabled={authLoading}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-dark-blue-light transition-all disabled:opacity-60"
              >
                {authLoading ? "Please wait…" : "Sign In"}
              </button>
            </form>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Authorised personnel only. Contact info@bpanacea.co.uk for access.
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Logged in but not admin
  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-5">
        <div className="max-w-md text-center bg-card border border-border rounded-3xl p-10 shadow-xl">
          <ShieldAlert className="w-14 h-14 text-destructive mx-auto mb-5" />
          <h2 className="font-display text-xl font-bold text-primary mb-2">Access denied</h2>
          <p className="text-sm text-muted-foreground mb-6">
            This account ({session.user.email}) is not authorised as an admin. Please contact info@bpanacea.co.uk to be granted access.
          </p>
          <button onClick={handleLogout} className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-dark-blue-light transition-all">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Verifying access…</div>;
  }

  const tabs: { id: Tab; label: string; icon: any; count: number }[] = [
    { id: "feedback", label: "Questionnaires", icon: Inbox, count: feedback.length },
    { id: "reviews", label: "Reviews", icon: MessageSquare, count: reviews.length },
    { id: "subscribers", label: "Subscribers", icon: Users, count: subscribers.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold">B-Panacea Admin</h1>
            <p className="text-sm text-primary-foreground/60">{session.user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchAll} className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors" title="Refresh">
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id} onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                tab === t.id ? "bg-primary text-primary-foreground shadow-lg" : "bg-card border border-border text-muted-foreground hover:text-primary"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${tab === t.id ? "bg-primary-foreground/20" : "bg-secondary"}`}>{t.count}</span>
            </button>
          ))}
        </div>

        {tab === "feedback" && (
          <FeedbackTab feedback={feedback} onSelect={setSelected} />
        )}
        {tab === "reviews" && (
          <ReviewsTab reviews={reviews} />
        )}
        {tab === "subscribers" && (
          <SubscribersTab subscribers={subscribers} />
        )}
      </div>

      {selected && <FeedbackModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

const FeedbackTab = ({ feedback, onSelect }: { feedback: Feedback[]; onSelect: (f: Feedback) => void }) => (
  <>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {[
        { label: "Total", value: feedback.length, color: "text-primary" },
        { label: "New", value: feedback.filter((f) => f.status === "new").length, color: "text-accent" },
        { label: "This Week", value: feedback.filter((f) => new Date(f.created_at) > new Date(Date.now() - 7 * 86400000)).length, color: "text-orange-500" },
        { label: "Today", value: feedback.filter((f) => new Date(f.created_at).toDateString() === new Date().toDateString()).length, color: "text-green-600" },
      ].map((s) => (
        <div key={s.label} className="bg-card rounded-2xl p-5 border border-border">
          <p className="text-sm text-muted-foreground">{s.label}</p>
          <p className={`text-3xl font-display font-bold mt-1 ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>
    {feedback.length === 0 ? (
      <Empty icon={CheckCircle2} text="No questionnaire submissions yet." />
    ) : (
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-4 py-3 text-left font-bold text-primary">Name</th>
                <th className="px-4 py-3 text-left font-bold text-primary hidden sm:table-cell">Email</th>
                <th className="px-4 py-3 text-left font-bold text-primary hidden md:table-cell">Learner</th>
                <th className="px-4 py-3 text-left font-bold text-primary">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((f) => (
                <tr key={f.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3 font-semibold">{f.parent_name}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{f.email || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{f.learner_name || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(f.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => onSelect(f)} className="p-2 rounded-lg hover:bg-accent/10 text-accent transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </>
);

const ReviewsTab = ({ reviews }: { reviews: Review[] }) =>
  reviews.length === 0 ? <Empty icon={MessageSquare} text="No reviews yet." /> : (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews.map((r) => (
        <div key={r.id} className="bg-card border border-border rounded-2xl p-5">
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-accent text-accent" />)}
          </div>
          <p className="text-sm text-foreground italic">"{r.comment}"</p>
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-primary">{r.name}</p>
              {r.role && <p className="text-xs text-muted-foreground">{r.role}</p>}
            </div>
            <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("en-GB")}</p>
          </div>
        </div>
      ))}
    </div>
  );

const SubscribersTab = ({ subscribers }: { subscribers: Subscriber[] }) =>
  subscribers.length === 0 ? <Empty icon={Mail} text="No subscribers yet." /> : (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-secondary/50 border-b border-border">
            <th className="px-4 py-3 text-left font-bold text-primary">Email</th>
            <th className="px-4 py-3 text-left font-bold text-primary hidden sm:table-cell">Source</th>
            <th className="px-4 py-3 text-left font-bold text-primary">Subscribed</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((s) => (
            <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/20">
              <td className="px-4 py-3 font-semibold">{s.email}</td>
              <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{s.source || "—"}</td>
              <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(s.created_at).toLocaleString("en-GB")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

const Empty = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="text-center py-20">
    <Icon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
    <p className="text-muted-foreground">{text}</p>
  </div>
);

const FeedbackModal = ({ item, onClose }: { item: Feedback; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="bg-card rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-border"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-display text-xl font-bold text-primary">{item.parent_name}</h3>
          <p className="text-xs text-muted-foreground mt-1"><Clock className="w-3 h-3 inline mr-1" />{new Date(item.created_at).toLocaleString("en-GB")}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground">✕</button>
      </div>
      <div className="space-y-4">
        {[
          { icon: Mail, label: "Email", value: item.email },
          { icon: Phone, label: "Phone", value: item.phone },
          { icon: User, label: "Learner", value: item.learner_name },
          { icon: BookOpen, label: "Year Group", value: item.learner_year_group },
          { icon: BookOpen, label: "Subjects", value: item.subjects },
          { icon: Target, label: "Learning Goals", value: item.learning_goals },
          { icon: Calendar, label: "Session Preference", value: item.session_preference },
          { icon: AlertCircle, label: "Additional Info", value: item.additional_info },
        ].map(({ icon: Icon, label, value }) => value ? (
          <div key={label} className="flex gap-3">
            <Icon className="w-4 h-4 text-accent mt-1 shrink-0" />
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
              <p className="text-sm text-foreground mt-0.5">{value}</p>
            </div>
          </div>
        ) : null)}
      </div>
    </motion.div>
  </div>
);

export default Admin;
