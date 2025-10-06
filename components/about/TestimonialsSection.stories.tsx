import type { Meta, StoryObj } from '@storybook/react'
import TestimonialsSection from './TestimonialsSection'

const meta: Meta<typeof TestimonialsSection> = {
  title: 'About/TestimonialsSection',
  component: TestimonialsSection,
}

export default meta

type Story = StoryObj<typeof TestimonialsSection>

export const Default: Story = {
  render: () => <TestimonialsSection />,
}
