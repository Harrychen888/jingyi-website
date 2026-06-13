import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { certificates, company } from "@/data/company";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { ui } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";

const advantages = [
  {
    title: "行业专注",
    enTitle: "Industry Focus",
    icon: "01",
    description: "深耕光电连接器、电连接器及圆形连接器加工领域，理解连接器零部件的加工难点与工艺需求。",
    enDescription: "Focused on optoelectronic, electrical and circular connector machining, with deep understanding of process challenges.",
  },
  {
    title: "专机研发",
    enTitle: "Dedicated R&D",
    icon: "02",
    description: "围绕插削、铣削、螺旋槽加工、多轴复合加工等工艺需求，提供数控专用机床解决方案。",
    enDescription: "CNC special-purpose machine solutions for slotting, milling, spiral groove machining and multi-axis combined processes.",
  },
  {
    title: "精度稳定",
    enTitle: "Stable Precision",
    icon: "03",
    description: "多款设备具备 ±0.005mm 重复定位精度，满足精密连接器零部件长期稳定加工需求。",
    enDescription: "Multiple machines achieve ±0.005mm repeatability for long-term precision connector part production.",
  },
  {
    title: "资质背书",
    enTitle: "Qualified & Trusted",
    icon: "04",
    description: "中国电子元件行业协会会员单位，拥有专利技术积累，持续推动连接器加工专用设备研发创新。",
    enDescription: "A member of the China Electronic Components Association with patent accumulation and continuous equipment innovation.",
  },
];

const heroStats = [
  { value: "2007", label: "年成立", enLabel: "Founded", detail: "深耕连接器加工设备", enDetail: "Focused on connector machining equipment" },
  { value: "协会", label: "会员单位", enValue: "CECA", enLabel: "Member", detail: "中国电子元件行业协会", enDetail: "China Electronic Components Association" },
  { value: "±0.005", label: "mm 精度", enLabel: "mm Accuracy", detail: "重复定位精度", enDetail: "Repeat positioning accuracy" },
  { value: "航空航天", label: "核心应用", enValue: "Aerospace", enLabel: "Applications", detail: "电子连接器加工行业", enDetail: "Electronic connector machining" },
];

export default function Home() {
  const langPromise = getLang();
  return <HomeContent langPromise={langPromise} />;
}

