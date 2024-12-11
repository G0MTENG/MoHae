import { COLORS } from '@/constants'
import { NavLink as Link } from 'react-router-dom'
import styled from 'styled-components'

export const NavLink = styled(Link)`
  width: 100%;
  height: 24px;
  background-color: transparent;

  font-family: 'BMJUA';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;

  color: ${COLORS.GRAY500};
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
`
