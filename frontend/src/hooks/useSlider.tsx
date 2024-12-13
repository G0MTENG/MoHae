import { useState } from 'react'

interface UseSliderProps {
  images: string[]
}

export const useSlider = ({ images }: UseSliderProps) => {
  const [state, setState] = useState(0)
  const length = images.length

  const next = () => {
    setState((prev) => (prev + 1) % length)
  }

  const prev = () => {
    setState((prev) => (prev - 1 + length) % length)
  }

  return {
    image: images[state],
    next,
    prev,
  }
}
