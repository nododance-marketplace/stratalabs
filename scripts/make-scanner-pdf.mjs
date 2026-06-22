// Assembles the 4 rebranded scanner brochure images into a single PDF used as
// the product's downloadable datasheet. Run: node scripts/make-scanner-pdf.mjs
import { PDFDocument } from "pdf-lib";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = "../Products/Lidar Dental Scanner/Lidar Scanner from Yisu/Strata Branded";
const pages = [
  "01_cover.png",
  "02_features.png",
  "03_software.png",
  "04_specs.png",
];
const OUT = new URL("../public/docs/sl-intraoral-scanner.pdf", import.meta.url);

const doc = await PDFDocument.create();
doc.setTitle("Strata Labs — Intraoral Dental Scanner");
doc.setAuthor("Strata Labs");

for (const file of pages) {
  const bytes = readFileSync(new URL(`../${SRC}/${file}`, import.meta.url));
  const img = await doc.embedPng(bytes);
  // Cap page width to keep the PDF a sensible size; height keeps aspect.
  const maxW = 1400;
  const scale = Math.min(1, maxW / img.width);
  const w = img.width * scale;
  const h = img.height * scale;
  const page = doc.addPage([w, h]);
  page.drawImage(img, { x: 0, y: 0, width: w, height: h });
}

mkdirSync(new URL("../public/docs/", import.meta.url), { recursive: true });
writeFileSync(OUT, await doc.save());
console.log("Wrote public/docs/sl-intraoral-scanner.pdf");
