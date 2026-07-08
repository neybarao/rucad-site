import { whatsappUrl } from "@/lib/whatsapp";
import { site } from "@/content/site-data";

type Props = { message?: string; children?: React.ReactNode; variant?: "primary" | "ghost" };

export default function WhatsAppButton({ message, children = "Falar no WhatsApp", variant = "primary" }: Props) {
  return (
    <a
      className={`btn btn--${variant}`}
      href={whatsappUrl(site.phoneRaw, message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
