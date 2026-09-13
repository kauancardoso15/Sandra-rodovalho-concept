import { Container } from "@/components/ui/Container";

const STEPS = [
  { label: "Instagram", detail: "Você descobre a marca" },
  { label: "Site", detail: "Explora o catálogo completo" },
  { label: "Produto", detail: "Confere preço e detalhes" },
  { label: "WhatsApp", detail: "Fala direto com a loja" },
  { label: "Venda", detail: "Finaliza sua compra" },
];

/**
 * Comunica a jornada comercial do projeto: do Instagram ao WhatsApp,
 * reforçando que o site é uma ferramenta de vendas, não apenas institucional.
 */
export function JourneySection() {
  return (
    <section className="border-y border-ink/10 bg-cream py-14">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center gap-4 md:flex-1">
              <div className="flex flex-col">
                <span className="font-display text-lg text-ink">{step.label}</span>
                <span className="text-xs text-ink/50">{step.detail}</span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="ml-auto hidden text-gold-deep md:block" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
