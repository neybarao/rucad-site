import { articles, getArticle } from "@/content/articles";
import { articleMarkdown, markdownResponse } from "@/lib/markdown";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return new Response("Not found", { status: 404 });
  return markdownResponse(articleMarkdown(article));
}
