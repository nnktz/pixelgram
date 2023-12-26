import { FollowingModal } from '@/components/following-modal'
import { fetchProfile } from '@/lib/user-service'

const FollowingPage = async ({ params }: { params: { username: string } }) => {
  const profile = await fetchProfile(params.username)
  const followers = profile?.following

  return <FollowingModal following={followers} username={params.username} />
}

export default FollowingPage
