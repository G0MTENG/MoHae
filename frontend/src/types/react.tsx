type NativeButtonProps = React.ComponentPropsWithoutRef<'button'>

interface CustomButtonProps extends NativeButtonProps {
  onClick: string
}

export const Button: React.FC<CustomButtonProps> = ({ onClick, ...buttonProps }) => {
  return <button onClick={onClick} {...buttonProps}></button>
}
