import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { SpecTable } from "@/components/SpecTable";
import { company } from "@/data/company";
import { getProduct, products } from "@/data/products";
import { getLang } from "@/lib/i18n-server";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.model} ${product.name}`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const lang = await getLang();
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const name = lang === "en" ? product.enName : product.name;
  const category = lang === "en" ? product.enCategory : product.category;
  const description = lang === "en" ? product.enDescription : product.description;
  const features = lang === "en" ? product.enFeatures : product.features;

  return (
    <main>
      <section className="dark-grid pt-24 pb-14 text-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="orange-rule text-sm font-bold uppercase tracking-[0.28em] text-signal">{category}</p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">{product.model} {name}</h1>
            <p className="mt-5 text-base leading-8 text-slate-300">{description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/contact" className="bg-signal px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">{lang === "en" ? "Consult Equipment" : "咨询设备"}</a>
              <a href={`tel:${company.phone.replaceAll(" ", "")}`} className="border border-white/40 px-5 py-3 text-sm font-bold text-white hover:border-signal hover:text-signal">{lang === "en" ? "Contact" : "联系"}{lang === "en" ? ` ${company.enContact}` : company.contact}</a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/10">
            <Image src={product.image} alt={`${product.model} ${name}`} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
        </div>
      </section>

      {product.video ? (
        <section className="section-pad bg-white">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="orange-rule text-sm font-bold uppercase tracking-[0.28em] text-signal">Operation Video</p>
                <h2 className="mt-3 text-3xl font-bold text-navy-950">
                  {lang === "en" ? "Machining Operation Video" : "加工操作视频"}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {lang === "en"
                    ? "Watch the YZ-090B CNC vertical slotting-milling center in an actual machining operation scenario."
                    : "查看 YZ-090B 数控立式插铣中心在实际加工操作场景中的运行状态。"}
                </p>
              </div>
              <div className="overflow-hidden border border-slate-200 bg-navy-950 shadow-sm">
                <video
                  src={product.video}
                  className="aspect-video w-full bg-black"
                  controls
                  preload="metadata"
                  playsInline
                  poster={product.image}
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="orange-rule text-sm font-bold uppercase tracking-[0.28em] text-signal">Features</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-950">{lang === "en" ? "Product Features" : "产品特性"}</h2>
            <div className="mt-6 grid gap-3">
              {features.map((feature) => (
                <div key={feature} className="border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="orange-rule text-sm font-bold uppercase tracking-[0.28em] text-signal">Specifications</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-950">{lang === "en" ? "Technical Specifications" : "技术参数"}</h2>
            <div className="mt-6">
              <SpecTable specs={product.specs} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad dark-grid">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="orange-rule text-sm font-bold uppercase tracking-[0.28em] text-signal">Applications</p>
              <h2 className="mt-3 text-3xl font-bold text-white">{lang === "en" ? "Applications" : "应用场景"}</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {lang === "en" ? "Suitable for connector housing machining, spiral groove machining, slotting, milling and high-precision aerospace electronic connector manufacturing." : "适用于连接器壳体加工、螺旋槽加工、插削加工、铣削加工以及航空航天电子连接器等高精度制造场景。"}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(lang === "en"
                  ? ["Connector Housing", "Spiral Groove", "Slotting", "Milling", "Aerospace Electronic Connectors"]
                  : ["连接器壳体加工", "螺旋槽加工", "插削加工", "铣削加工", "航空航天电子连接器加工"]).map((item) => (
                  <span key={item} className="border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">{item}</span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {(product.detailImages ?? [product.image]).map((image) => (
                <div key={image} className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/5 shadow-sm">
                  <Image src={image} alt={`${product.model} 应用细节`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection lang={lang} />
    </main>
  );
}
