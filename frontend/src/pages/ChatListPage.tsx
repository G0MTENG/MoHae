import { Info } from '@/components/modules'
import * as S from './ChatListPage.styled'
import { BMJua, Emoji, EmptyUser, Header, Icons } from '@/components/atoms'
import { COLORS } from '@/constants'
import { useFetchChatList } from '@/hooks'
import { FriendChatListItem } from '@/types'
import { useNavigate } from 'react-router-dom'
import { extractDate } from '@/utils'

export const ChatListPage = () => {
  const navigate = useNavigate()
  const { data: chatList, isLoading, isError } = useFetchChatList()

  const handleClickChat = (connectionId: number) => {
    navigate(`/chat/${connectionId}`)
  }

  return (
    <>
      <Header>
        <Icons.ARROW_LEFT style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} size={24} />
      </Header>
      {isLoading || isError ? (
        <Info>{'친구의 활동을 보고\n채팅을 시작하세요!'}</Info>
      ) : (
        <S.List>
          {chatList?.map((chat) => (
            <ChatListItem onClick={handleClickChat} key={chat.connectionId} {...chat} />
          ))}
        </S.List>
      )}
    </>
  )
}

const ChatListItem = ({
  username,
  avatar,
  emoji,
  connectionId,
  lastestMessage,
  updatedAt,
  onClick,
}: FriendChatListItem & { onClick: (id: number) => void }) => {
  return (
    <S.ListItem onClick={() => onClick(connectionId)}>
      {avatar ? <img className='avatar' src={avatar} /> : <EmptyUser size={48} />}
      <div className='info'>
        <div className='user-info'>
          <BMJua.Body>{username}</BMJua.Body>
          <Emoji size={16}>{emoji ?? ''}</Emoji>
        </div>
        <BMJua.Caption color={COLORS.GRAY500}>{lastestMessage ?? ''}</BMJua.Caption>
      </div>
      <BMJua.Caption color={COLORS.GRAY500}>{updatedAt && extractDate(updatedAt)}</BMJua.Caption>
    </S.ListItem>
  )
}
