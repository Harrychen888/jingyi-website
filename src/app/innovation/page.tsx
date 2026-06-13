import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { certificates } from "@/data/company";
import { getLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "研发与专利",
  description: "了解扬州精艺机电在专用机床结构、动力头配置、控制系统和加工稳定性方面的研发创新。",
};

const capabilities = [
  {
    title: "专机研发能力",
    text: "围绕插削、铣削、螺旋槽加工、多轴复合加工等工艺需求，持续优化机床结构与动力头配置。",
  },
  {
    title: "加工验证能力",
    text: "通过自有机加工车间的实际生产验证，不断提升设备可靠性、稳定性与应用适配能力。",
  },
  {
    title: "技术优化流程",
    text: "从客户零件、工艺难点、设备方案到加工验证形成闭环，为连接器加工客户提供稳定交付基础。",
  },
];

export default async function InnovationPage() {
  const lang = await getLang();

  return (
    <main>
      <PageHero
        eyebrow="Innovation"
        title={lang === "en" ? "Innovation & Patented Technology" : "研发创新与专利技术"}
        description={lang === "en" ? "Jingyi continues to innovate machine structures and machining processes, applying patented technologies to the development and optimization of connector machining equipment." : "持续重视专用机床核心结构与加工工艺的研发创新，将专利技术应用于连接器加工专用设备的研发、制造与优化中。"}
      />
      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-5 text-base leading-9 text-slate-700">
            <p>
              扬州精艺机电有限公司持续重视专用机床核心结构与加工工艺的研发创新，围绕连接器零部件加工中的插削、铣削、螺旋槽加工、多轴复合加工等工艺需求，不断优化机床结构、动力头配置、控制系统与加工稳定性。
            </p>
            <p>
              公司拥有实用新型专利成果，并将专利技术应用于连接器加工专用设备的研发、制造与优化中。通过自有机加工车间的实际生产验证，公司持续提升设备的可靠性、稳定性和加工适配能力。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {certificates.slice(1).map((certificate) => (
              <div key={certificate.image} className="relative aspect-[3/4] overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                <Image src={certificate.image} alt={certificate.title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-top" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad dark-grid">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {capabilities.map((item, index) => (
            <article key={item.title} className="border border-white/10 bg-white/[0.04] p-6">
              <span className="text-sm font-bold text-signal">0{index + 1}</span>
              <h2 className="mt-3 text-xl font-bold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <CTASection lang={lang} />
    </main>
  );
}
