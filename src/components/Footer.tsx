import Link from "next/link";
import { company, navItems } from "@/data/company";
import type { Lang } from "@/lib/i18n";
import { ui } from "@/lib/i18n";

type FooterProps = {
  lang: Lang;
};

export function Footer({ lang }: FooterProps) {
  const labels = ui[lang];

  return (
    <footer className="dark-grid text-white">
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 grid-cols-2 gap-1 bg-signal p-2">
              <i className="bg-white/85" />
              <i className="bg-white/85" />
              <i className="bg-white/85" />
              <i className="bg-white/85" />
            </span>
            <p className="text-xl font-bold">{lang === "en" ? company.englishName : company.name}</p>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">{lang === "en" ? company.enDescription : company.description}</p>
          <p className="mt-4 text-sm text-slate-400">
            {lang === "en" ? `CECA member · Member No. ${company.memberNo}` : `中国电子元件行业协会会员单位 · 会员编号 ${company.memberNo}`}
          </p>
        </div>
        <div>
          <p className="font-semibold">{labels.footerNav}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-300">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {lang === "en" ? item.enLabel : item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">{labels.contactInfo}</p>
          <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
            <p>{lang === "en" ? "Contact" : "联系人"}：{lang === "en" ? company.enContact : company.contact}</p>
            <p>{lang === "en" ? "Phone" : "电话"}：{company.phone}</p>
            <p>{lang === "en" ? "Email" : "邮箱"}：{company.email}</p>
            <p>{lang === "en" ? "Address" : "地址"}：{lang === "en" ? company.enAddress : company.address}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {company.englishName}. All rights reserved.
      </div>
    </footer>
  );
}
