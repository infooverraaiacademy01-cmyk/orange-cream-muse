import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <img src={logo} alt="B-Panacea Educational Consult" className="h-10 w-auto object-contain mb-4 brightness-200" />
          <p className="text-sm text-primary-foreground/60 leading-relaxed">
            Expert one-to-one tutoring for UK school pupils aged 5–18.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-4 tracking-wide">Our Focus</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/60">
            <li>UK Curriculum Support</li>
            <li>One-to-One Personalised Learning</li>
            <li>Virtual & Physical Classes</li>
            <li>SEN & IELTS Support</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-4 tracking-wide">Contact</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/60">
            <li>info@bpanacea.co.uk</li>
            <li>+44 (0) 000 000 0000</li>
            <li>United Kingdom</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-4 tracking-wide">Follow Us</h4>
          <div className="flex gap-3">
            {["Facebook", "Instagram", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-xs font-semibold text-primary-foreground/60 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-primary-foreground/10 text-center">
        <p className="text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} B-Panacea Educational Consult. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
