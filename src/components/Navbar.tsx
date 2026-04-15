import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navItems = ["About", "Services", "Why Us", "Contact"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background"}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 flex items-center justify-between h-16 sm:h-20">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="B-Panacea Educational Consult" className="h-10 sm:h-12 w-auto object-contain" />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium tracking-wide text-foreground/70 hover:text-primary transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-dark-blue-light transition-colors duration-200 shadow-md"
        >
          Book a Tutor
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <ul className="flex flex-col px-6 py-6 gap-4">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium text-foreground/80 hover:text-primary"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" onClick={() => setMobileOpen(false)} className="inline-flex mt-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold">
                  Book a Tutor
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
