import * as S from './ChatRoomPage.styled'
import { BMJua, Emoji, Header, Icons } from '@/components/atoms'
import { IconButton } from '@/components/modules'
import { Chat } from '@/components/templates'
import { NAVIGATE } from '@/constants'
import { useChat } from '@/hooks'
import { extractDate } from '@/utils'
import { useNavigate } from 'react-router-dom'

export const ChatRoomPage = () => {
  const navigate = useNavigate()
  const { friend, messages, send, chatContainerRef, input, setInput } = useChat()

  return (
    <>
      <S.Container>
        <Header>
          <IconButton
            style={{
              padding: '0',
            }}
            onClick={() => navigate(NAVIGATE.BACK)}
            icon={<Icons.ARROW_LEFT size={24} />}
          />
          <BMJua.H5>{friend?.username ?? ''}</BMJua.H5>
          {friend?.emoji ? <Emoji>{friend.emoji}</Emoji> : <S.Empty />}
        </Header>
        <Chat.Container ref={chatContainerRef}>
          {messages.map((message, index) => {
            const isFriend = message.userId === friend?.id
            const messageDate = extractDate(message.createdAt) // 날짜만 추출
            const prevMessageDate = index > 0 ? extractDate(messages[index - 1].createdAt) : null
            const showDateSeparator = prevMessageDate !== messageDate

            return (
              <>
                {showDateSeparator && <Chat.Seperate>{messageDate}</Chat.Seperate>}

                {isFriend ? (
                  <Chat.Friend message={message} friend={friend} />
                ) : (
                  <Chat.User message={message} />
                )}
              </>
            )
          })}
        </Chat.Container>
        <S.ChatInput>
          <input
            className='input'
            placeholder='메시지를 입력해주세요.'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(e)}
          />
          <IconButton className='button' onClick={send} icon={<Icons.SEND_FILLED size={24} />} />
        </S.ChatInput>
      </S.Container>
    </>
  )
}
