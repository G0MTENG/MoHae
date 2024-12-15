import { COLORS } from '@/constants'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

interface ModalProps {
  close: VoidFunction
  height?: string
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

const Content = styled.div<Pick<ModalProps, 'height'>>`
  width: 80%;
  height: ${(props) => props.height};
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

export const Modal = ({ close, height, children }: PropsWithChildren<ModalProps>) => {
  const handleStopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <Background onClick={close}>
      <Content height={height} onClick={handleStopPropagation}>
        {children}
      </Content>
    </Background>
  )
}
