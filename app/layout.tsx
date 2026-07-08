import type { Metadata } from "next";
import { Anek_Latin, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AnimationProvider from "./components/AnimationProvider";
import LoadingScreen from "./components/LoadingScreen";
import JsonLd from "./components/JsonLd";
import { site } from "@/content/site-data";

const anek = Anek_Latin({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-anek",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rucadengenharia.com.br"),
  title: {
    default: "Rucad Engenharia · Soluções em engenharia elétrica",
    template: "%s · Rucad Engenharia",
  },
  description:
    "Projetos, laudos, redes de distribuição, subestações e usinas solares. Engenharia elétrica que entrega no prazo, com responsável técnico do começo ao fim.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Rucad Engenharia",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anek.variable} ${dmSans.variable}`}>
      <body>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: site.name,
          url: site.domain,
          telephone: `+${site.phoneRaw}`,
          email: site.email,
          areaServed: "BR",
          slogan: site.slogan,
          taxID: site.cnpj,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.addressStreet,
            addressLocality: site.addressLocality,
            addressRegion: site.addressRegion,
            postalCode: site.postalCode,
            addressCountry: "BR",
          },
          sameAs: [site.social.instagram, site.social.linkedin],
        }} />
        <LoadingScreen />
        <AnimationProvider />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
