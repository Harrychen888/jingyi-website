"use client";

import Link from "next/link";
import { useState } from "react";
import { company, navItems } from "@/data/company";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { Lang } from "@/lib/i18n";
import { ui } from "@/lib/i18n";

type HeaderProps = {
  lang: Lang;
};

export function Header({ lang }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const labels = ui[lang];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-5">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 shrink-0 grid-cols-2 gap-1 bg-signal p-2">
            <i className="bg-white/85" />
            <i className="bg-white/85" />
            <i className="bg-white/85" />
            <i className="bg-white/85" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold tracking-wide text-white">{lang === "en" ? company.englishName : company.name}</span>
            <span className="hidden text-[11px] uppercase tracking-[0.22em] text-slate-400 sm:block">Yangzhou Jingyi</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-semibold text-slate-300 transition hover:text-signal"
            >
              {lang === "en" ? item.enLabel : item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle lang={lang} label={labels.languageLabel} />

          <Link
            href="/contact"
            className="bg-signal px-5 py-3 text-sm font-bold text-white hover:bg-orange-600"
          >
            {labels.quote}
          </Link>
        </div>

        <button
          type="button"
          aria-label="打开导航"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-white lg:hidden"
        >
          <span className="text-xl leading-none">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open ? (
        <nav className="border-t border-white/10 bg-navy-950 lg:hidden">
          <div className="container-page grid gap-1 py-3">
            <div className="px-3 py-2">
              <LanguageToggle lang={lang} label={labels.languageLabel} />
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-signal"
              >
                {lang === "en" ? item.enLabel : item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
