import { COLORS, ROUTES } from '@/constants'
import { NavBlock } from '../modules/NavBlock'
import styled from 'styled-components'
import { AddBlock } from '../modules/AddBlock'

const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${COLORS.WHITE};
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  padding: 0 0 4px 0;

  ul {
    display: flex;
    padding: 0;
  }
`

export const BottomNavigation = () => {
  return (
    <Nav>
      <ul>
        <NavBlock icon='HOME' title='홈' to={ROUTES.MAIN.HOME} />
        <NavBlock icon='ARCHIVE' title='기록' to={ROUTES.MAIN.ARCHIVE} />
        <AddBlock to={ROUTES.MAIN.ADD} />
        <NavBlock icon='FRIENDS' title='친구' to={ROUTES.MAIN.FRIENDS} />
        <NavBlock icon='SETTINGS' title='설정' to={ROUTES.MAIN.SETTINGS} />
      </ul>
    </Nav>
  )
}
