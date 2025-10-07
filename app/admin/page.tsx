import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Admin Dashboard</h1>
      <p className="mt-3 text-base text-gray-600">
        Welcome, {session.user?.name}! This page is protected.
      </p>
    </main>
  )
}
