import { COLORS } from '@/constants'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const ChatInput = styled.div`
  width: 100%;
  height: 72px;
  padding: 12px 16px;
  background-color: ${COLORS.YELLOW500};
  display: flex;
  align-items: center;
  gap: 8px;

  & .input {
    flex: 1;
    padding: 12px 16px;
    border: none;
    border-radius: 6px;
    background-color: ${COLORS.YELLOW300};
    color: ${COLORS.BLACK500};
    font-family: 'BMJUA';
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  & .button {
    padding: 0;
  }
`

export const Empty = styled.div`
  width: 24px;
  height: 24px;
`
