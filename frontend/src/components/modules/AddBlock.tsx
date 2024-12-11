import { NavLink, NavLinkProps } from 'react-router-dom'
import styled from 'styled-components'
import { Icons } from '../atoms'
import { COLORS } from '@/constants'

const Block = styled(NavLink)`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const AddBlock = (props: NavLinkProps) => {
  return (
    <Block {...props}>
      <Icons.PLUS_FILLED color={COLORS.YELLOW500} size={36} />
    </Block>
  )
}
