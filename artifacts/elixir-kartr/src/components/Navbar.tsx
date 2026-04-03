import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["hero", "about", "verticals", "process", "consult"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Verticals", id: "verticals" },
    { name: "Process", id: "process" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/10 py-2 shadow-xl shadow-black/30"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* ── LOGO: Increased Size & Visibility ── */}
        <motion.button
          onClick={() => scrollToSection("hero")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="flex-shrink-0 focus:outline-none group"
          aria-label="Elixir Kartr Home"
        >
          <img
            src="/elixir-kartr-logo.png"
            alt="Elixir Kartr"
            /* 
               Key Changes:
               1. Increased height (h-14 to h-20) for visibility
               2. Added border-white/10 to separate dark logo from dark navbar
               3. Removed drop-shadow class to keep the original image glow sharp
            */
            className="h-14 sm:h-16 md:h-20 w-auto object-contain border border-white/10 rounded-lg"
            loading="eager"
          />
        </motion.button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const isHovered = hoveredLink === link.id;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 pb-1"
                  style={{ color: isActive ? "#FFD700" : isHovered ? "#fff" : "rgba(255,255,255,0.55)" }}
                >
                  {link.name}

                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-0 h-[1px] w-full overflow-hidden">
                    <motion.span
                      className="absolute inset-0 origin-left"
                      style={{ background: "linear-gradient(to right, #FFD700, rgba(255,215,0,0.3))" }}
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : isHovered ? 0.6 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </span>

                  {/* Active glow dot */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavDot"
                        className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ boxShadow: "0 0 6px rgba(255,215,0,0.8)" }}
                      />
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Consult CTA — glassmorphism with corner accents + shimmer */}
          <motion.button
            onClick={() => scrollToSection("consult")}
            className="relative px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary overflow-hidden group"
            whileHover="hovered"
            whileTap={{ scale: 0.97 }}
            style={{
              background: "rgba(255,215,0,0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,215,0,0.35)",
            }}
          >
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/70 transition-all duration-300 group-hover:w-3.5 group-hover:h-3.5" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/70 transition-all duration-300 group-hover:w-3.5 group-hover:h-3.5" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/70 transition-all duration-300 group-hover:w-3.5 group-hover:h-3.5" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/70 transition-all duration-300 group-hover:w-3.5 group-hover:h-3.5" />

            {/* Shimmer sweep on hover */}
            <motion.span
              className="absolute inset-0 -skew-x-12 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.15) 50%, transparent 100%)" }}
              variants={{
                hovered: {
                  x: ["-100%", "200%"],
                  transition: { duration: 0.55, ease: "easeOut" },
                },
              }}
            />

            <span className="relative z-10">Consult</span>
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.span>
              : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={22} /></motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col items-center py-10 gap-7">
              {/* Mobile Logo */}
              <motion.img
                src="/elixir-kartr-logo.png"
                alt="Elixir Kartr"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="h-16 w-auto object-contain mb-4"
              />
              
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm font-semibold text-white/70 hover:text-white transition-colors uppercase tracking-[0.2em]"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.35 }}
                onClick={() => scrollToSection("consult")}
                className="mt-2 px-10 py-3 bg-primary/10 border border-primary/40 text-primary text-xs font-bold uppercase tracking-[0.25em] backdrop-blur-sm"
                style={{ boxShadow: "0 0 20px rgba(255,215,0,0.08)" }}
              >
                Request Consult
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}