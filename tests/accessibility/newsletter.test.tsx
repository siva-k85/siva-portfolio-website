import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import NewsletterForm from '@/components/forms/NewsletterForm'

describe('NewsletterForm accessibility', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: async () => ({ ok: true }) })) as any
  })

  it('has no detectable accessibility issues', async () => {
    const { container } = render(<NewsletterForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
