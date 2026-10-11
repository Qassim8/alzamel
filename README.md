# الزامل كلين — AL ZAMIL CLEAN

موقع تعريفي لشركة تنظيف سعودية، عربي RTL بالكامل.
التصميم مبني على **الهوية البصرية المعتمدة** (`AL-ZAMIL-CLEAN-Approved-Identity.pdf`).

**التقنيات:** Next.js 16 (App Router + Turbopack) · React 19 · Tailwind CSS 4 · JavaScript/JSX فقط.

## التشغيل

```bash
npm install
npm run dev
```

| الأمر            | الوظيفة                                         |
| ---------------- | ----------------------------------------------- |
| `npm run dev`    | خادم التطوير                                    |
| `npm run build`  | بناء الإنتاج                                    |
| `npm run start`  | تشغيل نسخة الإنتاج                              |
| `npm run lint`   | فحص ESLint                                      |
| `npm run format` | تنسيق Prettier (يرتّب كلاسات Tailwind تلقائياً) |

---

## هيكل المجلدات

```
app/                      صفحات رفيعة: تركيب أقسام + metadata فقط
  icon.svg                أيقونة الموقع (نسخة من شعار الهوية)
  apple-icon.png          180×180
  opengraph-image.jpg     1200×630  (+ .alt.txt بالنص البديل العربي)
  not-found.jsx           صفحة 404 بهوية الشركة
  globals.css             نظام التصميم كاملاً (@theme + @utility)

components/
  layout/    Navbar · Footer · PageHeader · WhatsAppFloat · MobileActionBar
  sections/  Hero · BubbleField · StatsStrip · ServicesGrid · ProcessSteps
             WhyUs · Method · Gallery · Testimonials · Packages · Coverage
             FaqSection · CTABanner · ContactForm
  ui/        Logo (Logo + LogoMark) · BrandSeal · SectionHeading · ServiceCard
             FaqList · Reveal · Counter · Icon

lib/
  site.js        SITE_URL من NEXT_PUBLIC_SITE_URL
  whatsapp.js    whatsappLink + WA_MESSAGES (كل نصوص الرسائل)
  format.js      ar() و latin() لتحويل الأرقام
  icons.js       خريطة الأيقونات الصريحة
  content/       company · navigation · services · packages · pricing · stats
                 why-us · steps · cities · faqs · gallery · testimonials · socials

scripts/         أدوات محلية (ليست جزءاً من البناء)
  optimize-images.mjs  تحويل الصور إلى WebP عبر sharp
  brand-assets.mjs     توليد apple-icon و opengraph-image
  shots.mjs            لقطات مراجعة بثلاثة مقاسات عبر Chrome
```

---

## أين أعدّل كل نوع من المحتوى؟

| أريد تعديل…                               | الملف                           |
| ----------------------------------------- | ------------------------------- |
| الاسم، الجوال، البريد، السجل، أوقات العمل | `lib/content/company.js`        |
| الخدمات (النص، الأيقونة، الصورة، المميزة) | `lib/content/services.js`       |
| الباقات والعقود                           | `lib/content/packages.js`       |
| أسعار الشقق والفلل                        | `lib/content/pricing.js`        |
| المدن                                     | `lib/content/cities.js`         |
| الأسئلة الشائعة                           | `lib/content/faqs.js`           |
| صور المعرض                                | `lib/content/gallery.js`        |
| آراء العملاء                              | `lib/content/testimonials.js`   |
| روابط السوشيال                            | `lib/content/socials.js`        |
| روابط القائمة العلوية                     | `lib/content/navigation.js`     |
| نصوص رسائل واتساب                         | `lib/whatsapp.js`               |
| الألوان والمقاسات والخطوط                 | `app/globals.css` داخل `@theme` |

### إضافة خدمة جديدة

أضف عنصراً إلى `SERVICES` — يظهر تلقائياً في صفحة الخدمات والفوتر وقائمة النموذج،
برسالة واتساب مجهّزة باسمه. `featured: true` يُظهره في الصفحة الرئيسية.

---

## الهوية البصرية

### الألوان (صفحة 02 من ملف الهوية)

| اللون       | الكود     | الاستخدام                                 |
| ----------- | --------- | ----------------------------------------- |
| تركواز      | `#02B8D2` | زخرفي: أيقونات وخطوط وتدرّجات بلا نص صغير |
| سماوي       | `#0299DF` | `primary` — زخرفي فقط                     |
| أزرق        | `#027FD3` | نهاية التدرّج الزخرفي                     |
| كحلي داعم   | `#082F49` | العناوين والفوتر والأقسام الداكنة         |
| خلفية هادئة | `#F2F8FA` | خلفيات الأقسام                            |

**مشتقات للتباين (WCAG AA)** — ليست ألوان هوية جديدة بل درجات أغمق منها:

| الرمز                 | الكود               | النسبة                            |
| --------------------- | ------------------- | --------------------------------- |
| `--color-primary-ink` | `#026EB3`           | 5.41 على الأبيض · 5.04 على mist   |
| `--color-muted`       | `#566D80`           | 5.39 على الأبيض · 5.03 على mist   |
| `--grad-action`       | `#0272B8 → #025FA0` | النص الأبيض عليه ≥ 5.1 في كل نقطة |

