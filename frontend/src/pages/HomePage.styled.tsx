import { COLORS } from '@/constants'
import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  gap: 16px;
`

export const MyContainer = styled.div`
  width: 100%;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: ${COLORS.YELLOW100};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`

export const Container = styled.div`
  width: 100%;
  height: calc(100svh - 138px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const FriendsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
`
