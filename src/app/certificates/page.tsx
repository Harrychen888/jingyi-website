import type { Metadata } from "next";
import { CertificateCard } from "@/components/CertificateCard";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { certificates, company } from "@/data/company";
import { getLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "资质荣誉",
  description: "扬州精艺机电有限公司中国电子元件行业协会会员证书及实用新型专利证书展示。",
};

export default async function CertificatesPage() {
  const lang = await getLang();

  return (
    <main>
      <PageHero
        eyebrow="Certificates"
        title={lang === "en" ? "Certificates & Honors" : "资质荣誉"}
        description={lang === "en" ? "Certificates, association membership and patent achievements reflecting Jingyi's technical accumulation in connector machining equipment." : "展示中国电子元件行业协会会员证书、实用新型专利证书及公司在连接器加工设备研发制造方面的技术积累。"}
      />
      <section className="section-pad subtle-grid">
        <div className="container-page">
          <div className="border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">会员名称</p>
                <p className="mt-1 font-bold text-navy-950">{company.name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">会员编号</p>
                <p className="mt-1 font-bold text-navy-950">{company.memberNo}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">发证日期</p>
                <p className="mt-1 font-bold text-navy-950">{company.memberIssuedAt}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">有效期至</p>
                <p className="mt-1 font-bold text-navy-950">{company.memberValidUntil}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {certificates.map((certificate) => (
              <CertificateCard key={certificate.image} {...certificate} />
            ))}
          </div>
        </div>
      </section>
      <CTASection lang={lang} />
    </main>
  );
}
