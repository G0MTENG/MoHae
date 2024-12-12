import { COLORS } from '@/constants'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

interface ModalProps {
  close: VoidFunction
}

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`

const Content = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${COLORS.WHITE};
  padding: 16px;
  border-radius: 8px;
`

export const Modal = ({ close, children }: PropsWithChildren<ModalProps>) => {
  const handleStopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <Background onClick={close}>
      <Content onClick={handleStopPropagation}>{children}</Content>
    </Background>
  )
}
