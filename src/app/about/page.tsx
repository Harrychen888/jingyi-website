import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { company } from "@/data/company";
import { getLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "关于精艺",
  description: "了解扬州精艺机电有限公司的发展历程、行业定位、制造能力和经营理念。",
};

export default async function AboutPage() {
  const lang = await getLang();

  return (
    <main>
      <PageHero
        eyebrow="About"
        title={lang === "en" ? "About Yangzhou Jingyi Electromechanical" : "关于扬州精艺机电有限公司"}
        description={lang === "en" ? "Founded in July 2007, Jingyi focuses on CNC special-purpose machine R&D, manufacturing and connector machining services for aerospace, aviation and electronics industries." : "成立于2007年7月，专注数控专用机床研发、制造与连接器加工服务，面向航天、航空、电子等高端制造领域。"}
      />
      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-start">
          <div className="space-y-5 text-base leading-9 text-slate-700">
            <p>
              扬州精艺机电有限公司成立于2007年7月，坐落于扬州市广陵产业园园区，毗邻京沪高速与沪陕高速，交通便利。公司主要从事数控专用机床的研发、制造与相关加工服务，是面向光电连接器行业的专用机床制造企业，同时也是中国电子元件行业协会电接插件分会会员单位。
            </p>
            <p>
              公司生产的专用机床广泛应用于航天、航空、电子等领域连接器产品的加工制造。为持续提升机床制造水平，公司与扬州欧普集团开展合作，将德国“欧普铁玛”数控机床及加工中心制造技术与公司专机制造经验相结合，为客户提供高质量的通用及专用制造设备。
            </p>
            <p>
              为进一步提升专用机床的可靠性、稳定性与应用适配能力，公司成立机加工车间，承接电连接器生产及加工业务，并通过实际生产场景持续改进、验证和创新研发机床产品。
            </p>
            <p>
              扬州精艺机电有限公司始终坚持以产品质量为根本，以客户需求为中心，秉承“创新无止境，实践出真知”的理念，持续为连接器及精密制造行业客户提供稳定、高效、可靠的设备与加工解决方案。
            </p>
          </div>
          <div className="border border-slate-200 bg-slate-50 p-7 shadow-sm">
            <p className="orange-rule text-sm font-bold uppercase tracking-[0.28em] text-signal">Company Profile</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-navy-950">以专用机床研发制造为核心</h2>
            <p className="mt-5 text-sm leading-8 text-slate-600">
              精艺机电围绕连接器零部件加工场景，将设备研发、机床制造、加工验证与客户需求结合，持续提升专用设备的可靠性、稳定性与应用适配能力。
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["2007", "成立时间"],
                ["GECA", "协会会员"],
                ["±0.005mm", "重复定位精度"],
                ["4款", "核心专用设备"],
              ].map(([value, label]) => (
                <div key={label} className="border border-slate-200 bg-white p-5">
                  <p className="font-mono text-2xl font-black text-navy-950">{value}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-l-4 border-signal bg-white p-5 text-sm leading-7 text-slate-600">
              经营理念：以产品质量为根本，以客户需求为中心，秉承“创新无止境，实践出真知”。
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad dark-grid">
        <div className="container-page">
          <SectionTitle tone="dark" title="企业信息" description="以研发制造数控专用机床为核心，围绕连接器加工场景提供设备与工艺支持。" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["成立时间", company.founded],
              ["公司地址", company.address],
              ["行业背书", `中国电子元件行业协会会员单位 ${company.memberNo}`],
              ["应用行业", "航天、航空、电子、光电连接器、电连接器、圆形连接器"],
              ["经营理念", "创新无止境，实践出真知"],
              ["联系方式", `${company.contact} ${company.phone}`],
            ].map(([label, value]) => (
              <div key={label} className="border border-white/10 bg-white/[0.04] p-6">
                <p className="text-sm font-semibold text-signal">{label}</p>
                <p className="mt-2 text-lg font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection lang={lang} />
    </main>
  );
}
