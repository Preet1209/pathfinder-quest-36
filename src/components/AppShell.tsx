import { motion } from "framer-motion";
import { Home, Compass, Brain, Flame, Map, Sparkles, type LucideIcon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const DEFAULT_NAV: NavItem[] = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "dna", label: "DNA", icon: Brain },
  { id: "skills", label: "Skills", icon: Compass },
  { id: "burnout", label: "Burnout", icon: Flame },
  { id: "hybrid", label: "Hybrids", icon: Sparkles },
  { id: "roadmap", label: "Roadmap", icon: Map },
];

interface Props {
  children: ReactNode;
  nav?: NavItem[];
  brand?: string;
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const AppShell = ({ children, nav = DEFAULT_NAV, brand = "Pathfinder" }: Props) => {
  const [active, setActive] = useState<string>(nav[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [nav]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-20 lg:w-60 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl">
        <div className="flex items-center gap-2 px-4 lg:px-6 h-16 border-b border-sidebar-border">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-foreground font-display font-bold"
            style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-glow-gold)" }}
          >
            P
          </div>
          <span className="hidden lg:inline font-display font-bold tracking-wider text-foreground">
            {brand}
          </span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-display font-medium tracking-wide transition-colors group",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg border border-primary/30"
                    style={{
                      background: "linear-gradient(135deg, hsl(46 65% 52% / 0.12), hsl(15 76% 51% / 0.08))",
                      boxShadow: "inset 0 0 18px hsl(46 65% 52% / 0.12)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 w-4 h-4 shrink-0" />
                <span className="relative z-10 hidden lg:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="hidden lg:block p-4 text-[10px] uppercase tracking-widest text-muted-foreground/60 font-display">
          v1.0 · Modern Fantasy
        </div>
      </aside>

      {/* Main */}
      <main className="md:pl-20 lg:pl-60 pb-24 md:pb-0">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/85 backdrop-blur-xl">
        <div className="grid grid-cols-6">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center py-2.5 gap-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-active"
                    className="absolute top-0 left-1/4 right-1/4 h-0.5 rounded-full"
                    style={{ background: "var(--gradient-gold)", boxShadow: "0 0 12px hsl(46 70% 55% / 0.7)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-display tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
};