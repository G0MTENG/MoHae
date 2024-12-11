import { Button, Input, NavLink } from '@/components/modules'
import * as S from './SignUpPage.styled'
import { Title } from '@/components/atoms'
import { useSignUpForm } from '@/hooks'
import { ROUTES } from '@/constants'

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    formState: { errors },
  } = useSignUpForm()

  return (
    <S.Container>
      <Title.Medium />
      <S.Form>
        <Input
          label='이름'
          type='text'
          placeholder='이름을 입력해주세요.'
          register={register('username')}
          error={errors?.username?.message}
        />
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
        <Input
          label='비밀번호 재입력'
          type='password'
          placeholder='비밀번호를 다시 입력해주세요.'
          register={register('passwordConfirm')}
          error={errors?.passwordConfirm?.message}
        />
      </S.Form>
      <Button type='submit' onClick={handleSubmit(onSubmit)}>
        회원가입
      </Button>
      <NavLink to={ROUTES.AUTH.SIGN_IN}>로그인하러 하기</NavLink>
    </S.Container>
  )
}
