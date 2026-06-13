import Image from "next/image";

type CertificateCardProps = {
  title: string;
  meta: string;
  image: string;
};

export function CertificateCard({ title, meta, image }: CertificateCardProps) {
  return (
    <a
      href={image}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-industrial"
    >
      <div className="relative aspect-[3/4] bg-slate-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-navy-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{meta}</p>
        <p className="mt-4 inline-flex bg-navy-950 px-3 py-2 text-sm font-semibold text-white group-hover:bg-signal">点击查看大图</p>
      </div>
    </a>
  );
}
