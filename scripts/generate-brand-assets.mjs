// Generates Kotsu "Niko" brand derivatives from the master art.
// Pure-Node (no native deps). Run: node scripts/generate-brand-assets.mjs
import { decodePNG, encodePNG, resize, crop } from './png-lib.mjs';
import { writeFileSync } from 'node:fs';

const MASTER = 'static/brand/niko-master.png';
const PAPER = [248, 245, 239]; // --color-paper #f8f5ef

const master = decodePNG(MASTER);

// Ink bounding box (measured): x 401..1020, y 69..710.
// Build a square crop centered on the mark with breathing room.
const bx = 401, by = 69, bw = 620, bh = 642;
const cx = bx + bw / 2;
const cy = by + bh / 2;
const side = Math.round(Math.max(bw, bh) * 1.18); // ~18% padding
let sx = Math.round(cx - side / 2);
let sy = Math.round(cy - side / 2);
sx = Math.max(0, Math.min(sx, master.width - side));
sy = Math.max(0, Math.min(sy, master.height - side));
const square = crop(master, sx, sy, side, side);

// --- Transparent header logo: cut white -> alpha, keep brush edges ---
// alpha = 255 - luminance (so black ink -> opaque, white paper -> transparent),
// color forced to ink black for crisp edges on any surface.
function whiteCutout(img) {
	const { width, height, data } = img;
	const out = Buffer.alloc(width * height * 4);
	for (let i = 0; i < width * height; i++) {
		const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
		const lum = r * 0.299 + g * 0.587 + b * 0.114;
		// Map luminance 235->0 alpha, 60->255 alpha (soft edge for brush texture)
		let a = Math.round(((235 - lum) / (235 - 60)) * 255);
		a = Math.max(0, Math.min(255, a));
		out[i * 4] = 17; out[i * 4 + 1] = 17; out[i * 4 + 2] = 17; // #111 ink
		out[i * 4 + 3] = a;
	}
	return { width, height, data: out };
}

// --- Flatten onto paper bg (for favicons / OG that want a solid card) ---
function flatten(img, bg) {
	const { width, height, data } = img;
	const out = Buffer.alloc(width * height * 4);
	for (let i = 0; i < width * height; i++) {
		const a = data[i * 4 + 3] / 255;
		out[i * 4] = Math.round(data[i * 4] * a + bg[0] * (1 - a));
		out[i * 4 + 1] = Math.round(data[i * 4 + 1] * a + bg[1] * (1 - a));
		out[i * 4 + 2] = Math.round(data[i * 4 + 2] * a + bg[2] * (1 - a));
		out[i * 4 + 3] = 255;
	}
	return { width, height, data: out };
}

// --- Hard threshold (for tiny favicons): pure black ink on transparent ---
function threshold(img, cut) {
	const { width, height, data } = img;
	const out = Buffer.alloc(width * height * 4);
	for (let i = 0; i < width * height; i++) {
		const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
		const lum = r * 0.299 + g * 0.587 + b * 0.114;
		const al = data[i * 4 + 3];
		const ink = al > 64 && lum < cut;
		out[i * 4] = 17; out[i * 4 + 1] = 17; out[i * 4 + 2] = 17;
		out[i * 4 + 3] = ink ? 255 : 0;
	}
	return { width, height, data: out };
}

const cutout = whiteCutout(square);

// 1) Header logo (transparent, high-res)
encodePNG(resize(cutout, 512, 512), 'static/brand/niko-logo.png');

// 2) Apple touch icon 180 (needs opaque bg per Apple guidance) -> paper card
encodePNG(flatten(resize(cutout, 180, 180), PAPER), 'static/apple-touch-icon.png');

// 3) PWA icons 192 / 512 on paper (maskable-safe: mark is centered with padding)
encodePNG(flatten(resize(cutout, 192, 192), PAPER), 'static/icon-192.png');
encodePNG(flatten(resize(cutout, 512, 512), PAPER), 'static/icon-512.png');

