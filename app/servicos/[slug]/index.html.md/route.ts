import { services } from "@/content/services";
import { serviceMarkdown, markdownResponse } from "@/lib/markdown";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return new Response("Not found", { status: 404 });
  return markdownResponse(serviceMarkdown(service));
}