async function HomeContent({ langPromise }: { langPromise: ReturnType<typeof getLang> }) {
  const lang = await langPromise;
  const labels = ui[lang];

  return (
    <main>
      <section className="hero-grid min-h-[calc(100vh-80px)] pt-28 text-white md:min-h-[760px]">
        <div className="container-page flex min-h-[560px] flex-col justify-center">
          <div className="max-w-3xl">
            <p className="orange-rule mb-6 text-xs font-bold uppercase tracking-[0.36em] text-signal">Yangzhou Jingyi Machinery & Electronics</p>
            <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
              {lang === "en" ? (
                <>
                  CNC Special Machines<br />
                  <span className="text-sky-400">for Connector</span><br />
                  Manufacturing
                </>
              ) : (
                <>
                  连接器行业<br />
                  <span className="text-sky-400">数控专用机床</span><br />
                  制造商
                </>
              )}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-9 text-slate-300 md:text-lg">
              {lang === "en" ? company.enDescription : "扬州精艺机电有限公司专注于光电连接器、电连接器及精密零部件加工领域，提供数控插铣床、螺旋槽铣床、五轴插铣中心、数控立式插铣中心等专用设备，服务于航天、航空、电子等高端制造行业。"}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/products" variant="primary">{labels.viewProducts}</ButtonLink>
              <ButtonLink href="/solutions" variant="ghost">{labels.getSolution}</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">{labels.contactEngineer}</ButtonLink>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 bg-navy-950/82 backdrop-blur">
          <div className="container-page grid md:grid-cols-4">
            {heroStats.map((item) => (
              <div key={item.value} className="border-b border-white/10 py-7 md:border-b-0 md:border-r md:px-7 last:border-r-0">
                <p className="text-3xl font-black text-white">{lang === "en" ? item.enValue ?? item.value : item.value}<span className="ml-1 text-sm font-bold text-slate-400">{lang === "en" ? item.enLabel : item.label}</span></p>
                <p className="mt-2 text-sm text-slate-400">{lang === "en" ? item.enDetail : item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad dark-grid">
        <div className="container-page">
          <SectionTitle tone="dark" eyebrow="Advantages" title={lang === "en" ? "Focused on Connector Machining Equipment" : "专注连接器加工设备，服务高端制造行业"} description={lang === "en" ? "From machine R&D and manufacturing to real connector machining validation, Jingyi continuously improves equipment reliability and batch stability." : "从专用机床研发、制造到实际连接器加工验证，精艺机电围绕高精度连接器零部件加工场景持续优化设备可靠性与批量稳定性。"} />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item) => (
              <article key={item.title} className="group border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-signal hover:bg-navy-800">
                <span className="flex h-12 w-12 items-center justify-center border border-signal/60 font-mono text-sm font-bold text-signal">{item.icon}</span>
                <h3 className="mt-7 text-xl font-bold text-white">{lang === "en" ? item.enTitle : item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{lang === "en" ? item.enDescription : item.description}</p>
                <div className="mt-7 h-px bg-gradient-to-r from-signal to-transparent" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad subtle-grid">
        <div className="container-page">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionTitle eyebrow="Products" title={lang === "en" ? "Core Equipment" : "核心产品设备"} description={lang === "en" ? "Covering slotting, milling, spiral groove machining and multi-axis combined machining for connector housings and precision structural parts." : "覆盖插削、铣削、螺旋槽加工与多轴复合加工，适配连接器壳体、精密结构件和复杂槽型零部件加工。"} />
            <Link href="/products" className="text-sm font-bold text-navy-800 hover:text-signal">{labels.allProducts} →</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionTitle eyebrow="Solutions" title={lang === "en" ? "Connector Machining Solutions" : "连接器加工解决方案"} description={lang === "en" ? "Dedicated machine solutions from equipment selection to machining validation for real connector production scenarios." : "以真实连接器加工场景为核心，提供从设备选型到加工验证的专用机床方案。"} />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {solutions.map((solution) => (
              <article key={solution.title} className="group relative min-h-80 overflow-hidden bg-navy-950 text-white">
                <Image src={solution.image} alt={solution.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-55 transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent" />
                <div className="absolute left-0 top-8 h-16 w-2 bg-signal" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="text-2xl font-bold">{lang === "en" ? solution.enTitle : solution.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-200">{lang === "en" ? solution.enDescription : solution.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad dark-grid">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionTitle tone="dark" eyebrow="Innovation" title={lang === "en" ? "Innovation & Patents" : "研发与专利"} description={lang === "en" ? "Continuous R&D of CNC special-purpose machines, with patented technologies applied to connector machining equipment." : "持续推进数控专用机床研发，专利技术应用于连接器加工设备制造与优化。"} />
            <div className="mt-8 grid gap-4">
              {(lang === "en" ? ["Dedicated machine R&D", "Machining validation", "Technical optimization"] : ["专机研发能力", "加工验证能力", "技术优化流程"]).map((item, index) => (
                <div key={item} className="flex gap-4 border border-white/10 bg-white/[0.04] p-5">
                  <span className="font-mono text-lg font-bold text-signal">0{index + 1}</span>
                  <p className="font-bold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {certificates.map((certificate) => (
              <Link key={certificate.image} href="/certificates" className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-white/5 shadow-sm">
                <Image src={certificate.image} alt={certificate.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover object-top" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="container-page grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-96 overflow-hidden bg-navy-950">
            <Image src="/assets/company/company-profile-page.jpg" alt="扬州精艺机电公司介绍" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover opacity-85" />
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 bg-navy-950/88 text-white backdrop-blur">
              <div className="border-r border-white/10 p-5">
                <b className="block text-2xl">2007</b>
                <span className="text-xs text-slate-400">成立时间</span>
              </div>
              <div className="border-r border-white/10 p-5">
                <b className="block text-2xl">4</b>
                <span className="text-xs text-slate-400">核心设备</span>
              </div>
              <div className="p-5">
                <b className="block text-2xl">GECA</b>
                <span className="text-xs text-slate-400">协会会员</span>
              </div>
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="About" title={lang === "en" ? "About Yangzhou Jingyi" : "关于扬州精艺机电有限公司"} description={lang === "en" ? "Founded in July 2007, Jingyi is located in Guangling Industrial Park, Yangzhou, and focuses on CNC special-purpose machine R&D, manufacturing and machining services." : "成立于2007年7月，坐落于扬州市广陵产业园，主要从事数控专用机床的研发、制造与相关加工服务，是面向光电连接器行业的专用机床制造企业。"} />
            <p className="mt-5 text-sm leading-8 text-slate-600">
              {lang === "en" ? "Through real machining validation in its own workshop, Jingyi continuously improves machine products and provides stable, efficient and reliable equipment solutions for connector manufacturers in aerospace, aviation and electronics." : "公司通过自有机加工车间的实际生产验证，持续改进、验证和创新研发机床产品，为航天、航空、电子等领域连接器加工客户提供稳定、高效、可靠的设备与加工解决方案。"}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/about">{lang === "en" ? "About Us" : "了解公司"}</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">{lang === "en" ? "Contact Us" : "联系我们"}</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <CTASection lang={lang} />
    </main>
  );
}
