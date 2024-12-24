import { COLORS } from '@/constants'
import styled from 'styled-components'

type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
interface IconButtonProps extends NativeButtonProps {
  icon: React.ReactElement
}

const IconButtonStyle = styled.button<{ color: string }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ color }) => color};
`

export const IconButton = ({ icon, ...props }: IconButtonProps) => {
  return (
    <IconButtonStyle color={COLORS.BLACK500} {...props}>
      {icon}
    </IconButtonStyle>
  )
}
