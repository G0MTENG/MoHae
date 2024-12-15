interface EmptyUserProps {
  size?: number
}

export const EmptyUser = ({ size = 48 }: EmptyUserProps) => {
  return <img src='/user.svg' alt='icon' width={size} height={size} />
}
