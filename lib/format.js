/** تحويل الأرقام اللاتينية إلى أرقام عربية-هندية للاتساق مع نصوص الموقع. */
export function ar(n) {
  return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
}

/** تحويل الأرقام العربية-الهندية إلى لاتينية — للتحقق من المدخلات. */
export function latin(n) {
  return String(n).replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
}
