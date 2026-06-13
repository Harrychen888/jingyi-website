import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { company } from "@/data/company";
import { ui } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "联系我们",
  description: "联系扬州精艺机电有限公司，获取连接器加工设备、专机定制和技术方案支持。",
};

export default async function ContactPage() {
  const lang = await getLang();
  const labels = ui[lang];

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title={lang === "en" ? "Contact Us" : "联系我们"}
        description={lang === "en" ? "For connector machining, slotting, milling, spiral groove machining or custom machine requirements, submit an inquiry or contact Mr. Bao directly." : "如果您有连接器加工、插削、铣削、螺旋槽加工或专用设备定制需求，欢迎提交询盘或直接联系包先生。"}
      />
      <section className="section-pad subtle-grid">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="dark-grid p-7 text-white">
            <h2 className="text-2xl font-bold">{lang === "en" ? company.englishName : company.name}</h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-300">
              <p><b className="text-white">{lang === "en" ? "Address" : "地址"}：</b>{lang === "en" ? company.enAddress : company.address}</p>
              <p><b className="text-white">{lang === "en" ? "Website" : "网址"}：</b>{company.domain}</p>
              <p><b className="text-white">{lang === "en" ? "Email" : "邮箱"}：</b><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></p>
              <p><b className="text-white">{lang === "en" ? "Contact" : "联系人"}：</b>{lang === "en" ? company.enContact : company.contact}</p>
              <p><b className="text-white">{lang === "en" ? "Phone" : "电话"}：</b><a href={`tel:${company.phone.replaceAll(" ", "")}`} className="hover:text-white">{company.phone}</a></p>
            </div>
            <a
              href="/assets/brochure/jingyi-brochure.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex bg-signal px-5 py-3 text-sm font-bold text-white hover:bg-orange-600"
            >
              {labels.productBrochure}
            </a>
          </aside>
          <div>
            <h2 className="mb-5 text-3xl font-bold text-navy-950">{lang === "en" ? "Submit Inquiry" : "提交询盘"}</h2>
            <ContactForm lang={lang} />
          </div>
        </div>
      </section>
    </main>
  );
}
