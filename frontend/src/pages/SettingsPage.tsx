import { BMJua, Favicon, Header, Icons } from '@/components/atoms'
import { Button, Info, Modal } from '@/components/modules'
import { List } from '@/components/templates'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import { useModal } from '@/hooks'
import { useFetchUserInfo } from '@/hooks/queries/useUser'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const SettingsPage = () => {
  const { data: userData } = useFetchUserInfo()
  const { isOpen, open, close } = useModal()
  const navigate = useNavigate()

  if (!userData) return

  const { username, randomCode } = userData

  const handleClickEditProfile = () => {
    navigate('/edit-profile')
  }

  const handleClickSignOut = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    navigate('/sign-in')
  }

  const handleClickConfirmCode = () => {
    open()
  }

  const copy = () => {
    navigator.clipboard.writeText(randomCode)
    alert('복사되었습니다!')
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
        <Row onClick={handleClickConfirmCode}>
          <Icons.CODE size={24} />
          <BMJua.Body>코드 확인</BMJua.Body>
        </Row>
        <Hr />
        <Row onClick={handleClickSignOut}>
          <Icons.LOGOUT size={24} />
          <BMJua.Body>로그아웃</BMJua.Body>
        </Row>
      </List>
      {isOpen && (
        <Modal close={close}>
          <Info>{`${username}님의 코드는\n${randomCode}입니다!`}</Info>
          <Buttons>
            <Button onClick={copy}>복사</Button>
            <Button onClick={close}>닫기</Button>
          </Buttons>
        </Modal>
      )}
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

const Buttons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`
