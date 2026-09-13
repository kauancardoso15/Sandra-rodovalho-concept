export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <div className="border border-ink/10 bg-white px-6 py-6">
      <p className="text-xs uppercase tracking-[0.14em] text-ink/50">{label}</p>
      <p className="mt-3 font-display text-4xl text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink/40">{hint}</p>}
    </div>
  );
}
