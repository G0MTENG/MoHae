import { signIn, signUp } from '@/apis/auth'
import { ACCESS_TOKEN, REFRESH_TOKEN, ROUTES } from '@/constants'
import { MutationOptions } from '@/types'
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useSignIn = (mutateOptions?: MutationOptions<SignInResponse, SignInRequest>) => {
  const navigator = useNavigate()

  return useMutation({
    mutationFn: signIn,
    onSuccess(data) {
      localStorage.setItem(ACCESS_TOKEN, data.accessToken)
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
      navigator('/main/home')
    },
    ...mutateOptions,
  })
}

export const useSignUp = (mutateOptions?: MutationOptions<SignUpResponse, SignUpRequest>) => {
  const navigator = useNavigate()

  return useMutation({
    mutationFn: signUp,
    onSuccess() {
      navigator(ROUTES.AUTH.SIGN_IN)
    },
    ...mutateOptions,
  })
}
