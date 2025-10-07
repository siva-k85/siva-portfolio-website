import Image from 'next/image'

export default function ProfilePhoto() {
  return (
    <div className="flex justify-center lg:justify-start">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse" />
        <div className="relative rounded-full overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="/images/profile/siva-profile.jpg"
            alt="Siva Komaragiri - Healthcare Analytics Leader"
            width={200}
            height={200}
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}