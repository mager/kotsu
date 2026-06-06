// Minimal pure-Node PNG decode/encode (RGBA, 8-bit, non-interlaced).
// Uses built-in zlib. Sufficient for our brand asset processing.
import zlib from 'node:zlib';
import { readFileSync, writeFileSync } from 'node:fs';

const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function paeth(a, b, c) {
	const p = a + b - c;
	const pa = Math.abs(p - a);
	const pb = Math.abs(p - b);
	const pc = Math.abs(p - c);
	if (pa <= pb && pa <= pc) return a;
	if (pb <= pc) return b;
	return c;
}

export function decodePNG(path) {
	const buf = readFileSync(path);
	if (!buf.subarray(0, 8).equals(PNG_SIG)) throw new Error('not a PNG');
	let off = 8;
	let width, height, bitDepth, colorType, interlace;
	const idat = [];
	let palette = null;
	let trns = null;
	while (off < buf.length) {
		const len = buf.readUInt32BE(off);
		const type = buf.toString('ascii', off + 4, off + 8);
		const data = buf.subarray(off + 8, off + 8 + len);
		if (type === 'IHDR') {
			width = data.readUInt32BE(0);
			height = data.readUInt32BE(4);
			bitDepth = data[8];
			colorType = data[9];
			interlace = data[12];
		} else if (type === 'PLTE') {
			palette = data;
		} else if (type === 'tRNS') {
			trns = data;
		} else if (type === 'IDAT') {
			idat.push(data);
		} else if (type === 'IEND') {
			break;
		}
		off += 12 + len;
	}
	if (bitDepth !== 8) throw new Error('only 8-bit supported, got ' + bitDepth);
	if (interlace) throw new Error('interlaced PNG not supported');
	const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType];
	if (!channels) throw new Error('unsupported color type ' + colorType);
	const raw = zlib.inflateSync(Buffer.concat(idat));
	const stride = width * channels;
	const out = Buffer.alloc(stride * height);
	let pos = 0;
	for (let y = 0; y < height; y++) {
		const filter = raw[pos++];
		const line = raw.subarray(pos, pos + stride);
		pos += stride;
		const o = y * stride;
		for (let x = 0; x < stride; x++) {
			const a = x >= channels ? out[o + x - channels] : 0;
			const b = y > 0 ? out[o - stride + x] : 0;
			const c = x >= channels && y > 0 ? out[o - stride + x - channels] : 0;
			let v = line[x];
			if (filter === 1) v = (v + a) & 0xff;
			else if (filter === 2) v = (v + b) & 0xff;
			else if (filter === 3) v = (v + ((a + b) >> 1)) & 0xff;
			else if (filter === 4) v = (v + paeth(a, b, c)) & 0xff;
			out[o + x] = v;
		}
	}
	// Expand to RGBA
	const rgba = Buffer.alloc(width * height * 4);
	for (let i = 0; i < width * height; i++) {
		let r, g, bl, al;
		if (colorType === 6) {
			r = out[i * 4]; g = out[i * 4 + 1]; bl = out[i * 4 + 2]; al = out[i * 4 + 3];
		} else if (colorType === 2) {
			r = out[i * 3]; g = out[i * 3 + 1]; bl = out[i * 3 + 2]; al = 255;
		} else if (colorType === 0) {
			r = g = bl = out[i]; al = 255;
		} else if (colorType === 4) {
			r = g = bl = out[i * 2]; al = out[i * 2 + 1];
		} else if (colorType === 3) {
			const idx = out[i];
			r = palette[idx * 3]; g = palette[idx * 3 + 1]; bl = palette[idx * 3 + 2];
			al = trns && idx < trns.length ? trns[idx] : 255;
		}
		rgba[i * 4] = r; rgba[i * 4 + 1] = g; rgba[i * 4 + 2] = bl; rgba[i * 4 + 3] = al;
	}
	return { width, height, data: rgba };
}

export function encodePNG({ width, height, data }, path) {
	const channels = 4;
	const stride = width * channels;
	const raw = Buffer.alloc((stride + 1) * height);
	for (let y = 0; y < height; y++) {
		raw[y * (stride + 1)] = 0; // filter none
		data.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
	}
	const compressed = zlib.deflateSync(raw, { level: 9 });
	const chunks = [];
	const mk = (type, body) => {
		const len = Buffer.alloc(4);
		len.writeUInt32BE(body.length, 0);
		const typeBuf = Buffer.from(type, 'ascii');
		const crc = Buffer.alloc(4);
		crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, body])) >>> 0, 0);
		return Buffer.concat([len, typeBuf, body, crc]);
	};
	const ihdr = Buffer.alloc(13);
	ihdr.writeUInt32BE(width, 0);
	ihdr.writeUInt32BE(height, 4);
	ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
	chunks.push(PNG_SIG, mk('IHDR', ihdr), mk('IDAT', compressed), mk('IEND', Buffer.alloc(0)));
	const buf = Buffer.concat(chunks);
	if (path) writeFileSync(path, buf);
	return buf;
}

// CRC32
const CRC_TABLE = (() => {
	const t = new Uint32Array(256);
	for (let n = 0; n < 256; n++) {
		let c = n;
		for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		t[n] = c >>> 0;
	}
	return t;
})();
function crc32(buf) {
	let c = 0xffffffff;
	for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
	return c ^ 0xffffffff;
}

// Box-sampling resize (good for downscaling). Returns RGBA image.
export function resize(img, dw, dh) {
	const { width: sw, height: sh, data: sd } = img;
	const out = Buffer.alloc(dw * dh * 4);
	for (let dy = 0; dy < dh; dy++) {
		const sy0 = Math.floor((dy * sh) / dh);
		const sy1 = Math.max(sy0 + 1, Math.floor(((dy + 1) * sh) / dh));
		for (let dx = 0; dx < dw; dx++) {
			const sx0 = Math.floor((dx * sw) / dw);
			const sx1 = Math.max(sx0 + 1, Math.floor(((dx + 1) * sw) / dw));
			let r = 0, g = 0, b = 0, a = 0, n = 0;
			for (let sy = sy0; sy < sy1; sy++) {
				for (let sx = sx0; sx < sx1; sx++) {
					const i = (sy * sw + sx) * 4;
					const al = sd[i + 3];
					r += sd[i] * al; g += sd[i + 1] * al; b += sd[i + 2] * al; a += al; n++;
				}
			}
			const o = (dy * dw + dx) * 4;
			if (a > 0) {
				out[o] = Math.round(r / a);
				out[o + 1] = Math.round(g / a);
				out[o + 2] = Math.round(b / a);
			}
			out[o + 3] = Math.round(a / n);
		}
	}
	return { width: dw, height: dh, data: out };
}

export function crop(img, x, y, w, h) {
	const out = Buffer.alloc(w * h * 4);
	for (let row = 0; row < h; row++) {
		const si = ((y + row) * img.width + x) * 4;
		img.data.copy(out, row * w * 4, si, si + w * 4);
	}
	return { width: w, height: h, data: out };
}
