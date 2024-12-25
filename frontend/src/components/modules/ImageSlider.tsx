import { COLORS } from '@/constants'
import { useSlider } from '@/hooks/useSlider'
import styled from 'styled-components'
import { Icons } from '../atoms'

interface ImageSliderProps {
  images: string[]
}

export const ImageSlider = ({ images }: ImageSliderProps) => {
  const { image, next, prev, number } = useSlider({ images })

  return (
    <Container>
      {number !== 0 && (
        <Icons.ARROW_LEFT onClick={prev} className='prev button' color={COLORS.WHITE} size={24} />
      )}
      <Image src={image} alt='slider' />
      {number !== images.length - 1 && (
        <Icons.ARROW_RIGHT onClick={next} className='next button' color={COLORS.WHITE} size={24} />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  position: relative;

  & .button {
    position: absolute;
    top: 50%;
    background-color: transparent;
    color: ${COLORS.WHITE};
    cursor: pointer;
  }

  & .prev {
    left: 0;
  }

  & .next {
    right: 0;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`
