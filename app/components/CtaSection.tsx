import WhatsAppButton from "./WhatsAppButton";
import { site } from "@/content/site-data";

export default function CtaSection({ title, body, message }: { title: string; body?: string; message?: string }) {
  return (
    <section className="section section--dark cta">
      <div className="wrap cta__inner">
        <h2 className="cta__title">{title}</h2>
        {body && <p className="cta__body">{body}</p>}
        <div className="cta__actions">
          <WhatsAppButton message={message} />
          <a className="btn btn--ghost" href={`tel:+${site.phoneRaw}`}>{site.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}
