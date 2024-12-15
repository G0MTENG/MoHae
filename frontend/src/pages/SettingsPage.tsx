import { BMJua, Favicon, Header, Icons } from '@/components/atoms'
import { List } from '@/components/templates'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import { useFetchUserInfo } from '@/hooks/queries/useUser'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const SettingsPage = () => {
  const { data: userData } = useFetchUserInfo()
  const navigate = useNavigate()

  if (!userData) return

  const { username } = userData

  const handleClickEditProfile = () => {
    navigate('/edit-profile')
  }

  const handleClickSignOut = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    navigate('/sign-in')
  }

  return (
    <>
      <Header>
        <HeaderContainer>
          <Favicon size={64} />
          <BMJua.Body
            style={{
              whiteSpace: 'pre-wrap',
              display: 'flex',
              alignItems: 'center',
            }}
          >{`안녕하세요\n${username}님 반갑습니다.`}</BMJua.Body>
        </HeaderContainer>
      </Header>
      <List gap={0}>
        <Row onClick={handleClickEditProfile}>
          <Icons.EDIT size={24} />
          <BMJua.Body>프로필 수정</BMJua.Body>
        </Row>
        <Hr />
        <Row onClick={handleClickSignOut}>
          <Icons.LOGOUT size={24} />
          <BMJua.Body>로그아웃</BMJua.Body>
        </Row>
      </List>
    </>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  gap: 16px;
`

const Row = styled.button`
  background-color: transparent;
  width: 100%;
  padding: 10px 16px;
  display: flex;
  gap: 16px;
  cursor: pointer;
`

const Hr = styled.hr`
  margin: 8px 16px;
`
