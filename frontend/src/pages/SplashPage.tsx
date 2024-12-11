import * as S from './Splash.styled'
import { Favicon, Title } from '@/components/atoms'

export const SplashPage = () => {
  return (
    <S.Container>
      <Favicon />
      <Title.Medium />
    </S.Container>
  )
}
