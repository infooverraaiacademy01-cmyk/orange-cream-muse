import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, X } from "lucide-react";

const PrivacyPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("bpanacea-privacy-accepted");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("bpanacea-privacy-accepted", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[60] bg-card rounded-2xl shadow-2xl shadow-primary/15 border border-border p-5 sm:p-6"
        >
          <button onClick={() => setVisible(false)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-bold text-primary text-sm mb-1">Your Privacy Matters</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies and our{" "}
                <Link to="/privacy" className="text-accent underline hover:text-accent/80">Privacy Policy</Link>.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={accept}
                  className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold hover:bg-dark-blue-light transition-all shadow-md"
                >
                  Accept All
                </button>
                <button
                  onClick={accept}
                  className="px-4 py-2 rounded-full border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                >
                  Essential Only
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPopup;
