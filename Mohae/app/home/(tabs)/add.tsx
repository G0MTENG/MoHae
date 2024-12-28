import { FRONTEND_URL } from '@/constants'
import { SafeAreaView } from 'react-native'
import WebView from 'react-native-webview'

export default function AddScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `${FRONTEND_URL}/add`,
        }}
        userAgent='APP_WEBVIEW'
      />
    </SafeAreaView>
  )
}
