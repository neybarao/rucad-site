/** Build a wa.me deep link from a BR phone number and optional prefilled text. */
export function whatsappUrl(phone: string, message?: string): string {
  let digits = phone.replace(/\D/g, "");
  if (!digits.startsWith("55")) digits = "55" + digits;
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
