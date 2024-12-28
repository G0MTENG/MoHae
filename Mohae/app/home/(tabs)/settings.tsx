import { FRONTEND_URL } from '@/constants'
import { clearItems } from '@/utils/storage'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native'
import WebView from 'react-native-webview'

export default function SettingsScreen() {
  const onMessage = (event: any) => {
    const { type } = JSON.parse(event.nativeEvent.data)
    switch (type) {
      case 'LOGOUT':
        clearItems()
        router.replace('/')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `${FRONTEND_URL}/main/settings`,
        }}
        userAgent='APP_WEBVIEW'
        onMessage={onMessage}
      />
    </SafeAreaView>
  )
}
