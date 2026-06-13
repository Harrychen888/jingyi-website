import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { cases } from "@/data/cases";
import { ui } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "案例展示",
  description: "查看扬州精艺机电在航空航天电子连接器、圆形连接器和精密连接器结构件加工中的设备应用案例。",
};

export default async function CasesPage() {
  const lang = await getLang();
  const labels = ui[lang];

  return (
    <main>
      <PageHero
        eyebrow="Cases"
        title={lang === "en" ? "Application Cases" : "案例展示"}
        description={lang === "en" ? "Typical application scenarios for CNC slotting-milling, spiral groove milling, vertical slotting and multi-axis combined machining equipment." : "结合连接器加工场景，展示数控插铣、螺旋槽铣削、立式插削及多轴复合加工设备的典型应用方向。"}
      />
      <section className="section-pad subtle-grid">
        <div className="container-page grid gap-6 lg:grid-cols-3">
          {cases.map((item) => (
            <article key={item.title} className="group border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-industrial">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image src={item.image} alt={lang === "en" ? item.enTitle : item.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute left-4 top-4 bg-signal px-3 py-2 text-xs font-bold text-white">{lang === "en" ? item.enIndustry : item.industry}</div>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">Application Case</p>
                <h2 className="mt-3 text-2xl font-bold text-navy-950">{lang === "en" ? item.enTitle : item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{lang === "en" ? item.enSummary : item.summary}</p>
                <div className="mt-5 grid gap-2">
                  {(lang === "en" ? item.enHighlights : item.highlights).map((highlight) => (
                    <span key={highlight} className="border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                      {highlight}
                    </span>
                  ))}
                </div>
                <div className="mt-6 border-l-4 border-signal bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">{labels.relatedProduct}</p>
                  <p className="mt-1 font-bold text-navy-950">{lang === "en" ? item.enProduct : item.product}</p>
                </div>
                <Link href="/contact" className="mt-6 inline-flex bg-navy-950 px-4 py-3 text-sm font-bold text-white hover:bg-signal">
                  {labels.consultSimilar}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTASection lang={lang} />
    </main>
  );
}
