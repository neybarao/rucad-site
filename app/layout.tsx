import type { Metadata } from "next";
import { Anek_Latin, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { site } from "@/content/site-data";
import { services } from "@/content/services";
import { ORG_ID, WEBSITE_ID, DEFAULT_OG_IMAGE, LOGO_URL, absoluteUrl } from "@/lib/seo";

const anek = Anek_Latin({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-anek",
  display: "optional",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Rucad Engenharia · Soluções em engenharia elétrica",
    template: "%s · Rucad Engenharia",
  },
  description:
    "Projetos, laudos, redes de distribuição, subestações e usinas solares. Engenharia elétrica que entrega no prazo, com responsável técnico do começo ao fim.",
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [DEFAULT_OG_IMAGE.url] },
  icons: {
    icon: "/favicon.svg",
    apple: "/logo-rucad-512.png",
  },
  formatDetection: { telephone: false },
};

// Entidade principal do site. ProfessionalService é um subtipo de LocalBusiness,
// o que ajuda tanto no Google (painel/local) quanto em respostas de IA que
// precisam saber quem é a empresa, onde fica e o que faz.
const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "Organization"],
      "@id": ORG_ID,
      name: site.name,
      legalName: site.name,
      url: `${site.domain}/`,
      logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
      image: absoluteUrl(DEFAULT_OG_IMAGE.url),
      description:
        "Empresa de engenharia elétrica de Campo Grande (MS): projeto elétrico e SPDA, laudos e ensaios, construção e manutenção de redes e subestações, eficiência energética e usinas fotovoltaicas.",
      slogan: site.slogan,
      telephone: `+${site.phoneRaw}`,
      email: site.email,
      taxID: site.cnpj,
      areaServed: { "@type": "Country", name: "Brasil" },
      address: {
        "@type": "PostalAddress",
        streetAddress: site.addressStreet,
        addressLocality: site.addressLocality,
        addressRegion: site.addressRegion,
        postalCode: site.postalCode,
        addressCountry: "BR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${site.phoneRaw}`,
        email: site.email,
        availableLanguage: "pt-BR",
      },
      knowsAbout: [
        "Projeto elétrico",
        "SPDA",
        "Laudo elétrico",
        "Comissionamento elétrico",
        "NR-10",
        "Redes de distribuição de baixa e média tensão",
        "Subestações de média tensão",
        "Eficiência energética",
        "Usinas fotovoltaicas",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de engenharia elétrica",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": `${site.domain}/servicos/${s.slug}/#service`,
            name: s.title,
            url: `${site.domain}/servicos/${s.slug}/`,
          },
        })),
      },
      sameAs: [site.social.instagram, site.social.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${site.domain}/`,
      name: site.name,
      inLanguage: "pt-BR",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anek.variable} ${dmSans.variable}`}>
      <body>
        <JsonLd data={orgLd} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
