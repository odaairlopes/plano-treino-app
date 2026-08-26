import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

// Componentes customizados para cada elemento HTML gerado pelo Markdown.
// Isso nos dá controle total de estilo, acessibilidade e performance
// (ex.: lazy loading nativo em todas as imagens/GIFs).
const components: Components = {
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      loading="lazy"
      decoding="async"
      className="mx-auto block rounded-xl border border-slate-200 shadow-sm dark:border-slate-800"
    />
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-slate-100 px-3 py-2 align-top text-slate-600 dark:border-slate-800 dark:text-slate-300">
      {children}
    </td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 rounded-r-md border-l-4 border-brand-400 bg-brand-50 px-4 py-2 text-slate-700 dark:border-brand-500 dark:bg-brand-900/20 dark:text-slate-300">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700 dark:text-brand-400 dark:decoration-brand-700"
    >
      {children}
    </a>
  ),
  h2: ({ children, id }) => (
    <h2
      id={id}
      className="mt-10 scroll-mt-24 border-b border-slate-200 pb-2 text-2xl font-bold text-slate-900 dark:border-slate-800 dark:text-white"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      className="mt-6 scroll-mt-24 text-xl font-semibold text-slate-900 dark:text-white"
    >
      {children}
    </h3>
  ),
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-a:break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
