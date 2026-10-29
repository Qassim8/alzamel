/**
 * توليد أصول الهوية الثابتة:
 *  - app/apple-icon.png      180×180، القطرة على أبيض بهامش ٢٠٪
 *  - app/opengraph-image.jpg 1200×630، صورة فريق + طبقة كحلية + القطرة
 *
 * يُشغَّل مرة واحدة: node scripts/brand-assets.mjs
 * لا نكتب نصاً عربياً هنا — تشكيل الحروف غير مضمون في sharp.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const MARK = path.join(ROOT, "public/brand/mark.svg");
const PHOTO = path.join(ROOT, "public/images/04-sofa-team.webp");

const markSvg = await readFile(MARK, "utf8");

/** يعيد رسم الشعار بحجم محدد، أو أبيض بالكامل. */
async function markPng(height, white = false) {
  const svg = white
    ? markSvg.replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="#ffffff"')
    : markSvg;
  return sharp(Buffer.from(svg), { density: 600 })
    .resize({
      height,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

// ── apple-icon: القطرة على أبيض بهامش ٢٠٪
{
  const SIZE = 180;
  const mark = await markPng(Math.round(SIZE * 0.6));
  const out = path.join(ROOT, "app/apple-icon.png");
  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(out);
  console.log("✓ app/apple-icon.png (180×180)");
}

// ── opengraph-image: صورة فريق + طبقة كحلية ٧٥٪ + قطرة بيضاء كبيرة
{
  const W = 1200;
  const H = 630;
  const photo = await sharp(PHOTO)
    .resize(W, H, { fit: "cover", position: "top" })
    .toBuffer();
  const veil = await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 8, g: 47, b: 73, alpha: 0.75 },
    },
  })
    .png()
    .toBuffer();
  const mark = await markPng(320, true);

  const out = path.join(ROOT, "app/opengraph-image.jpg");
  await sharp(photo)
    .composite([
      { input: veil, blend: "over" },
      { input: mark, gravity: "center" },
    ])
    .jpeg({ quality: 88 })
    .toFile(out);
  console.log("✓ app/opengraph-image.jpg (1200×630)");
}

// ── النص البديل بالعربية (يُكتب هنا لا داخل الصورة)
await writeFile(
  path.join(ROOT, "app/opengraph-image.alt.txt"),
  "شعار الزامل كلين على خلفية كحلية تظهر خلفها صورة لفنّي من فريق الشركة أثناء العمل.",
  "utf8",
);
console.log("✓ app/opengraph-image.alt.txt");

// ── شعار جوجل: صورة نقطية مربّعة.
// Google لا يقبل SVG في نتيجة الشعار، ويشترط ألا يقل عن 112×112.
{
  const SIZE = 512;
  const mark = await markPng(Math.round(SIZE * 0.66));
  const out = path.join(ROOT, "public/brand/logo-google.png");
  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(out);
  console.log("✓ public/brand/logo-google.png (512×512)");
}
