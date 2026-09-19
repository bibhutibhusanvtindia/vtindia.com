"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  ArrowRight,
  Code2,
  Boxes,
  ShieldCheck,
  Calculator,
  Phone,
  MessageCircle,
  Building,
  GraduationCap,
  X,
  Command,
} from "lucide-react";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { clients } from "@/data/portfolio";
import { playHapticBeep, playChimeSuccess } from "@/lib/sound";

interface CommandItem {
  id: string;
  category: "Actions" | "Products" | "Services" | "Clients";
  title: string;
  subtitle: string;
  icon: typeof Sparkles;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        playHapticBeep(720, 0.05);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const allItems: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [
      {
        id: "action-admin",
        category: "Actions",
        title: "Open AI Executive Command Center",
        subtitle: "Single-screen financial telemetry, AI Chief of Staff & B2B Growth Platform",
        icon: Sparkles,
        action: () => {
          router.push("/admin");
          setIsOpen(false);
        },
      },
      {
        id: "action-roi",
        category: "Actions",
        title: "Calculate Institutional Scope & ROI",
        subtitle: "Interactive sprint timeline & time-savings calculator",
        icon: Calculator,
        action: () => {
          router.push("/#roi-calculator");
          setIsOpen(false);
        },
      },
      {
        id: "action-3d",
        category: "Actions",
        title: "Launch 3D WebXR Simulation Studio",
        subtitle: "Inspect interactive 3D spatial models & hazard telemetry",
        icon: Boxes,
        action: () => {
          router.push("/products/virtual-reality");
          setIsOpen(false);
        },
      },
      {
        id: "action-call",
        category: "Actions",
        title: "Call Engineering Director Directly",
        subtitle: "+91 9861802325 / +91 7008304367 (24/7 SLA)",
        icon: Phone,
        action: () => {
          window.location.href = "tel:+919861802325";
          setIsOpen(false);
        },
      },
      {
        id: "action-whatsapp",
        category: "Actions",
        title: "Connect via Official WhatsApp",
        subtitle: "Instant technical scope consultation",
        icon: MessageCircle,
        action: () => {
          window.open(
            "https://wa.me/917008304367?text=Hello%20Virtoy%20Team%2C%20I%20would%20like%20to%20discuss%20an%20enterprise%20solution.",
            "_blank"
          );
          setIsOpen(false);
        },
      },
    ];

    // Products
    products.forEach((p) => {
      items.push({
        id: `prod-${p.slug}`,
        category: "Products",
        title: p.name,
        subtitle: p.summary,
        icon: Boxes,
        action: () => {
          router.push(`/products/${p.slug}`);
          setIsOpen(false);
        },
      });
    });

    // Services
    services.forEach((s) => {
      items.push({
        id: `serv-${s.slug}`,
        category: "Services",
        title: s.name,
        subtitle: s.summary,
        icon: Code2,
        action: () => {
          router.push(`/services/${s.slug}`);
          setIsOpen(false);
        },
      });
    });

    // Notable Clients
    clients.slice(0, 10).forEach((c) => {
      items.push({
        id: `cli-${c.name}`,
        category: "Clients",
        title: c.name,
        subtitle: `${c.category} • ${c.location || "India"}`,
        icon: Building,
        action: () => {
          router.push("/clients");
          setIsOpen(false);
        },
      });
    });

    return items;
  }, [router]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  // Arrow key navigation
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      playHapticBeep(580, 0.03);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      playHapticBeep(580, 0.03);
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      playChimeSuccess();
      filteredItems[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Floating Header Shortcut Pill Trigger */}
      <button
        onClick={() => {
          setIsOpen(true);
          playHapticBeep(700, 0.05);
        }}
        className="hidden items-center gap-1.5 2xl:gap-2 rounded-full border border-border/80 bg-surface px-2.5 py-1.5 2xl:px-3 text-xs text-muted shadow-sm transition hover:border-primary hover:text-foreground md:flex shrink-0"
        title="Quick Search & Command Hub (Ctrl+K)"
      >
        <Search className="h-3.5 w-3.5 text-primary shrink-0" />
        <span className="text-[11px] font-medium hidden 2xl:inline">Quick Command</span>
        <kbd className="rounded border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted">
          Ctrl K
        </kbd>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-20 backdrop-blur-sm sm:p-6 sm:pt-28">
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-primary/30 bg-surface shadow-2xl transition-all"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center border-b border-border/80 px-4 py-4 sm:px-6">
              <Search className="h-5 w-5 text-primary" />
              <input
                type="text"
                autoFocus
                placeholder="Search products, services, clients or type an action..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent px-4 text-sm font-medium text-foreground placeholder:text-muted focus:outline-none sm:text-base"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-muted hover:bg-surface-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-2 sm:p-3">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted">
                  No matching systems or actions found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = selectedIndex === idx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          playChimeSuccess();
                          item.action();
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all ${
                          isSelected
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "text-foreground hover:bg-surface-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              isSelected ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold sm:text-sm">{item.title}</p>
                            <p
                              className={`text-[11px] line-clamp-1 ${
                                isSelected ? "text-white/80" : "text-muted"
                              }`}
                            >
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${
                              isSelected ? "bg-white/25 text-white" : "bg-surface-muted text-muted"
                            }`}
                          >
                            {item.category}
                          </span>
                          <ArrowRight
                            className={`h-3.5 w-3.5 transition-transform ${
                              isSelected ? "translate-x-1 text-white" : "text-muted opacity-0"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Keyboard Guide */}
            <div className="flex items-center justify-between border-t border-border/80 bg-surface-muted/60 px-4 py-2.5 text-[11px] text-muted sm:px-6">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold">↑</kbd>{" "}
                  <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold">↓</kbd> Navigate
                </span>
                <span>
                  <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold">↵</kbd> Select
                </span>
              </div>
              <span className="font-mono text-[10px] text-primary">Virtoy Instant Command Hub</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
