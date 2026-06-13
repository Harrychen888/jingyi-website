import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { cases } from "@/data/cases";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { ui } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "连接器加工解决方案",
  description: "面向光电连接器、电连接器、圆形连接器和航空航天电子连接器加工需求的专用机床解决方案。",
};

export default async function SolutionsPage() {
  const lang = await getLang();
  const labels = ui[lang];

  return (
    <main>
      <PageHero
        eyebrow="Solutions"
        title={lang === "en" ? "Connector Machining Solutions" : "连接器加工解决方案"}
        description={lang === "en" ? "Dedicated CNC slotting, spiral groove milling, vertical slotting and multi-axis combined machining equipment for optoelectronic, electrical and circular connector parts." : "围绕光电连接器、电连接器、圆形连接器等精密零部件加工需求，提供数控插铣、螺旋槽铣削、立式插削、多轴复合加工等专用机床设备。"}
      />
      <section className="section-pad bg-white">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {solutions.map((solution) => (
            <article key={solution.title} className="grid overflow-hidden border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-64 bg-slate-100">
                <Image src={solution.image} alt={lang === "en" ? solution.enTitle : solution.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-navy-950">{lang === "en" ? solution.enTitle : solution.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{lang === "en" ? solution.enDescription : solution.description}</p>
                <Link href="/contact" className="mt-6 inline-flex bg-navy-950 px-4 py-3 text-sm font-bold text-white hover:bg-signal">
                  {labels.consultSolution}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section-pad dark-grid">
        <div className="container-page">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="orange-rule text-sm font-bold uppercase tracking-[0.28em] text-signal">Cases</p>
              <h2 className="mt-3 text-3xl font-bold text-white">{lang === "en" ? "Application Cases" : "案例展示"}</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {lang === "en" ? "Typical connector machining scenarios showing equipment selection, process direction and validation logic." : "以典型连接器加工场景为线索，展示设备选型、加工工艺与验证方向。"}
              </p>
            </div>
            <Link href="/cases" className="text-sm font-bold text-signal hover:text-white">{labels.allCases} →</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {cases.map((item) => (
              <article key={item.title} className="border border-white/10 bg-white/[0.04]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.image} alt={lang === "en" ? item.enTitle : item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-80" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">{lang === "en" ? item.enIndustry : item.industry}</p>
                  <h3 className="mt-3 text-xl font-bold text-white">{lang === "en" ? item.enTitle : item.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-300">{lang === "en" ? item.enSummary : item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad subtle-grid">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="orange-rule text-sm font-bold uppercase tracking-[0.28em] text-signal">Recommended Products</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-950">推荐关联产品</h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} lang={lang} />
            ))}
          </div>
        </div>
      </section>
      <CTASection lang={lang} />
    </main>
  );
}
