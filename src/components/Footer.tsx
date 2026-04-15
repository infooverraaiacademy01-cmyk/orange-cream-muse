import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground py-14 sm:py-20">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <img src={logo} alt="B-Panacea Educational Consult" className="h-16 sm:h-20 w-auto object-contain mb-5 brightness-200" />
          <p className="text-sm text-primary-foreground/50 leading-relaxed max-w-xs">
            Expert one-to-one tutoring for UK school pupils aged 5–18. Study. Think. Create and Grow.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-display font-bold text-sm mb-5 tracking-wide">Our Focus</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/50">
            <li className="hover:text-primary-foreground/80 transition-colors cursor-pointer">UK Curriculum Support</li>
            <li className="hover:text-primary-foreground/80 transition-colors cursor-pointer">One-to-One Personalised Learning</li>
            <li className="hover:text-primary-foreground/80 transition-colors cursor-pointer">Virtual & Physical Classes</li>
            <li className="hover:text-primary-foreground/80 transition-colors cursor-pointer">SEN & IELTS Support</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold text-sm mb-5 tracking-wide">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/50">
            <li>info@bpanacea.co.uk</li>
            <li>+44 (0) 000 000 0000</li>
            <li>United Kingdom</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-display font-bold text-sm mb-5 tracking-wide">Follow Us</h4>
          <div className="flex gap-3">
            {["Facebook", "Instagram", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/8 flex items-center justify-center text-xs font-bold text-primary-foreground/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
        <p className="text-xs text-primary-foreground/30">
          © {new Date().getFullYear()} B-Panacea Educational Consult. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
