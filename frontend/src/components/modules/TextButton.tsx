import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { BMJua } from '../atoms'

type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

interface ButtonProps extends NativeButtonProps {
  color: string
}

const ButtonStyle = styled.button`
  background-color: transparent;
  cursor: pointer;
`

export const TextButton = ({ color, children, ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <ButtonStyle {...props}>
      <BMJua.Body color={color}>{children}</BMJua.Body>
    </ButtonStyle>
  )
}
