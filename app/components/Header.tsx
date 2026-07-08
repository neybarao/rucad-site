"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import Logo from "./Logo";

const nav = [
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
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
