import { signIn, signUp } from '@/apis/auth'
import { ACCESS_TOKEN, NAVIGATE, REFRESH_TOKEN } from '@/constants'
import { MutationOptions } from '@/types'
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useSignIn = (mutateOptions?: MutationOptions<SignInResponse, SignInRequest>) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signIn,
    onSuccess(data) {
      localStorage.setItem(ACCESS_TOKEN, data.accessToken)
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
      navigate(NAVIGATE.HOME)
    },
    ...mutateOptions,
  })
}

export const useSignUp = (mutateOptions?: MutationOptions<SignUpResponse, SignUpRequest>) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signUp,
    onSuccess() {
      navigate(NAVIGATE.SIGN_IN)
    },
    ...mutateOptions,
  })
}
