import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/content/services";
import ServicePage from "@/app/components/ServicePage";
import { pageMetadata } from "@/lib/seo";
import { getServiceImagePath } from "@/lib/service-media";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const image = getServiceImagePath(s.slug);
  return pageMetadata({
    title: s.seoTitle,
    description: s.metaDescription,
    path: `/servicos/${s.slug}/`,
    image: image ? { url: image, width: 1536, height: 1024, alt: s.imageAlt } : undefined,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
