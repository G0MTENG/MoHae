import { useFetchRecentActivity } from './queries/useActivity'
import { useFetchUserInfo } from './queries/useUser'

export const useUserInfoWithRecent = () => {
  const { data: userInfo } = useFetchUserInfo()
  const { data: myRecent } = useFetchRecentActivity()

  if (!userInfo || !myRecent) return null

  return {
    id: myRecent.id,
    username: userInfo.username,
    avatar: userInfo.avatar,
    title: myRecent.title,
    emoji: myRecent.emoji,
  }
}
