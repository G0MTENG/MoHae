import { Favicon, Title } from '@/components/atoms'
import { useSplash } from '@/hooks'
import styled from 'styled-components'

export const SplashPage = () => {
  useSplash()

  return (
    <Container>
      <Favicon />
      <Title.Medium />
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`
