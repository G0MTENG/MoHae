import { useFetchRecentActivity } from '@/hooks'
import { useFetchUserInfo } from '@/hooks/queries/useUser'
import styled from 'styled-components'
import { BMJua, Emoji } from '../atoms'
import { COLORS } from '@/constants'
import { ImageSlider } from '../modules/ImageSlider'

const Container = styled.div`
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ActivityContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  padding: 16px 24px;
  background-color: ${COLORS.YELLOW500};
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  align-items: center;
`

const TitleNEmoji = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const RecentActivityView = () => {
  const { data: recentActivity } = useFetchRecentActivity()
  const { data: userInfo } = useFetchUserInfo()

  if (!recentActivity || !userInfo) {
    return
  }

  const { username } = userInfo
  const { title, description, emoji, images } = recentActivity
  const imageUrls = images.map((image) => image.imageUrl)

  return (
    <Container>
      <BMJua.H5 style={{ paddingLeft: '4px' }}>{username}님은 현재</BMJua.H5>
      <ActivityContainer>
        <ImageSlider images={imageUrls} />
        <TitleNEmoji>
          <BMJua.H5>{title}</BMJua.H5>
          <Emoji>{emoji}</Emoji>
        </TitleNEmoji>
        <BMJua.Body color={COLORS.GRAY500}>{description}</BMJua.Body>
      </ActivityContainer>
    </Container>
  )
}
