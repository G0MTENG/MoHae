import { useNavigate } from 'react-router-dom'
import * as S from './HomePage.styled'
import { Favicon, Header, Icons, Title } from '@/components/atoms'
import { ActivityBubble } from '@/components/modules/ActivityBubble'
import { useUserInfoWithRecent } from '@/hooks/useUserInfoWithRecent'
import { useFetchFriendsRecentActivity } from '@/hooks'
import { Info } from '@/components/modules'

export const FriendsPage = () => {
  const navigator = useNavigate()
  const userInfoWithRecent = useUserInfoWithRecent()
  const { data: friendsData } = useFetchFriendsRecentActivity()

  return (
    <>
      <Header>
        <S.HeaderContainer>
          <Favicon size={52} />
          <Title.Small />
        </S.HeaderContainer>
        <S.HeaderContainer>
          <Icons.FRIEND_ADD
            onClick={() => navigator('/friends/add')}
            style={{
              cursor: 'pointer',
            }}
            size={24}
          />
        </S.HeaderContainer>
      </Header>
      <S.Container>
        <S.MyContainer>
          {userInfoWithRecent ? (
            <ActivityBubble {...userInfoWithRecent} />
          ) : (
            <Info>{'하단 + 버튼을 통해 친구들의\n일상을 공유해보세요!'}</Info>
          )}
        </S.MyContainer>
        {friendsData && friendsData.length > 0 ? (
          <S.FriendsContainer>
            {friendsData.map(({ activity, user }) => (
              <ActivityBubble
                key={user.id}
                {...{
                  id: activity.id,
                  title: activity.title,
                  emoji: activity.emoji,
                  avatar: user?.avatar,
                  username: user.username,
                }}
              />
            ))}
          </S.FriendsContainer>
        ) : (
          <Info>{'우측 상단 버튼을 통해\n회원님의 친구를 등록해주세요.'}</Info>
        )}
      </S.Container>
    </>
  )
}
