import Header from "@/components/Header";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getMarkdownContent } from "@/lib/content";

// Força geração estática (SSG) — o arquivo .md é lido em build time
// e o HTML resultante fica pronto para carregamento instantâneo,
// inclusive offline via Service Worker.
export const dynamic = "force-static";

export default function HomePage() {
  const markdown = getMarkdownContent("plano_caminhada_joelho.md");

  return (
    <>
      <Header
        title="Plano de Caminhada e Recuperação do Joelho"
        subtitle="Programa de fortalecimento e mobilidade"
      />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <article aria-label="Plano de treino e recuperação">
          <MarkdownRenderer content={markdown} />
        </article>
      </main>
      <footer className="mx-auto max-w-3xl px-4 pb-10 pt-4 text-center text-xs text-slate-400 dark:text-slate-600 sm:px-6">
        Consulte sempre um profissional de saúde antes de iniciar ou alterar
        seu plano de exercícios.
      </footer>
    </>
  );
}