// 4) Tiny favicons: threshold a mid-size render first to keep ko+tsu readable,
//    then downscale that clean silhouette. Squint-friendly.
// Threshold a mid-size render to a clean black silhouette, then downscale.
// Slightly tighter crop for tiny sizes so the mark fills more of the frame.
const tinySide = Math.round(Math.max(bw, bh) * 1.06);
let tsx = Math.round(cx - tinySide / 2), tsy = Math.round(cy - tinySide / 2);
tsx = Math.max(0, Math.min(tsx, master.width - tinySide));
tsy = Math.max(0, Math.min(tsy, master.height - tinySide));
const tinyCutout = whiteCutout(crop(master, tsx, tsy, tinySide, tinySide));
const clean = threshold(resize(tinyCutout, 256, 256), 175);
const fav32 = flatten(resize(clean, 32, 32), PAPER);
const fav16 = flatten(resize(clean, 16, 16), PAPER);
encodePNG(fav32, 'static/favicon-32.png');
encodePNG(fav16, 'static/favicon-16.png');

// 5) favicon.ico (16 + 32 PNG-compressed entries)
writeFileSync('static/favicon.ico', buildICO([fav16, fav32]));

// 6) OG / social image 1200x630 — mark on paper, centered.
//    Reuse cropped mark on a paper field.
function ogImage() {
	const W = 1200, H = 630;
	const out = Buffer.alloc(W * H * 4);
	for (let i = 0; i < W * H; i++) {
		out[i * 4] = PAPER[0]; out[i * 4 + 1] = PAPER[1]; out[i * 4 + 2] = PAPER[2]; out[i * 4 + 3] = 255;
	}
	const og = { width: W, height: H, data: out };
	const markSize = 460;
	const mark = flatten(resize(cutout, markSize, markSize), PAPER);
	const ox = Math.round((W - markSize) / 2);
	const oy = Math.round((H - markSize) / 2) - 18;
	for (let y = 0; y < markSize; y++) {
		for (let x = 0; x < markSize; x++) {
			const di = ((oy + y) * W + (ox + x)) * 4;
			const si = (y * markSize + x) * 4;
			og.data[di] = mark.data[si];
			og.data[di + 1] = mark.data[si + 1];
			og.data[di + 2] = mark.data[si + 2];
			og.data[di + 3] = 255;
		}
	}
	return og;
}
encodePNG(ogImage(), 'static/og-image.png');

function buildICO(pngImages) {
	const count = pngImages.length;
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0);
	header.writeUInt16LE(1, 2); // icon
	header.writeUInt16LE(count, 4);
	const dir = Buffer.alloc(16 * count);
	const pngBufs = pngImages.map((im) => encodePNG(im));
	let offset = 6 + 16 * count;
	pngBufs.forEach((png, idx) => {
		const im = pngImages[idx];
		const e = idx * 16;
		dir[e] = im.width >= 256 ? 0 : im.width;
		dir[e + 1] = im.height >= 256 ? 0 : im.height;
		dir[e + 2] = 0; dir[e + 3] = 0;
		dir.writeUInt16LE(1, e + 4); // planes
		dir.writeUInt16LE(32, e + 6); // bpp
		dir.writeUInt32LE(png.length, e + 8);
		dir.writeUInt32LE(offset, e + 12);
		offset += png.length;
	});
	return Buffer.concat([header, dir, ...pngBufs]);
}

console.log('Brand assets generated:');
console.log('  static/brand/niko-logo.png (512, transparent header logo)');
console.log('  static/apple-touch-icon.png (180)');
console.log('  static/icon-192.png, static/icon-512.png (PWA)');
console.log('  static/favicon-16.png, static/favicon-32.png');
console.log('  static/favicon.ico (16+32)');
console.log('  static/og-image.png (1200x630)');
