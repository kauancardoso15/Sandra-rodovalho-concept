export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-ink/15 border-t-gold" />
        <p className="text-xs uppercase tracking-[0.2em] text-ink/40">Carregando</p>
      </div>
    </div>
  );
}
