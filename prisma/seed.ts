import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Endorsements
  const endorsements = await Promise.all([
    prisma.endorsement.create({
      data: {
        name: "Dr. Amanda Lee",
        role: "Program Director",
        company: "Allegheny General Hospital",
        quote: "Siva transformed our residency compliance metrics from 19% to 75% in just 4 months.",
        weight: 10
      }
    }),
    prisma.endorsement.create({
      data: {
        name: "Michael Grant",
        role: "VP of Operations",
        company: "UPMC Mercy",
        quote: "Their analytics dashboard uncovered $2.4M in reimbursement risk we didn't know about.",
        weight: 9
      }
    }),
    prisma.endorsement.create({
      data: {
        name: "Sarah Chen",
        role: "Principal",
        company: "Healthcare Analytics Partners",
        quote: "Rare combination of technical depth and healthcare domain expertise.",
        weight: 8
      }
    })
  ])

  // Seed Press Mentions
  const pressMentions = await Promise.all([
    prisma.pressMention.create({
      data: {
        title: "AI-Powered Analytics Transform Healthcare Compliance",
        source: "Healthcare IT News",
        url: "https://example.com/healthcare-ai-analytics",
        occurredOn: new Date('2024-05-01')
      }
    }),
    prisma.pressMention.create({
      data: {
        title: "CMU Students Lead Healthcare Innovation",
        source: "CMU News",
        url: "https://example.com/cmu-healthcare-innovation",
        occurredOn: new Date('2024-09-15')
      }
    })
  ])

  console.log('Database seeded successfully!')
  console.log(`Created ${endorsements.length} endorsements`)
  console.log(`Created ${pressMentions.length} press mentions`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })