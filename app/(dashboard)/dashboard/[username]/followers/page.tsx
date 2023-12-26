import { FollowersModal } from '@/components/followers-modal'
import { fetchProfile } from '@/lib/user-service'

const FollowersPage = async ({ params }: { params: { username: string } }) => {
  const profile = await fetchProfile(params.username)
  const followers = profile?.followedBy

  return <FollowersModal followers={followers} username={params.username} />
}

export default FollowersPage
