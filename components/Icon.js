import * as Fa from "react-icons/fa6";

/**
 * أيقونة من react-icons/fa6 عبر الاسم النصي المخزّن في lib/data.js
 * تُرجع null بهدوء لو كان الاسم غير موجود بدل كسر الصفحة.
 */
export default function Icon({ name, className }) {
  const C = Fa[name];
  if (!C) return null;
  return <C className={className} aria-hidden="true" />;
}
