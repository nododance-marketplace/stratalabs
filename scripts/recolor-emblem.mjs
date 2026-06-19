// Recolors the metallic emblem into the brand "Emblem · Orange" accent variant
// by remapping luminance onto an orange ramp (keeps the metallic sheen + alpha).
// Source: Logo/variants/emblem_cyan.png (transparent metallic emblem)
// Output: public/brand/emblem-orange.png
// Run: node scripts/recolor-emblem.mjs
import { inflateSync, deflateSync } from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";

const SRC = new URL("../../Logo/variants/emblem_cyan.png", import.meta.url);
const OUT = new URL("../public/brand/emblem-orange.png", import.meta.url);

// ── Decode PNG (8-bit RGBA, colortype 6, non-interlaced) ──────────────────
const f = readFileSync(SRC);
const W = f.readUInt32BE(16), H = f.readUInt32BE(20);
if (f[24] !== 8 || f[25] !== 6) throw new Error("expected 8-bit RGBA PNG");
let p = 8;
const idat = [];
while (p < f.length) {
  const len = f.readUInt32BE(p);
  const type = f.toString("ascii", p + 4, p + 8);
  if (type === "IDAT") idat.push(f.subarray(p + 8, p + 8 + len));
  if (type === "IEND") break;
  p += 12 + len;
}
const z = inflateSync(Buffer.concat(idat));
const bpp = 4, stride = W * bpp;
const px = Buffer.alloc(stride * H);
const paeth = (a, b, c) => {
  const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
};
let q = 0;
for (let y = 0; y < H; y++) {
  const ft = z[q++];
  for (let x = 0; x < stride; x++) {
    const v = z[q++];
    const a = x >= bpp ? px[y * stride + x - bpp] : 0;
    const b = y > 0 ? px[(y - 1) * stride + x] : 0;
    const c = x >= bpp && y > 0 ? px[(y - 1) * stride + x - bpp] : 0;
    let r;
    switch (ft) {
      case 0: r = v; break;
      case 1: r = v + a; break;
      case 2: r = v + b; break;
      case 3: r = v + ((a + b) >> 1); break;
      case 4: r = v + paeth(a, b, c); break;
      default: throw new Error("bad filter " + ft);
    }
    px[y * stride + x] = r & 0xff;
  }
}

// ── Orange ramp (Molten / Signal / Ember + specular highlight) ────────────
const STOPS = [
  [0.0, [90, 36, 0]],     // deep ember shadow
  [0.45, [255, 106, 0]],  // #FF6A00 Molten
  [0.78, [255, 178, 102]], // #FFB266 Ember
  [1.0, [255, 241, 224]], // specular highlight
];
function ramp(t) {
  for (let i = 1; i < STOPS.length; i++) {
    if (t <= STOPS[i][0]) {
      const [t0, c0] = STOPS[i - 1], [t1, c1] = STOPS[i];
      const k = (t - t0) / (t1 - t0 || 1);
      return [c0[0] + (c1[0] - c0[0]) * k, c0[1] + (c1[1] - c0[1]) * k, c0[2] + (c1[2] - c0[2]) * k];
    }
  }
  return STOPS[STOPS.length - 1][1];
}
for (let i = 0; i < W * H; i++) {
  const r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
  const L = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const [nr, ng, nb] = ramp(L);
  px[i * 4] = Math.round(nr);
  px[i * 4 + 1] = Math.round(ng);
  px[i * 4 + 2] = Math.round(nb);
  // alpha (i*4+3) preserved
}

// ── Encode RGBA PNG ───────────────────────────────────────────────────────
const crc32 = (b) => { let c = ~0; for (let i = 0; i < b.length; i++) { c ^= b[i]; for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1; } return ~c; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length, 0); const body = Buffer.concat([Buffer.from(t, "ascii"), d]); const cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(body) >>> 0, 0); return Buffer.concat([l, body, cr]); };
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 6;
const raw = Buffer.alloc((stride + 1) * H);
for (let y = 0; y < H; y++) { raw[y * (stride + 1)] = 0; px.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride); }
const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
writeFileSync(OUT, png);
console.log(`Wrote emblem-orange.png ${W}x${H} (${(png.length / 1024) | 0} KB)`);
