import { promises as fs } from 'node:fs'
import path from 'node:path'
import { brotliCompressSync } from 'node:zlib'

const budgetKB = 180
const budgetBytes = budgetKB * 1024

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8')
  return JSON.parse(raw)
}

async function resolveChunk(root, chunk) {
  const absolute = path.join(root, chunk)
  try {
    await fs.access(absolute)
    return absolute
  } catch {}

  const dir = path.dirname(chunk)
  const base = path.basename(chunk)
  const ext = path.extname(chunk)
  const prefix = base.slice(0, base.length - ext.length)
  const dirPath = path.join(root, dir)
  try {
    const entries = await fs.readdir(dirPath)
    const match = entries.find(file => file.startsWith(prefix))
    if (match) {
      return path.join(dirPath, match)
    }
  } catch {}
  return null
}

async function sumChunkSizes(root, chunks) {
  const sizes = await Promise.all(
    chunks.map(async chunk => {
      const resolved = await resolveChunk(root, chunk)
      if (!resolved) return 0
      try {
        const file = await fs.readFile(resolved)
        return brotliCompressSync(file).length
      } catch {
        return 0
      }
    })
  )
  return sizes.reduce((acc, size) => acc + size, 0)
}

async function checkPerformanceBudget() {
  const distDir = path.join(process.cwd(), '.next')
  const appManifestPath = path.join(distDir, 'app-build-manifest.json')
  const legacyManifestPath = path.join(distDir, 'build-manifest.json')

  try {
    const manifest = await readJson(appManifestPath)
    const entry = manifest.pages?.['/page']
    if (!entry || entry.length === 0) {
      throw new Error('Missing /page entry in app-build-manifest.json')
    }

    const totalBytes = await sumChunkSizes(distDir, entry)
    report(totalBytes)
    return
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn('Falling back to legacy build-manifest:', error.message)
    }
  }

  try {
    const legacy = await readJson(legacyManifestPath)
    const entry = legacy.pages?.['/'] ?? []
    if (entry.length === 0) {
      console.warn('No homepage entry found in build-manifest.json')
      return
    }
    const totalBytes = await sumChunkSizes(distDir, entry)
    report(totalBytes)
  } catch (err) {
    console.error('Unable to locate Next.js build manifests. Run `pnpm build` first.')
  }
}

function report(totalBytes) {
  const totalKB = totalBytes / 1024
  if (totalBytes > budgetBytes) {
    console.error(
      `❌ Performance budget exceeded: ${totalKB.toFixed(1)} KB (budget ${budgetKB} KB)`
    )
    process.exit(1)
  }

  console.log(`✅ Bundle within budget: ${totalKB.toFixed(1)} KB (budget ${budgetKB} KB)`)
}

checkPerformanceBudget()
