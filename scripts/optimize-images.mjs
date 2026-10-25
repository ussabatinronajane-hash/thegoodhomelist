// Builds resized WebP copies of every PNG and JPEG in public/images.
//
// Runs before `astro build` (see the "build" script in package.json). Output goes
// to public/images/_opt/, which is git-ignored, so the originals stay exactly as
// uploaded and no generated files are committed. The <Img> component uses these
// copies when they exist and falls back to the original when they do not.
//
//   /images/best-cutting-boards-2026.png
//     -> /images/_opt/best-cutting-boards-2026-480.webp
//     -> /images/_opt/best-cutting-boards-2026-800.webp
//     -> /images/_opt/best-cutting-boards-2026-1200.webp
//
// Widths never exceed the original, so small images are not upscaled.

import { readdir, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'public/images';
const OUT = 'public/images/_opt';
const WIDTHS = [480, 800, 1200];
const QUALITY = 78;

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g)$/i.test(f));
let made = 0;

for (const file of files) {
  const input = path.join(SRC, file);
  const base = file.replace(/\.[^.]+$/, '');
  const srcTime = (await stat(input)).mtimeMs;
  const meta = await sharp(input).metadata();

  for (const w of WIDTHS) {
    const width = Math.min(w, meta.width ?? w);
    const output = path.join(OUT, `${base}-${w}.webp`);
    if (existsSync(output) && (await stat(output)).mtimeMs >= srcTime) continue;
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(output);
    made++;
  }
}

console.log(`[images] ${files.length} source image(s), ${made} optimized file(s) written`);
