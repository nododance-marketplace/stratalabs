// Knocks the dark background out of the metallic "STRATA LABS" wordmark so only
// the typography remains (transparent PNG), then auto-crops the padding.
// Source: D:/Downloads/Strata Labs/Logo/variants/wordmark.png
// Output: public/brand/wordmark-knockout.png
// Run: node scripts/knockout-wordmark.mjs
import { inflateSync, deflateSync } from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";

const SRC = new URL("../../Logo/variants/wordmark.png", import.meta.url);
const OUT = new URL("../public/brand/wordmark-knockout.png", import.meta.url);
const THRESHOLD = 70; // luminance below this = background candidate
const FEATHER_HI = 110; // edge softening upper bound

// ── Decode PNG (8-bit, colortype 2 = RGB, non-interlaced) ─────────────────
const file = readFileSync(SRC);
const W = file.readUInt32BE(16);
const H = file.readUInt32BE(20);
if (file[24] !== 8 || file[25] !== 2) throw new Error("expected 8-bit RGB PNG");

let p = 8;
const idat = [];
while (p < file.length) {
  const len = file.readUInt32BE(p);
  const type = file.toString("ascii", p + 4, p + 8);
  const data = file.subarray(p + 8, p + 8 + len);
  if (type === "IDAT") idat.push(data);
  if (type === "IEND") break;
  p += 12 + len;
}
const z = inflateSync(Buffer.concat(idat));

const bpp = 3;
const stride = W * bpp;
const rgb = Buffer.alloc(stride * H);
function paeth(a, b, c) {
  const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}
let q = 0;
for (let y = 0; y < H; y++) {
  const ft = z[q++];
  for (let x = 0; x < stride; x++) {
    const v = z[q++];
    const a = x >= bpp ? rgb[y * stride + x - bpp] : 0;
    const b = y > 0 ? rgb[(y - 1) * stride + x] : 0;
    const c = x >= bpp && y > 0 ? rgb[(y - 1) * stride + x - bpp] : 0;
    let r;
    switch (ft) {
      case 0: r = v; break;
      case 1: r = v + a; break;
      case 2: r = v + b; break;
      case 3: r = v + ((a + b) >> 1); break;
      case 4: r = v + paeth(a, b, c); break;
      default: throw new Error("bad filter " + ft);
    }
    rgb[y * stride + x] = r & 0xff;
  }
}

// ── Luminance + flood-fill background from the borders ────────────────────
const N = W * H;
const lum = new Float32Array(N);
for (let i = 0; i < N; i++) {
  const r = rgb[i * 3], g = rgb[i * 3 + 1], b = rgb[i * 3 + 2];
  lum[i] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const isBg = new Uint8Array(N);
const stack = [];
const pushIf = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = y * W + x;
  if (!isBg[i] && lum[i] < THRESHOLD) { isBg[i] = 1; stack.push(i); }
};
for (let x = 0; x < W; x++) { pushIf(x, 0); pushIf(x, H - 1); }
for (let y = 0; y < H; y++) { pushIf(0, y); pushIf(W - 1, y); }
while (stack.length) {
  const i = stack.pop();
  const x = i % W, y = (i / W) | 0;
  pushIf(x - 1, y); pushIf(x + 1, y); pushIf(x, y - 1); pushIf(x, y + 1);
}

// ── Build RGBA: bg → transparent, soft edges via luminance feather ────────
const rgba = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  rgba[i * 4] = rgb[i * 3];
  rgba[i * 4 + 1] = rgb[i * 3 + 1];
  rgba[i * 4 + 2] = rgb[i * 3 + 2];
  if (isBg[i]) {
    rgba[i * 4 + 3] = 0;
  } else {
    // Feather pixels that border the knocked-out area for a clean rim.
    const x = i % W, y = (i / W) | 0;
    const touchesBg =
      (x > 0 && isBg[i - 1]) || (x < W - 1 && isBg[i + 1]) ||
      (y > 0 && isBg[i - W]) || (y < H - 1 && isBg[i + W]);
    if (touchesBg && lum[i] < FEATHER_HI) {
      rgba[i * 4 + 3] = Math.max(0, Math.min(255, Math.round(((lum[i] - THRESHOLD) / (FEATHER_HI - THRESHOLD)) * 255)));
    } else {
      rgba[i * 4 + 3] = 255;
    }
  }
}

// ── Auto-crop to opaque bounding box (+ small margin) ─────────────────────
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++)
    if (rgba[(y * W + x) * 4 + 3] > 8) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
const M = 6;
minX = Math.max(0, minX - M); minY = Math.max(0, minY - M);
maxX = Math.min(W - 1, maxX + M); maxY = Math.min(H - 1, maxY + M);
const CW = maxX - minX + 1, CH = maxY - minY + 1;
const cropped = Buffer.alloc(CW * CH * 4);
for (let y = 0; y < CH; y++)
  rgba.copy(cropped, y * CW * 4, ((y + minY) * W + minX) * 4, ((y + minY) * W + minX + CW) * 4);

// ── Encode RGBA PNG ───────────────────────────────────────────────────────
function crc32(b) {
  let c = ~0;
  for (let i = 0; i < b.length; i++) { c ^= b[i]; for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1; }
  return ~c;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body) >>> 0, 0);
  return Buffer.concat([len, body, crc]);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(CW, 0); ihdr.writeUInt32BE(CH, 4); ihdr[8] = 8; ihdr[9] = 6;
const raw = Buffer.alloc((CW * 4 + 1) * CH);
for (let y = 0; y < CH; y++) { raw[y * (CW * 4 + 1)] = 0; cropped.copy(raw, y * (CW * 4 + 1) + 1, y * CW * 4, (y + 1) * CW * 4); }
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0)),
]);
writeFileSync(OUT, png);
console.log(`Wrote wordmark-knockout.png  ${CW}x${CH}  (${(png.length / 1024) | 0} KB)`);
