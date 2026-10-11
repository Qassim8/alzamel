import { ICONS } from "@/lib/icons";

/**
 * أيقونة عبر الاسم النصي المخزّن في ملفات المحتوى.
 * الاسم غير الموجود يُرجع null بهدوء — مع تحذير في وضع التطوير فقط.
 */
export default function Icon({ name, className }) {
  const C = ICONS[name];
  if (!C) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[Icon] اسم أيقونة غير معروف: "${name}" — أضفه في lib/icons.js`,
      );
    }
    return null;
  }
  return <C className={className} aria-hidden="true" />;
}
