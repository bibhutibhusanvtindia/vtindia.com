"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X, Globe } from "lucide-react";
import { clsx } from "clsx";
import { companyLinks, productLinks, serviceLinks, topLevelLinks } from "@/data/nav";
import { Logo } from "@/components/ui/Logo";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { site } from "@/data/site";
import { useLanguage } from "@/lib/translations";
import { VOICE_LANGUAGES, VoiceLanguage } from "@/lib/sound";

/** Nav item with an animated magenta underline marking the active page. */
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "relative rounded-full px-3 py-1.5 text-xs font-semibold transition-colors hover:text-primary xl:px-3.5 xl:text-sm",
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
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  const dropdowns = [
    {
      label: t("nav_company"),
      id: "company",
      items: [
        { href: "/about", label: t("nav_about_us") },
        { href: "/team", label: t("nav_leadership") },
        { href: "/clients", label: t("nav_clients") },
        { href: "/testimonials", label: t("nav_testimonials") },
        { href: "/careers", label: t("nav_careers") },
      ],
    },
    {
      label: t("nav_services"),
      id: "services",
      items: serviceLinks,
    },
    {
      label: t("nav_products"),
      id: "products",
      items: productLinks,
    },
  ];

  // Header gains depth once the page moves
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
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <Logo priority className="h-9 w-auto sm:h-11 transition-transform duration-300 hover:scale-[1.02]" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-0.5 xl:gap-1.5 lg:flex">
            <NavLink href="/" label={t("nav_home")} active={pathname === "/"} />
            {dropdowns.map((dropdown) => (
              <div
                key={dropdown.id}
                className="relative"
                onMouseEnter={() => setOpenDropdown(dropdown.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold text-foreground transition hover:text-primary xl:px-3 xl:text-sm">
                  {dropdown.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </button>
                <AnimatePresence>
                  {openDropdown === dropdown.id && (
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
            <NavLink href="/portfolio" label={t("nav_portfolio")} active={pathname === "/portfolio"} />
            <NavLink href="/contact" label={t("nav_contact")} active={pathname === "/contact"} />
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden shrink-0 items-center gap-2 xl:gap-2.5 lg:flex">
            {/* Header Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-border/80 bg-surface/80 px-3 py-1.5 text-xs font-bold text-foreground transition hover:border-primary/50 hover:text-primary"
                title="Change Website Language"
              >
                <span>{VOICE_LANGUAGES.find((l) => l.code === lang)?.flag || "🇬🇧"}</span>
                <span>{VOICE_LANGUAGES.find((l) => l.code === lang)?.nativeName || "EN"}</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    className="absolute right-0 top-full mt-1.5 w-36 rounded-2xl border border-border/90 bg-surface/95 p-1.5 shadow-xl backdrop-blur-xl z-50"
                  >
                    {VOICE_LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition ${
                          lang === l.code
                            ? "bg-primary text-white"
                            : "text-muted hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.nativeName}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <CommandPalette />
            <SoundToggle />

            <a
              href={`tel:+91${site.phones[0].number}`}
              className="hidden 2xl:flex group shrink-0 whitespace-nowrap items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-3 py-2 text-xs font-medium text-muted backdrop-blur-sm transition-all hover:border-primary/40 hover:text-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <Phone className="h-3.5 w-3.5 text-primary" />
              {site.phones[0].number}
            </a>

            <Link
              href="/contact"
              className="group relative inline-flex shrink-0 whitespace-nowrap items-center gap-2 overflow-hidden rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong hover:shadow-lg hover:shadow-primary/35 xl:px-5 xl:py-2.5 xl:text-sm"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">{t("nav_get_in_touch")}</span>
            </Link>
          </div>

          {/* Mobile Actions & Menu Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            {/* Mobile language toggle quick button */}
            <button
              onClick={() => {
                const nextLang = lang === "en" ? "hi" : lang === "hi" ? "or" : "en";
                setLang(nextLang);
              }}
              className="flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1.5 text-xs font-bold text-foreground"
              title="Toggle Language"
            >
              <span>{VOICE_LANGUAGES.find((l) => l.code === lang)?.flag || "🇬🇧"}</span>
              <span>{lang.toUpperCase()}</span>
            </button>

            <CommandPalette />
            <SoundToggle />
            <button
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground"
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
                {/* Mobile Language Switcher Bar */}
                <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
                  <span className="text-xs font-bold text-muted">Language:</span>
                  <div className="flex gap-1 bg-surface-muted p-1 rounded-xl">
                    {VOICE_LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => setLang(l.code)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                          lang === l.code
                            ? "bg-primary text-white"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        {l.flag} {l.nativeName}
                      </button>
                    ))}
                  </div>
                </div>

                <Link href="/" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                  {t("nav_home")}
                </Link>
                {dropdowns.map((dropdown) => (
                  <div key={dropdown.id} className="border-t border-border py-2">
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
                  <Link
                    href="/portfolio"
                    className="block py-1.5 text-sm font-medium text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("nav_portfolio")}
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-1.5 text-sm font-medium text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("nav_contact")}
                  </Link>
                </div>

                {/* Mobile Quick Action Buttons */}
                <div className="mt-4 border-t border-border/80 pt-4 flex flex-col gap-3">
                  <a
                    href={`tel:+91${site.phones[0].number}`}
                    className="flex items-center justify-center gap-2 rounded-full border border-border/90 bg-surface py-2.5 text-xs font-semibold text-foreground"
                  >
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    {t("nav_call_us")}: {site.phones[0].number}
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center rounded-full bg-primary py-3 text-sm font-semibold text-white shadow-md shadow-primary/25"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("nav_get_in_touch")}
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
