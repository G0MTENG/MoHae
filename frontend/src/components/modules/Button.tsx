import { COLORS } from '@/constants'
import styled from 'styled-components'
import { BMJua } from '../atoms'

type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
interface ButtonProps extends NativeButtonProps {
  children: React.ReactNode
}

const ButtonStyle = styled.button`
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  color: ${COLORS.BLACK500};

  background-color: ${COLORS.YELLOW500};
`

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <ButtonStyle {...props}>
      <BMJua.Body>{children}</BMJua.Body>
    </ButtonStyle>
  )
}
