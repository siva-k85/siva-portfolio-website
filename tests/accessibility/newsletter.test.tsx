import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import NewsletterForm from '@/components/forms/NewsletterForm'

describe('NewsletterForm accessibility', () => {
  beforeAll(() => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response) as jest.MockedFunction<typeof fetch>
    global.fetch = mockFetch
  })

  it('has no detectable accessibility issues', async () => {
    const { container } = render(<NewsletterForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
