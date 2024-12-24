import { Title } from '@/components/atoms'
import * as S from './SignInPage.styled'
import { Button, Input, NavLink } from '@/components/modules'
import { useSignInForm } from '@/hooks'
import { ROUTES } from '@/constants'

export const SignInPage = () => {
  const {
    register,
    onSubmit,
    formState: { errors },
  } = useSignInForm()

  return (
    <S.Container>
      <Title.Medium />
      <S.Form>
        <Input
          label='이메일'
          type='email'
          placeholder='이메일을 입력해주세요.'
          register={register('email')}
          error={errors?.email?.message}
        />
        <Input
          label='비밀번호'
          type='password'
          placeholder='비밀번호를 입력해주세요.'
          register={register('password')}
          error={errors?.password?.message}
        />
      </S.Form>
      <Button type='submit' onClick={onSubmit}>
        로그인
      </Button>
      <S.NavLinks>
        <NavLink to={ROUTES.AUTH.SIGN_UP}>회원가입 하기</NavLink>
        <NavLink to={ROUTES.AUTH.FIND_PASSWORD}>비밀번호 찾기</NavLink>
      </S.NavLinks>
    </S.Container>
  )
}
