import type { LucideIcon } from "lucide-react";

interface ContactDetailCardProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}

export function ContactDetailCard({
  icon: Icon,
  label,
  children,
}: ContactDetailCardProps) {
  return (
    <div className="border border-ink/15 bg-white/40 p-6">
      <Icon size={20} className="text-bronze-dark" />
      <p className="mt-4 text-[10px] uppercase tracking-widest text-ink/50">
        {label}
      </p>
      <div className="mt-2 text-sm leading-6 text-ink/80">{children}</div>
    </div>
  );
}
