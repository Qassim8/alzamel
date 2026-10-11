/**
 * لقطات مرجعية لكل الصفحات بثلاثة مقاسات، عبر Chrome في وضع headless.
 * الاستخدام: node scripts/shots.mjs <مجلد الحفظ> <عنوان الموقع>
 * مثال:     node scripts/shots.mjs before http://localhost:3000
 *
 * أداة مراجعة محلية فقط — ليست جزءاً من بناء الموقع.
 */
import { execFile } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);

const CHROME = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
].find((p) => p && existsSync(p));

if (!CHROME) {
  console.error("لم يُعثر على Chrome — تعذّر التقاط اللقطات.");
  process.exit(1);
}

const label = process.argv[2] || "shots";
const base = (process.argv[3] || "http://localhost:3000").replace(/\/$/, "");

const PAGES = [
  ["home", "/"],
  ["services", "/services"],
  ["pricing", "/pricing"],
  ["areas", "/areas"],
  ["why-us", "/why-us"],
  ["contact", "/contact"],
  ["not-found", "/__missing__"],
];

const SIZES = [
  ["desktop", 1440, 900],
  ["tablet", 834, 1112],
  ["mobile", 390, 844],
];

const outDir = path.resolve(".screenshots", label);
await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const [name, route] of PAGES) {
  for (const [size, w, h] of SIZES) {
    const file = path.join(outDir, `${name}--${size}.png`);
    try {
      await run(
        CHROME,
        [
          "--headless=new",
          "--disable-gpu",
          "--hide-scrollbars",
          "--force-device-scale-factor=1",
          // ننتظر حتى تستقر الحركات والخطوط قبل الالتقاط
          "--virtual-time-budget=9000",
          `--window-size=${w},${h}`,
          `--screenshot=${file}`,
          `${base}${route}`,
        ],
        { timeout: 90_000 },
      );
      console.log(`✓ ${name} ${size}`);
    } catch (e) {
      console.log(`✗ ${name} ${size} — ${e.shortMessage || e.message}`);
    }
  }
}

console.log(`\nاللقطات في: ${outDir}`);
