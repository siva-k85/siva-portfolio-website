import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import ContactForm from '@/components/contact/ContactForm'

describe('ContactForm accessibility', () => {
  beforeAll(() => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response) as jest.MockedFunction<typeof fetch>
    global.fetch = mockFetch
  })

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<ContactForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
