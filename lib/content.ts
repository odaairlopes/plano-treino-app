import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Lê um arquivo Markdown da pasta /content em tempo de build.
 * Usado dentro de um Server Component (app/page.tsx), portanto
 * o resultado é embutido no HTML estático gerado (SSG) — nada
 * disso roda no navegador do usuário.
 */
export function getMarkdownContent(fileName: string): string {
  const filePath = path.join(CONTENT_DIR, fileName);
  return fs.readFileSync(filePath, "utf8");
}
