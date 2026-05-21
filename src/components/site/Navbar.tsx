import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "אודות" },
  { href: "#specializations", label: "תחומי התמחות" },
  { href: "#process", label: "התהליך" },
  { href: "#approach", label: "הגישה" },
  { href: "#faq", label: "שאלות נפוצות" },
  { href: "#contact", label: "יצירת קשר" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-page">
        <nav
          className={`flex items-center justify-between rounded-full px-5 md:px-7 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-soft" : "bg-transparent"
          }`}
        >
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-peach to-rose grid place-items-center text-primary-foreground font-bold shadow-soft">נ</span>
            <span className="font-display font-semibold text-foreground hidden sm:inline">נוף הראל־עזר</span>
          </a>

          <ul className="hidden lg:flex items-center gap-7 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-foreground/75 hover:text-foreground transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:right-0 after:h-[1.5px] after:w-0 after:bg-rose hover:after:w-full after:transition-all after:duration-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-all hover:shadow-glow"
          >
            לקביעת פגישה
          </a>

          <button
            aria-label="פתח תפריט"
            className="lg:hidden p-2 -ml-2 text-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            open ? "max-h-[420px] mt-3" : "max-h-0"
          }`}
        >
          <ul className="glass rounded-3xl p-5 space-y-1 shadow-card">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-foreground/80 hover:bg-secondary/60 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block text-center mt-2 rounded-full bg-foreground text-background px-5 py-3 font-medium"
              >
                לקביעת פגישה
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
