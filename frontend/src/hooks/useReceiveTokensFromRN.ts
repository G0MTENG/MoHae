import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import { WebviewInterface } from '@/types/webview'

type Type = 'POST_TOKEN'

type TokenPayload = {
  accessToken: string
  refreshToken: string
}

export const useReceiveTokensFromRN = () => {
  const handler = ({ type, payload }: WebviewInterface<Type, unknown>) => {
    switch (type) {
      case 'POST_TOKEN':
        localStorage.setItem(ACCESS_TOKEN, (payload as TokenPayload).accessToken)
        localStorage.setItem(REFRESH_TOKEN, (payload as TokenPayload).refreshToken)
    }
  }

  return {
    handler,
  }
}
