import { FRONTEND_URL } from '@/constants'
import { SafeAreaView } from 'react-native'
import WebView from 'react-native-webview'

export default function FriendsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `${FRONTEND_URL}/main/friends`,
        }}
        userAgent='APP_WEBVIEW'
      />
    </SafeAreaView>
  )
}
