/** عنوان الموقع — يُضبط من NEXT_PUBLIC_SITE_URL عند النشر. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.alzamil-clean.sa"
).replace(/\/$/, "");
