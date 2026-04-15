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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/98 backdrop-blur-xl shadow-[0_1px_20px_-6px_rgba(0,0,0,0.1)]"
          : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 flex items-center justify-between h-20 sm:h-22 lg:h-24">
        <a href="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="B-Panacea Education"
            className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="relative text-sm font-semibold tracking-wide text-foreground/60 hover:text-primary transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex px-7 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold tracking-wide hover:bg-dark-blue-light transition-all duration-300 shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
        >
          Book a Tutor
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 relative w-10 h-10 items-center justify-center"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-foreground rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-foreground rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-foreground rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <ul className="flex flex-col px-6 py-8 gap-5">
              {navItems.map((item, i) => (
                <motion.li key={item} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <a href={`#${item.toLowerCase().replace(" ", "-")}`} onClick={() => setMobileOpen(false)} className="text-xl font-semibold text-foreground/80 hover:text-primary transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
              <li>
                <a href="#contact" onClick={() => setMobileOpen(false)} className="inline-flex mt-3 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-base shadow-lg">
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
