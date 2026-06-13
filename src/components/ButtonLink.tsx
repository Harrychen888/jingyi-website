import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const styles = {
    primary: "bg-signal text-white shadow-[0_16px_35px_rgba(242,140,40,0.25)] hover:bg-orange-600",
    secondary: "border border-navy-800 bg-white text-navy-950 hover:border-signal hover:text-signal",
    ghost: "border border-white/30 text-white hover:border-signal hover:text-signal",
  };

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-none px-6 text-sm font-bold transition ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
