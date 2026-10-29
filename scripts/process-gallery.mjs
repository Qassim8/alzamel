/**
 * معالجة ملفات المعرض الأصلية (HEIC + MOV) إلى صيغ تعمل في المتصفحات.
 *
 *   node scripts/process-gallery.mjs
 *
 * المخرجات في public/gallery:
 *   *.webp        صور بعرض 1600px
 *   *.mp4         فيديو H.264 بدقة 720p (الأصل HEVC لا تشغّله المتصفحات)
 *   *-poster.webp لقطة أولى لكل فيديو (تمنع الشاشة السوداء قبل التشغيل)
 *
 * الملفات الأصلية تبقى مكانها، ومستثناة من git عبر .gitignore.
 */
import { execFile } from "node:child_process";
import { mkdir, readdir, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const run = promisify(execFile);
const DIR = path.resolve("public/gallery");
const TMP = path.join(os.tmpdir(), "alzamel-heic");

/**
 * HEIC → PNG عبر WIC (دعم ويندوز المدمج).
 * sharp يقرأ ترويسة HEIC لكنه لا يفكّ ضغط HEVC (لا libde265)،
 * وffmpeg 6 بلا demuxer لـ HEIF — فالوسيلة الوحيدة المتاحة هنا WIC.
 */
async function heicToPng(src, dst) {
  await run("powershell", [
    "-NoProfile", "-ExecutionPolicy", "Bypass",
    "-File", path.resolve("scripts/heic-to-png.ps1"),
    "-Src", src, "-Dst", dst,
  ]);
}

/** الاسم العربي → اسم ملف إنجليزي يصلح للويب وللأرشفة. */
const NAME_MAP = {
  "نظافة الارضيات": "floor",
  "نظافة الاسطح": "surfaces",
  "نظافة الستائر": "curtains",
  "نظافة السجاد": "carpet",
  "نظافة الكنب": "sofa",
  "نظافة المطبخ": "kitchen",
  "نظافة النوافذ": "windows",
};

function toSlug(fileName) {
  const base = path.parse(fileName).name.trim();
  for (const [ar, en] of Object.entries(NAME_MAP)) {
    if (base.startsWith(ar)) {
      const rest = base.slice(ar.length).trim(); // "1" أو "فيديو"
      if (rest === "فيديو") return { slug: en, isVideo: true };
      return { slug: rest ? `${en}-${rest}` : en, isVideo: false };
    }
  }
  return null;
}

const kb = (n) => `${Math.round(n / 1024)}KB`;
const mb = (n) => `${(n / 1048576).toFixed(1)}MB`;

await rm(TMP, { recursive: true, force: true });
await mkdir(TMP, { recursive: true });

const files = await readdir(DIR);
let savedBytes = 0;

// ── الصور: HEIC → WebP ─────────────────────────────────────────
for (const file of files.filter((f) => /\.heic$/i.test(f))) {
  const mapped = toSlug(file);
  if (!mapped) {
    console.log(`؟ تخطّي (اسم غير معروف): ${file}`);
    continue;
  }
  // ملف باسم «فيديو» لكنه صورة فعلاً — نعامله كصورة
  const slug = mapped.isVideo ? `${mapped.slug}-still` : mapped.slug;
  const src = path.join(DIR, file);
  const out = path.join(DIR, `${slug}.webp`);

  const before = (await stat(src)).size;
  const png = path.join(TMP, `${slug}.png`);
  await heicToPng(src, png);

  const info = await sharp(png)
    .rotate() // يحترم اتجاه الكاميرا إن وُجد
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  await rm(png, { force: true });

  savedBytes += before - info.size;
  console.log(`🖼  ${file.padEnd(28)} ${kb(before).padStart(8)} → ${kb(info.size).padStart(7)}  ${slug}.webp`);
}

// ── الفيديو: MOV/HEVC → MP4/H.264 720p + صورة غلاف ─────────────
for (const file of files.filter((f) => /\.mov$/i.test(f))) {
  const mapped = toSlug(file);
  if (!mapped) {
    console.log(`؟ تخطّي (اسم غير معروف): ${file}`);
    continue;
  }
  const src = path.join(DIR, file);
  const out = path.join(DIR, `${mapped.slug}.mp4`);
  const poster = path.join(DIR, `${mapped.slug}-poster.webp`);
  const before = (await stat(src)).size;

  await run(
    ffmpegPath,
    [
      "-y", "-i", src,
      "-vf", "scale=-2:720",
      "-c:v", "libx264", "-preset", "medium", "-crf", "27",
      "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-movflags", "+faststart", // يبدأ التشغيل قبل اكتمال التحميل
      "-c:a", "aac", "-b:a", "96k",
      out,
    ],
    { maxBuffer: 1 << 26 },
  );

  // لقطة الغلاف من الثانية الثانية
  await run(
    ffmpegPath,
    ["-y", "-ss", "2", "-i", src, "-frames:v", "1", "-vf", "scale=-2:720", poster],
    { maxBuffer: 1 << 26 },
  );

  const after = (await stat(out)).size;
  savedBytes += before - after;
  console.log(`🎬 ${file.padEnd(28)} ${mb(before).padStart(8)} → ${mb(after).padStart(7)}  ${mapped.slug}.mp4`);
}

console.log(`\nالموفَّر الإجمالي: ${mb(savedBytes)}`);
