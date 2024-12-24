import { useEffect } from 'react'
import { Favicon, Title } from '@/components/atoms'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { NAVIGATE } from '@/constants'

export const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

export const SplashPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(NAVIGATE.SIGN_IN)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [navigate])

  return (
    <Container>
      <Favicon />
      <Title.Medium />
    </Container>
  )
}
