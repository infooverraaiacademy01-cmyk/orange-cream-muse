import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, LogOut, RefreshCw, Clock, Mail, Phone, User, BookOpen, Target, Calendar, AlertCircle, CheckCircle2, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_PASSWORD = "BPanacea2025!";

type Feedback = {
  id: string;
  parent_name: string;
  email: string | null;
  phone: string | null;
  learner_name: string | null;
  learner_year_group: string | null;
  subjects: string | null;
  learning_goals: string | null;
  session_preference: string | null;
  additional_info: string | null;
  status: string;
  created_at: string;
};

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Feedback | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const fetchFeedback = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setFeedback(data as Feedback[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) fetchFeedback();
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-3xl p-8 sm:p-10 shadow-2xl border border-border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-2xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-2">Enter your password to access submissions</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                autoFocus
              />
              {error && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> {error}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-dark-blue-light transition-all"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold">B-Panacea Admin</h1>
            <p className="text-sm text-primary-foreground/60">Client Questionnaire Submissions</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchFeedback}
              className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: feedback.length, color: "bg-primary/10 text-primary" },
            { label: "New", value: feedback.filter((f) => f.status === "new").length, color: "bg-accent/10 text-accent" },
            { label: "This Week", value: feedback.filter((f) => new Date(f.created_at) > new Date(Date.now() - 7 * 86400000)).length, color: "bg-orange-glow/10 text-orange-500" },
            { label: "Today", value: feedback.filter((f) => new Date(f.created_at).toDateString() === new Date().toDateString()).length, color: "bg-green-100 text-green-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-5 border border-border">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-3xl font-display font-bold mt-1 ${stat.color.split(" ")[1]}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        {feedback.length === 0 ? (
          <div className="text-center py-20">
            <CheckCircle2 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No submissions yet. They will appear here once clients fill in the questionnaire.</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border">
                    <th className="px-4 py-3 text-left font-bold text-primary">Name</th>
                    <th className="px-4 py-3 text-left font-bold text-primary hidden sm:table-cell">Email</th>
                    <th className="px-4 py-3 text-left font-bold text-primary hidden md:table-cell">Learner</th>
                    <th className="px-4 py-3 text-left font-bold text-primary hidden lg:table-cell">Services</th>
                    <th className="px-4 py-3 text-left font-bold text-primary">Date</th>
                    <th className="px-4 py-3 text-left font-bold text-primary">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.map((f) => (
                    <tr key={f.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 font-semibold text-foreground">{f.parent_name}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{f.email || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{f.learner_name || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">{f.subjects || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {new Date(f.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          f.status === "new" ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
                        }`}>
                          {f.status === "new" && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
                          {f.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelected(f)}
                          className="p-2 rounded-lg hover:bg-accent/10 text-accent transition-colors"
                          title="View details"
                        >
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
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display text-xl font-bold text-primary">{selected.parent_name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {new Date(selected.created_at).toLocaleString("en-GB")}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">✕</button>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: selected.email },
                { icon: Phone, label: "Phone", value: selected.phone },
                { icon: User, label: "Learner", value: selected.learner_name },
                { icon: BookOpen, label: "Year Group", value: selected.learner_year_group },
                { icon: BookOpen, label: "Subjects", value: selected.subjects },
                { icon: Target, label: "Learning Goals", value: selected.learning_goals },
                { icon: Calendar, label: "Session Preference", value: selected.session_preference },
                { icon: AlertCircle, label: "Additional Info", value: selected.additional_info },
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
      )}
    </div>
  );
};

export default Admin;
