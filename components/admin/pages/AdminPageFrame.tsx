export default function AdminPageFrame({
  eyebrow,
  title,
  description,
  action,
  children,
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-[calc(100vh-5rem)] bg-paper px-5 text-ink">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[.16em] text-bronze-dark">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-serif text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/55">
            {description}
          </p>
        </div>
        {action}
      </div>
      <div className="mt-8">{children}</div>
    </main>
  );
}
