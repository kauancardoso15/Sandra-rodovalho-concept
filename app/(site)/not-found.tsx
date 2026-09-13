import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center py-20">
      <Container className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-deep">Erro 404</p>
        <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Página não encontrada</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-ink/60 md:text-base">
          A página que você procura não existe ou foi movida. Que tal conferir nossas novidades?
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LinkButton href="/" variant="secondary" size="md">
            Voltar ao início
          </LinkButton>
          <LinkButton href="/produtos" variant="primary" size="md">
            Ver produtos
          </LinkButton>
        </div>
      </Container>
    </div>
  );
}
