import { WebviewInterface } from '@/types/webview'
import { useEffect } from 'react'

export const useReceiveFromRN = <T, P>(
  handleReceive: ({ type, payload }: WebviewInterface<T, P>) => void,
) => {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data
      const { type, payload } = JSON.parse(data)
      handleReceive({ type, payload })
    }

    document.addEventListener('message', handler as EventListener)
    window.addEventListener('message', handler)

    return () => {
      document.removeEventListener('message', handler as EventListener)
      window.removeEventListener('message', handler)
    }
  })
}
