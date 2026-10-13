/**
 * جدول الأسعار المعتمد.
 *
 * priceFrom: النص الظاهر للزائر (المكوّن يسبقه بكلمة «من»).
 * amount:    الرقم باللاتينية — يُستخدم في بيانات schema.org فقط.
 * unit:      وحدة التسعير عند وجودها (المتر / الطقم) لبيانات Google.
 * ملاحظة: اترك priceFrom = null لأي بند يُسعّر بالمعاينة فقط.
 */
export const UNIT_PRICING = [
  {
    group: "الشقق والأدوار",
    icon: "FaBuilding",
    units: [
      {
        label: "شقة غرفة وصالة",
        meta: "الشقة الصغيرة",
        priceFrom: "٤٥٠ ر.س",
        amount: 450,
      },
      {
        label: "شقة غرفتين وصالة",
        meta: "الشقة المتوسطة",
        priceFrom: "٦٥٠ ر.س",
        amount: 650,
      },
      {
        label: "شقة ٤ غرف",
        meta: "الشقة الكبيرة — تنظيف داخلي",
        priceFrom: "٨٠٠ ر.س",
        amount: 800,
      },
      {
        label: "دور كامل",
        meta: "دور في فيلا أو عمارة",
        priceFrom: "٩٠٠ ر.س",
        amount: 900,
      },
    ],
  },
  {
    group: "الفلل والمنشآت",
    icon: "FaHouseChimney",
    units: [
      {
        label: "فيلا صغيرة",
        meta: "تنظيف شامل",
        priceFrom: "١٥٠٠ ر.س",
        amount: 1500,
      },
      {
        label: "فيلا كبيرة",
        meta: "تنظيف شامل",
        priceFrom: "٢٠٠٠ ر.س",
        amount: 2000,
      },
      {
        label: "استراحة",
        meta: "حسب المساحة والمرافق",
        priceFrom: "٥٠٠ ر.س",
        amount: 500,
      },
      {
        label: "محل أو مكتب",
        meta: "تنظيف تجاري",
        priceFrom: "٧٠٠ ر.س",
        amount: 700,
      },
    ],
  },
  {
    group: "الكنب والمجالس",
    icon: "FaCouch",
    units: [
      {
        label: "كنب متصل",
        meta: "سعر المتر",
        priceFrom: "٣٥ ر.س / المتر",
        amount: 35,
        unit: "المتر",
      },
      {
        label: "كنب منفصل",
        meta: "طقم ٧ أشخاص",
        priceFrom: "٢٩٠ ر.س للطقم",
        amount: 290,
        unit: "الطقم",
      },
      {
        label: "جلسة عربية",
        meta: "سعر المتر",
        priceFrom: "٣٠ ر.س / المتر",
        amount: 30,
        unit: "المتر",
      },
      {
        label: "مساند الظهر",
        meta: "سعر المتر",
        priceFrom: "١٥ ر.س / المتر",
        amount: 15,
        unit: "المتر",
      },
    ],
  },
  {
    group: "السجاد والموكيت",
    icon: "FaRug",
    units: [
      {
        label: "سجاد وموكيت",
        meta: "سعر المتر",
        priceFrom: "٨ ر.س / المتر",
        amount: 8,
        unit: "المتر",
      },
      {
        label: "سجاد المساجد",
        meta: "خصم خاص للمساجد",
        priceFrom: "٣ ر.س / المتر",
        amount: 3,
        unit: "المتر",
      },
    ],
  },
  {
    group: "المطابخ ودورات المياه والستائر",
    icon: "FaSink",
    units: [
      {
        label: "دورة مياه",
        meta: "تنظيف وتعقيم",
        priceFrom: "٦٠ ر.س",
        amount: 60,
      },
      {
        label: "مطبخ",
        meta: "تنظيف عميق وإزالة دهون",
        priceFrom: "٣٥٠ ر.س",
        amount: 350,
      },
      {
        label: "ستائر",
        meta: "تنظيف دون فكّها",
        priceFrom: "٥٠ ر.س",
        amount: 50,
      },
      {
        label: "شبابيك",
        meta: "زجاج ومجاري النوافذ",
        priceFrom: "٤٠ ر.س",
        amount: 40,
      },
    ],
  },
  {
    group: "الخزانات والأحواش والواجهات",
    icon: "FaDroplet",
    units: [
      {
        label: "خزان أرضي",
        meta: "غسيل وتعقيم",
        priceFrom: "٥٠٠ ر.س",
        amount: 500,
      },
      {
        label: "خزان علوي",
        meta: "غسيل وتعقيم",
        priceFrom: "٣٠٠ ر.س",
        amount: 300,
      },
      {
        label: "أحواش",
        meta: "سعر المتر",
        priceFrom: "٦ ر.س / المتر",
        amount: 6,
        unit: "المتر",
      },
      {
        label: "واجهات زجاجية",
        meta: "السعر النهائي بعد المعاينة",
        priceFrom: "٥٠٠ ر.س",
        amount: 500,
      },
    ],
  },
];

/** أقل سعر في الجدول وأعلاه — لنطاق السعر في بيانات schema.org. */
const ALL_AMOUNTS = UNIT_PRICING.flatMap((g) =>
  g.units.map((u) => u.amount).filter(Boolean),
);
export const PRICE_MIN = Math.min(...ALL_AMOUNTS);
export const PRICE_MAX = Math.max(...ALL_AMOUNTS);
