import { SafeAreaView } from 'react-native'
import WebView from 'react-native-webview'
import { useRef, useEffect } from 'react'
import { FRONTEND_URL } from '@/constants'
import { getItem } from '@/utils/storage'
import { router } from 'expo-router'

export default function HomeScreen() {
  const webViewRef = useRef<WebView | null>(null)

  useEffect(() => {
    if (!webViewRef.current) return

    const token = (async () => {
      const accessToken = await getItem('ACCESS_TOKEN')
      const refreshToken = await getItem('REFRESH_TOKEN')

      if (!accessToken) {
        router.replace('/')
        return
      }

      return {
        accessToken,
        refreshToken,
      }
    })()

    webViewRef.current.postMessage(
      JSON.stringify({
        type: 'POST_TOKEN',
        payload: {
          token,
        },
      }),
    )
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        style={{ flex: 1 }}
        source={{
          uri: `${FRONTEND_URL}/main/home`,
        }}
        userAgent='APP_WEBVIEW'
      />
    </SafeAreaView>
  )
}
