import { leads } from "@/lib/data";

function AdminPageFrame({
  eyebrow,
  title,
  description,
  children,
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-[calc(100vh-5rem)] bg-paper p-2 text-ink lg:p-2">
      <p className="text-xs uppercase tracking-[.16em] text-bronze-dark">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-serif text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/55">
        {description}
      </p>
      <div className="mt-4">{children}</div>
    </main>
  );
}

export function LeadsPage() {
  return (
    <AdminPageFrame
      eyebrow="Lead pipeline"
      title="Leads"
      description="Review, qualify, and follow up with new construction inquiries. This prototype uses local sample records."
    >
      <div className="overflow-x-auto border border-ink/10 bg-[#eee9df] p-3">
        <div className="min-w-155">
          {leads.map((lead) => (
            <div
              key={lead.name}
              className="grid grid-cols-[1.3fr_1fr_.8fr_.7fr] gap-4 border-b border-ink/10 py-4 text-sm last:border-0"
            >
              <span className="font-medium">{lead.name}</span>
              <span>{lead.project}</span>
              <span className="text-bronze-dark">{lead.status}</span>
              <span className="text-ink/50">{lead.date}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminPageFrame>
  );
}
