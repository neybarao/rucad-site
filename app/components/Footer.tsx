import Link from "next/link";
import { site } from "@/content/site-data";
import { services } from "@/content/services";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <div className="footer__logo">RUCAD</div>
          <p className="footer__slogan">{site.slogan}</p>
        </div>
        <nav>
          <h4>Serviços</h4>
          {services.map((s) => (
            <Link key={s.slug} href={`/servicos/${s.slug}`}>{s.title}</Link>
          ))}
        </nav>
        <nav>
          <h4>Empresa</h4>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
        <div className="footer__contact">
          <h4>Contato</h4>
          <a href={`tel:+${site.phoneRaw}`}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p>{site.address}</p>
          <p>CNPJ: {site.cnpj}</p>
        </div>
      </div>
      <div className="wrap footer__bottom">© 2026 {site.name}</div>
    </footer>
  );
}
