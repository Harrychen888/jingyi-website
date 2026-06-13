import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { getLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "产品中心",
  description: "查看扬州精艺机电数控插铣床、数控螺旋槽铣床、五轴插铣中心和数控立式插铣中心。",
};

export default async function ProductsPage() {
  const lang = await getLang();

  return (
    <main>
      <PageHero
        eyebrow="Products"
        title={lang === "en" ? "Products" : "产品中心"}
        description={lang === "en" ? "Reliable CNC special-purpose machines for slotting, milling, spiral groove machining and multi-axis combined machining of connector parts." : "围绕连接器零部件的插削、铣削、螺旋槽加工与多轴复合加工需求，提供稳定可靠的数控专用机床。"}
      />
      <section className="section-pad subtle-grid">
        <div className="container-page grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} lang={lang} />
          ))}
        </div>
      </section>
      <CTASection lang={lang} />
    </main>
  );
}
