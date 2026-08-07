export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-12 lg:py-16">
          <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {intro}
          </p>
        </div>
      </section>
      <section className="py-14 lg:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl space-y-8">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-xl font-semibold text-foreground">{s.h}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {s.p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}