import fs from 'fs';
import zlib from 'zlib';

function createPNG(size, bgR, bgG, bgB, fgR, fgG, fgB) {
  const width = size;
  const height = size;

  // CRC32 table
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function writeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const crcVal = crc32(Buffer.concat([typeBuf, data]));
    crcBuf.writeUInt32BE(crcVal, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace
  const ihdrChunk = writeChunk('IHDR', ihdr);

  // Raw image data with filter byte 0 at start of each scanline
  const scanlineLength = 1 + width * 4;
  const rawData = Buffer.alloc(scanlineLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = size * 0.42;
  const innerRadius = size * 0.35;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // Filter type None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Base rounded rectangle or circle
      if (dist <= innerRadius) {
        // Inner nutrition icon area
        if (Math.abs(dx) < size * 0.04 && dy > -size * 0.2 && dy < size * 0.2) {
          rawData[pxOffset] = 255;
          rawData[pxOffset + 1] = 255;
          rawData[pxOffset + 2] = 255;
          rawData[pxOffset + 3] = 255;
        } else if (dist < size * 0.22 && dy < 0) {
          // Leaf
          rawData[pxOffset] = fgR;
          rawData[pxOffset + 1] = fgG;
          rawData[pxOffset + 2] = fgB;
          rawData[pxOffset + 3] = 255;
        } else {
          // Bowl surface
          rawData[pxOffset] = 247;
          rawData[pxOffset + 1] = 254;
          rawData[pxOffset + 2] = 231;
          rawData[pxOffset + 3] = 255;
        }
      } else if (dist <= radius) {
        // Outer rim
        rawData[pxOffset] = 132;
        rawData[pxOffset + 1] = 204;
        rawData[pxOffset + 2] = 22;
        rawData[pxOffset + 3] = 255;
      } else {
        // Background card
        rawData[pxOffset] = bgR;
        rawData[pxOffset + 1] = bgG;
        rawData[pxOffset + 2] = bgB;
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = writeChunk('IDAT', compressedData);
  const iendChunk = writeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate icons: lime theme (bg: #14532d, fg: #4d7c0f)
fs.writeFileSync('./public/pwa-192x192.png', createPNG(192, 20, 83, 45, 77, 124, 15));
fs.writeFileSync('./public/pwa-512x512.png', createPNG(512, 20, 83, 45, 77, 124, 15));
fs.writeFileSync('./public/pwa-maskable-512x512.png', createPNG(512, 20, 83, 45, 77, 124, 15));
fs.writeFileSync('./public/apple-touch-icon.png', createPNG(180, 20, 83, 45, 77, 124, 15));

console.log('Successfully generated PWA icon PNGs!');
