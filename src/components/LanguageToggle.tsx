"use client";

import { useRouter } from "next/navigation";
import type { Lang } from "@/lib/i18n";

type LanguageToggleProps = {
  lang: Lang;
  label: string;
};

export function LanguageToggle({ lang, label }: LanguageToggleProps) {
  const router = useRouter();

  function toggleLanguage() {
    const nextLang = lang === "en" ? "zh" : "en";
    document.cookie = `lang=${nextLang}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="border border-white/20 px-4 py-3 text-sm font-bold text-white transition hover:border-signal hover:text-signal"
      aria-label="Toggle language"
    >
      {label}
    </button>
  );
}
