import { ButtonLink } from "@/components/ButtonLink";
import { company } from "@/data/company";
import type { Lang } from "@/lib/i18n";
import { ui } from "@/lib/i18n";

type CTASectionProps = {
  lang: Lang;
};

export function CTASection({ lang }: CTASectionProps) {
  const labels = ui[lang];

  return (
    <section className="dark-grid py-16 text-white">
      <div className="container-page grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-3xl font-bold">{lang === "en" ? "Get a Dedicated Machine Solution" : "获取专用机床方案"}</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            {lang === "en"
              ? "For connector machining, slotting, milling, spiral groove machining or custom machine requirements, contact us for equipment solutions and technical support."
              : `如果您有连接器加工、插削、铣削、螺旋槽加工或专用设备定制需求，欢迎联系${company.contact}获取设备方案与技术支持。`}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="primary">{labels.sendInquiry}</ButtonLink>
          <ButtonLink href="/products" variant="ghost">{labels.viewProduct}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
