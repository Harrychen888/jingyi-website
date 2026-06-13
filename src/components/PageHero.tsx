type PageHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function PageHero({ title, description, eyebrow }: PageHeroProps) {
  return (
    <section className="dark-grid pt-24 pb-16 text-white">
      <div className="container-page">
        {eyebrow ? <p className="orange-rule mb-4 text-sm font-bold uppercase tracking-[0.28em] text-signal">{eyebrow}</p> : null}
        <h1 className="max-w-4xl text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">{description}</p>
      </div>
    </section>
  );
}
