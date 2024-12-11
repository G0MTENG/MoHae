import styled from 'styled-components'
import { BMJua, Icons } from '../atoms'
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom'
import { IconType } from '@/types'
import { COLORS } from '@/constants'

const Block = styled(NavLink)<{ active: boolean }>`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  color: ${(props) => (props.active ? COLORS.BLACK500 : COLORS.GRAY500)};
  text-decoration: none;
`

interface NavBlockProps extends NavLinkProps {
  icon: IconType
  title: string
}

export const NavBlock = ({ icon, title, ...props }: NavBlockProps) => {
  const locaion = useLocation()
  const Icon = Icons[icon]

  return (
    <Block active={locaion.pathname === props.to} {...props}>
      <Icon size={24} />
      <BMJua.Caption>{title}</BMJua.Caption>
    </Block>
  )
}
