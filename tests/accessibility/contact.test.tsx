import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import ContactForm from '@/components/contact/ContactForm'

describe('ContactForm accessibility', () => {
  beforeAll(() => {
    // mock fetch used by the component
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: async () => ({ ok: true }) })) as any
  })

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<ContactForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})