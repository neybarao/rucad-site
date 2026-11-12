"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import Logo from "./Logo";

const nav = [
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

// Áreas sobre as quais o header fica transparente (o hero do topo de cada
// página). No resto, ele ganha fundo para não se misturar com o conteúdo.
// Para liberar outra área, adicione data-header="transparent" nela.
const DARK_ZONES = ".hero, [data-header='transparent']";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // O header fica transparente sobre o hero e ganha fundo escuro translúcido
  // no resto da página. A checagem é pela posição: se o meio do header está
  // dentro do hero.
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      setScrolled(window.scrollY > 200);
      const h = headerRef.current?.offsetHeight ?? 80;
      const probe = h / 2;
      const dark = document.querySelectorAll<HTMLElement>(DARK_ZONES);
      let overDark = false;
      for (const el of dark) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) { overDark = true; break; }
      }
      setOnLight(!overDark);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <header ref={headerRef} className={`header ${scrolled ? "header--scrolled" : ""} ${onLight ? "header--solid" : ""} ${open ? "header--open" : ""}`}>
      <div className="wrap header__inner">
        <Link href="/" className="header__logo" aria-label="Rucad Engenharia"><Logo height={38} /></Link>
        <nav className={`header__nav ${open ? "is-open" : ""}`}>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
          <WhatsAppButton>Falar no WhatsApp</WhatsAppButton>
        </nav>
        <button className="header__burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
