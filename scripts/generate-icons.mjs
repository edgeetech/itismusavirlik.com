// Regenerate raster fallbacks from the native SVG wordmark with sharp.
// Usage: node scripts/generate-icons.mjs <path-to-sharp-module>
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const { default: sharp } = await import(pathToFileURL(process.argv[2]).href)
const publicDir = new URL('../public/', import.meta.url)
const svg = await readFile(new URL('itis-favicon.svg', publicDir))
for (const [name, size] of [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['android-chrome-192x192.png', 192],
  ['android-chrome-512x512.png', 512],
  ['mstile-150x150.png', 150],
]) {
  await sharp(svg, { density: 768 }).resize(size, size).png().toFile(fileURLToPath(new URL(name, publicDir)))
}

// ICO entries may contain PNG data; include both standard tab icon sizes.
const images = await Promise.all([16, 32].map(size => sharp(svg, { density: 768 }).resize(size, size).png().toBuffer()))
const header = Buffer.alloc(6 + 16 * images.length)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(images.length, 4)
let offset = header.length
for (const [index, data] of images.entries()) {
  const entry = 6 + 16 * index
  header[entry] = header[entry + 1] = [16, 32][index]
  header.writeUInt16LE(1, entry + 4)
  header.writeUInt16LE(32, entry + 6)
  header.writeUInt32LE(data.length, entry + 8)
  header.writeUInt32LE(offset, entry + 12)
  offset += data.length
}
await writeFile(new URL('favicon.ico', publicDir), Buffer.concat([header, ...images]))
