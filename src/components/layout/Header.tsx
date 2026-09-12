"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { clsx } from "clsx";
import { companyLinks, productLinks, serviceLinks, topLevelLinks } from "@/data/nav";
import { Logo } from "@/components/ui/Logo";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { site } from "@/data/site";

const dropdowns = [
  { label: "Company", items: companyLinks },
  { label: "Services", items: serviceLinks },
  { label: "Products", items: productLinks },
];

/** Nav item with an animated magenta underline marking the active page. */
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors hover:text-primary",
        active ? "text-primary" : "text-foreground",
      )}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Header gains depth once the page moves, so it reads as a layer above the
  // hero rather than a permanent bar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header
        className={clsx(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-border/80 bg-background/90 shadow-[0_1px_24px_-8px_rgba(240,24,108,0.08)] backdrop-blur-xl"
            : "border-transparent bg-background/70 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {/* Brand Logo with generous right-side breathing space */}
          <div className="flex shrink-0 items-center mr-6 xl:mr-10 2xl:mr-14">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <Logo priority className="h-9 w-auto sm:h-11 transition-transform duration-300 hover:scale-[1.02]" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
            <NavLink href="/" label="Home" active={pathname === "/"} />
            {dropdowns.map((dropdown) => (
              <div
                key={dropdown.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(dropdown.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground transition hover:text-primary xl:px-3.5 xl:text-sm">
                  {dropdown.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </button>
                <AnimatePresence>
                  {openDropdown === dropdown.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full mt-2 grid w-80 -translate-x-1/2 gap-1 rounded-2xl border border-border/90 bg-surface/95 p-3 shadow-2xl backdrop-blur-xl"
                    >
                      {dropdown.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm text-muted transition-all hover:bg-primary/5 hover:text-primary"
                        >
                          <span className="font-medium">{item.label}</span>
                          <span className="text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">→</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            {topLevelLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} active={pathname === link.href} />
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
            <CommandPalette />
            <SoundToggle />
            <a
              href={`tel:+91${site.phones[0].number}`}
              className="hidden 2xl:flex group shrink-0 whitespace-nowrap items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-3.5 py-2 text-xs font-medium text-muted backdrop-blur-sm transition-all hover:border-primary/40 hover:text-foreground"
            >
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span>{site.phones[0].number}</span>
            </a>
            <Link
              href="/contact"
              className="group relative inline-flex shrink-0 whitespace-nowrap items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong hover:shadow-lg hover:shadow-primary/35 xl:text-sm"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Get in touch</span>
            </Link>
          </div>

          {/* Mobile Actions & Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <CommandPalette />
            <SoundToggle />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <div className="max-h-[75vh] overflow-y-auto px-6 py-4">
              <Link href="/" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              {dropdowns.map((dropdown) => (
                <div key={dropdown.label} className="border-t border-border py-2">
                  <p className="py-1 text-xs font-semibold uppercase tracking-wider text-muted">{dropdown.label}</p>
                  {dropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-1.5 text-sm text-foreground"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="border-t border-border py-2">
                {topLevelLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-1.5 text-sm font-medium text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="mt-4 border-t border-border/80 pt-4 flex flex-col gap-3">
                <a
                  href={`tel:+91${site.phones[0].number}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-border/90 bg-surface py-2.5 text-xs font-semibold text-foreground"
                >
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  Call Us: {site.phones[0].number}
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center rounded-full bg-primary py-3 text-sm font-semibold text-white shadow-md shadow-primary/25"
                  onClick={() => setMobileOpen(false)}
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}

