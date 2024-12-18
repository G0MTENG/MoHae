import { COLORS } from '@/constants'
import { Chat as ChatType, Friend as FriendType } from '@/types'
import styled from 'styled-components'
import { BMJua, EmptyUser } from '../atoms'
import { formatToKoreanTime } from '@/utils'

export const Chat = () => {
  return <div />
}

const FriendChat = ({ message, friend }: { message: ChatType; friend: FriendType }) => {
  const { avatar } = friend
  const { content, createdAt } = message

  return (
    <FriendChatContainer>
      {avatar ? <img className='avatar' src={avatar} /> : <EmptyUser size={48} />}
      <div className='bubble'>
        <BMJua.Body>{content}</BMJua.Body>
      </div>
      <BMJua.Caption
        style={{
          marginTop: '8px',
        }}
        color={COLORS.GRAY500}
      >
        {formatToKoreanTime(createdAt)}
      </BMJua.Caption>
    </FriendChatContainer>
  )
}

const FriendChatContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;

  & .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${COLORS.GRAY300};
  }

  & .bubble {
    padding: 8px 12px;
    border-radius: 0px 8px 8px 8px;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background-color: ${COLORS.YELLOW300};
  }
`

const UserChat = ({ message }: { message: ChatType }) => {
  const { content, createdAt } = message

  return (
    <UserChatContainer>
      <div className='message'>
        <BMJua.Caption
          style={{
            marginTop: '8px',
          }}
          color={COLORS.GRAY500}
        >
          {formatToKoreanTime(createdAt)}
        </BMJua.Caption>
        <div className='bubble'>
          <BMJua.Body>{content}</BMJua.Body>
        </div>
      </div>
    </UserChatContainer>
  )
}

const UserChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & .message {
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }

  & .bubble {
    padding: 8px 12px;
    border-radius: 8px 0px 8px 8px;
    padding: 8px 16px;
    background-color: ${COLORS.YELLOW300};
  }
`

const DateSeparator = ({ children }: { children: string }) => {
  return (
    <DateSeparatorStyle>
      <hr />
      {children}
      <hr />
    </DateSeparatorStyle>
  )
}

const DateSeparatorStyle = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.GRAY500};
  font-size: 12px;
  font-family: 'BMJUA';
  gap: 12px;

  & hr {
    flex: 1;
    border: none;
    height: 1px;
    background-color: ${COLORS.GRAY500};
  }
`

const Chattings = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

Chat.Friend = FriendChat
Chat.User = UserChat
Chat.Container = Chattings
Chat.Seperate = DateSeparator
