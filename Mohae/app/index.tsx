import { signIn } from '@/apis/auth'
import { FRONTEND_URL } from '@/constants'
import { setItem } from '@/utils/storage'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import WebView from 'react-native-webview'

export default function Index() {
  const { mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      router.replace('/home/(tabs)')
    },
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  const onMessage = async (event: any) => {
    const { type, payload } = JSON.parse(event.nativeEvent.data)

    switch (type) {
      case 'LOGIN':
        setItem('ACCESS_TOKEN', payload.accessToken)
        setItem('REFRESH_TOKEN', payload.refreshToken)
        setItem('EMAIL', payload.email)
        setItem('PASSWORD', payload.password)
        router.replace('/home/(tabs)')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `${FRONTEND_URL}/sign-in`,
        }}
        userAgent='APP_WEBVIEW'
        onMessage={onMessage}
      />
    </SafeAreaView>
  )
}