**القاعدة المطبّقة:** `primary` و`grad-brand` للزخرفة فقط.
كل نص أو رابط يستخدم `primary-ink`، وكل خلفية تحمل نصاً أبيض صغيراً تستخدم `grad-action` أو الكحلي.
التوزيع المعتمد 60% أبيض / 25% كحلي / 15% أزرقيات.

### سلّم المقاسات (`@theme`)

`--text-micro` 10px · `--text-caption` 12px · `--text-small` 13.5px ·
`--text-body` 14.5px · `--text-lead` 15px · `--text-card` 17px · `--text-title` 19px

أنصاف الأقطار: `--radius-brand` 18px · `--radius-panel` 26px · `--radius-icon` 14px

### الخطوط

الهوية تعتمد **Arial**. على الويب نستخدم **Readex Pro** للعربي (خط متغيّر، كل الأوزان 400→700 حقيقية)
و**Inter** للاتيني. متغيّرات `next/font` اسمها `--font-readex` و`--font-inter` — **لا تسمّها باسم متغيّر الثيم**
وإلا أشار المتغيّر إلى نفسه وسقط الخط.

### مواضع الشعار (٧ مواضع)

| #   | الموضع                            | المكوّن                                              | الضابط                  |
| --- | --------------------------------- | ---------------------------------------------------- | ----------------------- |
| 1   | الـ Navbar والفوتر                | `Logo`                                               | عرض ≥ 120px             |
| 2   | أيقونة الموقع                     | `app/icon.svg`                                       | نسخة طبق الأصل          |
| 3   | أيقونة آبل وصورة المشاركة         | `app/apple-icon.png` · `app/opengraph-image.jpg`     | هامش 20%                |
| 4   | توقيع الأقسام (قبل كل `eyebrow`)  | `SectionHeading` + inline                            | ارتفاع 14px             |
| 5   | ختم الهيرو الدوّار                | `BrandSeal`                                          | 104px حاسوب / 76px جوال |
| 6   | علامة مائية                       | `WhyUs` · `PageHeader` · `CTABanner` · `ServiceCard` | شفافية 4–8%             |
| 7   | بطاقة الشعار اللفظي + ختام الفوتر | `Method` · `why-us` · `Footer`                       | —                       |

**لا تُعدّل مسارات الشعار أو ألوانه** في `components/ui/Logo.jsx` و`public/brand/mark.svg` —
الحجم والشفافية والموضع فقط. ولا تضع أكثر من علامة بارزة واحدة في نفس الشاشة عدا الـ Navbar.

---

## ⚠️ ما يحتاج تعبئة قبل النشر

### ١. الأسعار (مطلوب)

`lib/content/packages.js` و`lib/content/pricing.js` — ضع السعر مكان `null`:

```js
{ id: "monthly", price: "٧٥٠ ر.س", period: "شهرياً", ... }
{ label: "شقة غرفتين", priceFrom: "٤٥٠ ر.س" }
```

ما دام `null` يظهر «عرض سعر مخصص» و«حسب المعاينة» — الموقع صالح للنشر الآن.

### ٢. روابط السوشيال

`lib/content/socials.js` — الأيقونة بلا `href` لا تظهر إطلاقاً، ولا تدخل ضمن `sameAs` في بيانات schema.org.

### ٣. النطاق

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://alzamil-clean.sa
```

يستخدمه `layout` و`sitemap` و`robots` و JSON-LD. بدونه تُستعمل قيمة احتياطية.

### ٤. مفتاح نموذج التواصل

مفتاح مجاني من https://web3forms.com ثم:

```bash
NEXT_PUBLIC_WEB3FORMS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

بدون المفتاح **لا يُرسل الطلب** — يعرض النموذج زر واتساب يحمل البيانات المكتوبة.

### ٥. آراء العملاء

`lib/content/testimonials.js` مصفوفة فارغة، والقسم لا يظهر حتى تُملأ ببيانات حقيقية:

```js
{ name: "", city: "", service: "", quote: "", rating: 5 }
```

---

## ملاحظات تقنية

- **الـ Navbar** `fixed` دائماً و`main` يحمل `padding-top: var(--nav-h)` — فلا قفزة عند التمرير (CLS = 0).
  الهيرو وترويسة الصفحات تستخدمان `bleed-under-nav` لتمتد خلفيتهما تحته.
- **الهيرو بلا `Reveal`** — عنصر LCP يُرسم فوراً دون انتظار جافاسكربت.
- **العدّاد** يعرض القيمة النهائية في HTML، ويعدّ تصاعدياً فقط إن كان خارج الشاشة عند التحميل.
- **`Reveal`** يستخدم مراقباً واحداً مشتركاً لكل الصفحة، مع شبكتَي أمان:
  الإخفاء مشروط بكلاس `js` على `<html>` (بدون جافاسكربت يظهر كل شيء) + مؤقّت احتياطي ٣ ثوانٍ.
- **فقاعات الهيرو** متوقفة في HTML، تبدأ بعد أول رسم، وتتوقف عند خروج الهيرو من الشاشة.
- **`prefers-reduced-motion`** يوقف كل الحركات.
- **الصور** WebP بعرض 1600px (وفّرت 18MB عن الأصول). لإعادة التوليد: `node scripts/optimize-images.mjs`.
- **قيمتان عشوائيتان متبقّيتان** خارج السلّم عن قصد: `text-[9px]` لسهم مسار التصفح
  و`text-[26px]` لأيقونة واتساب العائمة — مقاسا أيقونتين لا نصّ، وأقرب درجة تبعد أكثر من 0.5px.
