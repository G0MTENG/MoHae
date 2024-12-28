import { signIn, signUp } from '@/apis/auth'
import { ACCESS_TOKEN, NAVIGATE, REFRESH_TOKEN } from '@/constants'
import { ISWEBVIEW } from '@/constants/webview'
import { MutationOptions } from '@/types'
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

type WebviewExtendsInterface = {
  auth: {
    email: string
    password: string
  }
  data: SignInResponse
}
export const useSignIn = (
  mutateOptions?: MutationOptions<WebviewExtendsInterface, SignInRequest>,
) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signIn,
    onSuccess(data) {
      localStorage.setItem(ACCESS_TOKEN, data.data.accessToken)
      localStorage.setItem(REFRESH_TOKEN, data.data.refreshToken)
      if (ISWEBVIEW) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'LOGIN',
            payload: {
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken,
              email: data.auth.email,
              password: data.auth.password,
            },
          }),
        )
      } else {
        navigate(NAVIGATE.HOME)
      }
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
