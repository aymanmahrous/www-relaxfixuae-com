// Central place to edit your real contact channels.
// Replace these with your real handles — they power every CTA in the app.
export const CONTACT = {
  whatsapp: "201000000000", // intl format without + and without spaces
  telegram: "AymanMahrous",  // username without @
  email: "ayman@pixelreel.studio",
  instagram: "ayman.mahrous",
  tiktok: "aymanmahrous",
  brandBy: "Ayman Mahrous",
};

export function waLink(text?: string) {
  const t = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${CONTACT.whatsapp}${t}`;
}

export function tgLink(text?: string) {
  const base = `https://t.me/${CONTACT.telegram}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
