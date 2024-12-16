import { useEffect } from 'react'
import * as S from './Splash.styled'
import { Favicon, Title } from '@/components/atoms'
import { useNavigate } from 'react-router-dom'

export const SplashPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('sign-in')
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [navigate])
  return (
    <S.Container>
      <Favicon />
      <Title.Medium />
    </S.Container>
  )
}
