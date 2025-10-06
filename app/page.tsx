import ProjectsGrid from '@/components/projects/ProjectsGrid'
import ContactForm from '@/components/contact/ContactForm'

export default function HomePage() {
  return (
    <>
      <section className="relative mx-auto max-w-screen-2xl px-6 sm:px-8 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-6xl font-semibold tracking-tight">Siva Komaragiri</h1>
          <p className="mt-4 text-xl opacity-80">Healthcare Analytics Leader & AI Systems Architect</p>
          <div className="mt-8 space-x-3">
            <a href="https://calendly.com/siva-komaragiri" className="inline-flex rounded-2xl px-6 py-3 border">Book an intro call</a>
            <a href="/resume" className="inline-flex rounded-2xl px-6 py-3 border">View résumé</a>
          </div>
        </div>
      </section>
      <section className="relative mx-auto max-w-screen-2xl px-6 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-semibold tracking-tight">Recent Projects</h2>
          <p className="mt-3 opacity-70">Healthcare AI systems engineered for scale and impact</p>
        </div>
        <ProjectsGrid limit={6} />
      </section>
      <section className="relative mx-auto max-w-screen-2xl px-6 sm:px-8 py-24">
        <div className="mx-auto max-w-lg">
          <h2 className="text-3xl font-semibold tracking-tight text-center">Get in touch</h2>
          <ContactForm />
        </div>
      </section>
    </>
  )
}