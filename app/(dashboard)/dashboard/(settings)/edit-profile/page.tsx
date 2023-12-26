import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import { auth } from '@/configs/auth'
import { fetchProfile } from '@/lib/user-service'
import { ProfileForm } from '@/components/profile/profile-form'

export const metadata: Metadata = {
  title: 'Edit Profile',
  description: 'Edit profile',
}

const EditProfilePage = async () => {
  const session = await auth()
  const profile = await fetchProfile(session?.user.username!)

  if (!profile) {
    notFound()
  }

  return (
    <div className="px-12">
      <h1 className="text-2xl font-medium">Edit profile</h1>

      <ProfileForm profile={profile} />
    </div>
  )
}

export default EditProfilePage
