import { useFetchRecentActivity } from '@/hooks'
import { useFetchUserInfo } from '@/hooks/queries/useUser'
import styled from 'styled-components'
import { BMJua, Emoji } from '../atoms'
import { COLORS } from '@/constants'
import { ImageSlider } from '../modules/ImageSlider'
import { Info } from '../modules'

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
  background-color: ${COLORS.YELLOW100};
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
    return <Info>{'최근 활동이 없습니다.\n활동을 추가해보세요!'}</Info>
  }

  const { username } = userInfo
  const { title, description, emoji, images } = recentActivity
  const imageUrls = images.map((image) => image.imageUrl)

  return (
    <Container>
      <BMJua.H5 style={{ paddingLeft: '4px' }}>{username}님은 현재</BMJua.H5>
      <ActivityContainer>
        {imageUrls && imageUrls.length > 0 && <ImageSlider images={imageUrls} />}
        <TitleNEmoji>
          <BMJua.H5>{title}</BMJua.H5>
          <Emoji>{emoji}</Emoji>
        </TitleNEmoji>
        <BMJua.Body>{description}</BMJua.Body>
      </ActivityContainer>
    </Container>
  )
}
