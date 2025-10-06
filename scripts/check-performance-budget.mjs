import { promises as fs } from 'node:fs'
import path from 'node:path'

async function checkPerformanceBudget() {
  const manifestPath = path.join(process.cwd(), '.next', 'build-manifest.json')
  const distDir = path.join(process.cwd(), '.next')
  const budgetBytes = 180 * 1024

  try {
    const manifestRaw = await fs.readFile(manifestPath, 'utf8')
    const manifest = JSON.parse(manifestRaw)
    const entryFiles = manifest.pages?.['/'] ?? []

    if (entryFiles.length === 0) {
      console.warn('No entry files found for the homepage in build-manifest.json')
      return
    }

    const sizes = await Promise.all(
      entryFiles.map(async (file) => {
        const filePath = path.join(distDir, file)
        try {
          const stat = await fs.stat(filePath)
          return stat.size
        } catch {
          return 0
        }
      })
    )

    const totalBytes = sizes.reduce((acc, size) => acc + size, 0)

    if (totalBytes > budgetBytes) {
      console.error(`❌ Performance budget exceeded: ${(totalBytes / 1024).toFixed(1)} KB (budget ${(budgetBytes / 1024).toFixed(0)} KB)`) 
      process.exit(1)
    } else {
      console.log(`✅ Bundle within budget: ${(totalBytes / 1024).toFixed(1)} KB`)
    }
  } catch (error) {
    console.warn('Build manifest not found. Run `pnpm build` before checking performance budgets.')
  }
}

checkPerformanceBudget()
