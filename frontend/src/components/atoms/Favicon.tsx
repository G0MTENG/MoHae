interface FaviconProps {
  size?: number
}

export const Favicon = ({ size = 64 }: FaviconProps) => {
  return <img src='/icon.svg' alt='icon' width={size} height={size} />
}
