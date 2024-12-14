import { PropsWithChildren } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import styled from 'styled-components'
import { BMJua, Emoji } from '../atoms'
import { COLORS } from '@/constants'

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

export const List = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>
}

List.Chat = ChatListItem
List.Archive = ArchiveListItem

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
