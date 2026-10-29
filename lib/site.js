/**
 * عنوان الموقع الأساسي — النطاق الرسمي.
 * يمكن تجاوزه بـ NEXT_PUBLIC_SITE_URL (مفيد لبيئة المعاينة).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.alzamilclean.com"
).replace(/\/$/, "");

/** المدينة الرئيسية — تُستخدم في العناوين والأوصاف وبيانات schema. */
export const PRIMARY_CITY = "الرياض";
