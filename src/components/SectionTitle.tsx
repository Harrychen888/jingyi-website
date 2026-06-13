type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionTitle({ eyebrow, title, description, align = "left", tone = "light" }: SectionTitleProps) {
  const titleColor = tone === "dark" ? "text-white" : "text-navy-950";
  const textColor = tone === "dark" ? "text-slate-300" : "text-slate-600";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="orange-rule mb-3 text-sm font-bold uppercase tracking-[0.28em] text-signal">{eyebrow}</p> : null}
      <h2 className={`text-3xl font-bold leading-tight md:text-4xl ${titleColor}`}>{title}</h2>
      {description ? <p className={`mt-4 text-base leading-8 ${textColor}`}>{description}</p> : null}
    </div>
  );
}
