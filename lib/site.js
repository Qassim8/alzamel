/**
 * عنوان الموقع الأساسي.
 * يُضبط من NEXT_PUBLIC_SITE_URL عند النشر؛ والقيمة الاحتياطية هي
 * نطاق Vercel الحالي إلى أن يُشترى النطاق الرسمي.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://alzamel.vercel.app"
).replace(/\/$/, "");

/** المدينة الرئيسية — تُستخدم في العناوين والأوصاف وبيانات schema. */
export const PRIMARY_CITY = "الرياض";
