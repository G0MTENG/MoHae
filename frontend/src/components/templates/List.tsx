import { PropsWithChildren } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import styled from 'styled-components'
import { BMJua, Emoji, EmptyUser, Icons } from '../atoms'
import { COLORS } from '@/constants'
import { IconButton } from '../modules'

export interface ListItemProps {
  imageUrl: string
  title: string
  subtitle: string
  emoji: string
  caption: string
}

type ListItemPropsWithNavlink = ListItemProps & NavLinkProps

const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const ChatListItem = ({
  imageUrl,
  title,
  subtitle,
  emoji,
  caption,
  ...props
}: ListItemPropsWithNavlink) => {
  return (
    <ItemContainer {...props}>
      <Image src={imageUrl} />
      <div className='wrapper'>
        <div className='row'>
          <BMJua.Body className='title'>{title}</BMJua.Body>
          <Emoji>{emoji}</Emoji>
        </div>
        <BMJua.Caption color={COLORS.GRAY500}>{subtitle}</BMJua.Caption>
      </div>
      <BMJua.Caption className='caption' color={COLORS.GRAY500}>
        {caption}
      </BMJua.Caption>
    </ItemContainer>
  )
}

const ArchiveListItem = ({
  imageUrl,
  title,
  emoji,
  caption,
  ...props
}: Omit<ListItemPropsWithNavlink, 'subtitle'>) => {
  return (
    <ItemContainer {...props}>
      <Image src={imageUrl} />
      <BMJua.Body className='title'>{title}</BMJua.Body>
      <Emoji>{emoji}</Emoji>
      <BMJua.Caption className='caption' color={COLORS.GRAY500}>
        {caption}
      </BMJua.Caption>
    </ItemContainer>
  )
}

interface FriendListItemProps {
  avatar?: string
  username: string
  onClick: VoidFunction
}
const FriendListItem = ({ avatar, username, onClick }: FriendListItemProps) => {
  return (
    <FriendListItemContainer>
      {avatar ? <img className='avatar' src={avatar} /> : <EmptyUser />}
      <BMJua.Body className='title'>{username}</BMJua.Body>
      <IconButton type='button' onClick={onClick} icon={<Icons.TRASH size={24} />} />
    </FriendListItemContainer>
  )
}

interface ListProps {
  gap?: number
  style?: React.CSSProperties
}

export const List = ({ children, gap, style }: PropsWithChildren<ListProps>) => {
  return (
    <Container style={style} gap={gap}>
      {children}
    </Container>
  )
}

List.Chat = ChatListItem
List.Archive = ArchiveListItem
List.Friend = FriendListItem

const Container = styled.ul<Pick<ListProps, 'gap'>>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap ?? 16}px;
`

const ItemContainer = styled(NavLink)`
  width: 100%;
  padding: 4px 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  text-decoration: none;

  & .wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  & .row {
    display: flex;
    gap: 4px;
  }

  & .title {
    color: ${COLORS.BLACK};
  }

  & .caption {
    flex: 1;
    text-align: right;
  }
`

const FriendListItemContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  & .avatar {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    object-fit: cover;
  }

  & .title {
    flex: 1;
  }
`
