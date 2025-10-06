import { promises as fs } from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'
import matter from 'gray-matter'

async function validateContent() {
  const errors: string[] = []

  async function check(dir: string, requiredFields: string[]) {
    const files = await fg('*.mdx', { cwd: dir })
    
    for (const f of files) {
      const filePath = path.join(dir, f)
      const raw = await fs.readFile(filePath, 'utf8')
      const { data } = matter(raw)
      
      for (const field of requiredFields) {
        if (!(field in data)) {
          errors.push(`${dir}/${f}: missing required field '${field}'`)
        }
      }
      
      // Additional validation
      if (data.featured !== undefined && typeof data.featured !== 'boolean') {
        errors.push(`${dir}/${f}: 'featured' must be a boolean`)
      }
      
      if (data.date && isNaN(Date.parse(data.date))) {
        errors.push(`${dir}/${f}: invalid date format`)
      }
    }
  }

  // Check projects with required fields
  await check(
    path.join(process.cwd(), 'content/projects'),
    ['title', 'summary', 'tech', 'skills']
  )

  // Check notes with required fields
  await check(
    path.join(process.cwd(), 'content/notes'),
    ['title', 'summary']
  )

  // Report results
  if (errors.length > 0) {
    console.error('❌ Content validation failed:')
    errors.forEach(err => console.error(`  - ${err}`))
    process.exit(1)
  }

  console.log('✅ Content validation passed')
}

// Run validation
validateContent().catch(error => {
  console.error('Validation error:', error)
  process.exit(1)
})