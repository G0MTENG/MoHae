import { COLORS } from '@/constants'
import styled from 'styled-components'

type NativeImage = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>

interface PreviewImageProps extends NativeImage {
  index: number
  onDelete: (key: number) => void
}

export const PreviewImage = ({ index, onDelete, ...props }: PreviewImageProps) => {
  return (
    <ImageContainer>
      <ImageStyle {...props} />
      <DeleteButton onClick={() => onDelete(index)}>×</DeleteButton>
    </ImageContainer>
  )
}

const ImageContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`

export const ImageStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid ${COLORS.GRAY500};
  border-radius: 8px;
`

const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 12px;
  height: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${COLORS.RED500};
  color: ${COLORS.WHITE};
  border: none;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`
