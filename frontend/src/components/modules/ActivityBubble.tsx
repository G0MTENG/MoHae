import styled from 'styled-components'
import { BMJua, Emoji, EmptyUser } from '../atoms'
import { COLORS } from '@/constants'
import { NavLink } from 'react-router-dom'

interface ActivityBubbleProps {
  id: number
  title: string
  emoji: string
  avatar?: string
  username: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const Bubble = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  position: relative;
  background-color: ${COLORS.YELLOW300};
  border-radius: 16px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  position: relative;

  & ::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid ${COLORS.YELLOW300};
  }
`

const Avatar = styled(NavLink)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: 1px solid ${COLORS.YELLOW300};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  & .image {
    width: 100%;
    height: 100%;
  }
`

export const ActivityBubble = ({ id, title, emoji, avatar, username }: ActivityBubbleProps) => {
  if (!id) return null

  return (
    <Container>
      <Bubble>
        <BMJua.Body>{title}</BMJua.Body>
        <Emoji>{emoji}</Emoji>
        <div className='bubble-arrow' />
      </Bubble>
      <Avatar to={`/activity/${id}`}>
        {avatar ? <img src={avatar} alt={username} className='image' /> : <EmptyUser />}
      </Avatar>
      <BMJua.H5>{username}</BMJua.H5>
    </Container>
  )
}
