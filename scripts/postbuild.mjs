import { copyFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const distDir = new URL('../dist/', import.meta.url)

const pages = ['about', 'services']

for (const page of pages) {
  const sourcePath = new URL(`${page}.html`, distDir)
  const targetPath = new URL(`${page}/index.html`, distDir)

  await mkdir(dirname(fileURLToPath(targetPath)), { recursive: true })
  await copyFile(fileURLToPath(sourcePath), fileURLToPath(targetPath))
}
