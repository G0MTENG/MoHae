import { BMJua } from '@/components/atoms'
import { COLORS } from '@/constants'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const TextButtonStyle = styled.button`
  width: 100%;
  height: 24px;
  background-color: transparent;
`

export const TextButton = ({ children, ...props }: PropsWithChildren<NativeButtonProps>) => {
  return (
    <TextButtonStyle {...props}>
      <BMJua.Caption color={COLORS.GRAY500}>{children}</BMJua.Caption>
    </TextButtonStyle>
  )
}
