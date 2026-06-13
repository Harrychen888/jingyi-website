import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import type { Lang } from "@/lib/i18n";
import { ui } from "@/lib/i18n";

type ProductCardProps = {
  product: Product;
  lang: Lang;
};

export function ProductCard({ product, lang }: ProductCardProps) {
  const labels = ui[lang];
  const power = product.specs.find((spec) => spec.label === "总电机功率")?.value;
  const precision = product.specs.find((spec) => spec.label.includes("重复定位精度"))?.value;
  const travel = product.specs.find((spec) => spec.label.includes("行程"))?.value;
  const name = lang === "en" ? product.enName : product.name;
  const category = lang === "en" ? product.enCategory : product.category;
  const description = lang === "en" ? product.enDescription : product.description;

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-industrial">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={`${product.model} ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 bg-signal px-3 py-2 font-mono text-xs font-bold text-white">
          {product.model}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal">{category}</p>
        <h3 className="mt-2 text-xl font-bold text-navy-950">{name}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-4 grid grid-cols-3 border border-slate-200 text-xs">
          <span className="border-r border-slate-200 bg-slate-50 p-2 text-slate-600">{lang === "en" ? "Power" : "功率"}<br /><b className="font-mono text-navy-950">{power}</b></span>
          <span className="border-r border-slate-200 bg-slate-50 p-2 text-slate-600">{lang === "en" ? "Travel" : "行程"}<br /><b className="font-mono text-navy-950">{travel}</b></span>
          <span className="bg-slate-50 p-2 text-slate-600">{lang === "en" ? "Accuracy" : "精度"}<br /><b className="font-mono text-navy-950">{precision}</b></span>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Link href={`/products/${product.slug}`} className="bg-navy-950 px-3 py-3 text-center text-sm font-bold text-white hover:bg-navy-800">
            {labels.viewDetails}
          </Link>
          <Link href="/contact" className="border border-navy-950 px-3 py-3 text-center text-sm font-bold text-navy-950 hover:border-signal hover:text-signal">
            {labels.getQuote}
          </Link>
        </div>
      </div>
    </article>
  );
}
