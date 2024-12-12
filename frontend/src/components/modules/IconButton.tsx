import styled from 'styled-components'

type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
interface IconButtonProps extends NativeButtonProps {
  icon: React.ReactElement
}

const IconButtonStyle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

export const IconButton = ({ icon, ...props }: IconButtonProps) => {
  return <IconButtonStyle {...props}>{icon}</IconButtonStyle>
}
