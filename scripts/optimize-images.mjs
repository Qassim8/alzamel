/**
 * تحويل صور الخدمات من PNG ثقيل إلى WebP بعرض 1600px وجودة 80.
 * يُشغَّل مرة واحدة:  node scripts/optimize-images.mjs
 * ثم تُحذف الملفات الأصلية يدوياً بعد التأكد من النتيجة.
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/images");
const MAX_WIDTH = 1600;
const QUALITY = 80;

// أسماء أوضح للصور التي وصلت بأسماء عشوائية
const RENAME = {
  "WhatsApp Image 2026-10-11 at 4.07.10 PM.jpeg": "courtyard-pressure-wash",
};

const SOURCES = /\.(png|jpe?g)$/i;

const files = (await readdir(DIR)).filter((f) => SOURCES.test(f));

let saved = 0;
for (const file of files) {
  const base = RENAME[file] ?? path.parse(file).name;
  const src = path.join(DIR, file);
  const out = path.join(DIR, `${base}.webp`);

  const before = (await stat(src)).size;
  const info = await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);

  saved += before - info.size;
  const kb = (n) => `${Math.round(n / 1024)}KB`;
  console.log(
    `${file.padEnd(46)} ${kb(before).padStart(7)} → ${kb(info.size).padStart(7)}  ${base}.webp`,
  );
}

console.log(`\nالمجموع الموفَّر: ${Math.round(saved / 1024 / 1024)}MB`);
