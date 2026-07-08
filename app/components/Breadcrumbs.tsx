import Link from "next/link";
import JsonLd from "./JsonLd";
import { site } from "@/content/site-data";

type Crumb = { name: string; href: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.domain}${c.href}`,
    })),
  };
  return (
    <div className="crumbs-bar">
      <nav className="crumbs wrap" aria-label="breadcrumb">
        {items.map((c, i) => (
          <span key={c.href}>
            {i > 0 && <span className="crumbs__sep">/</span>}
            <Link href={c.href}>{c.name}</Link>
          </span>
        ))}
      </nav>
      <JsonLd data={ld} />
    </div>
  );
}
