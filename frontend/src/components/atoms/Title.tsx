import styled from 'styled-components'
import { BMJua } from './BMJua'
import { COLORS } from '@/constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Medium = () => {
  return (
    <Container>
      <BMJua.H3 color={COLORS.BLACK500}>모해</BMJua.H3>
      <BMJua.Small color={COLORS.GRAY500}>일상을 공유해요</BMJua.Small>
    </Container>
  )
}

const Small = () => {
  return (
    <Container>
      <BMJua.H5 color={COLORS.BLACK500}>모해</BMJua.H5>
      <BMJua.Caption color={COLORS.GRAY500}>일상을 공유해요</BMJua.Caption>
    </Container>
  )
}

export const Title = {
  Medium,
  Small,
}
