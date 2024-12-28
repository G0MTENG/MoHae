import { useCallback, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'

// 애니메이션 옵션을 설정합니다. (optional)
// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// })

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        // 폰트를 미리 로드하고, 필요한 API 호출을 여기서 수행합니다
        await Font.loadAsync({
          BMJUA: require('./assets/fonts/BMJUA.ttf'),
          TossFace: require('./assets/fonts/TossFace.ttf'),
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // 이 코드는 스플래시 화면을 즉시 숨기도록 지시합니다! `setAppIsReady` 후에 이 코드를 호출하면
      // 앱이 초기 상태를 로드하고 첫 번째 픽셀을 렌더링하는 동안 빈 화면이 표시될 수 있습니다.
      // 따라서 루트 뷰가 이미 레이아웃을 수행한 것을 알고 있을 때 스플래시 화면을 숨깁니다.
      SplashScreen.hide()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Text>앱이 준비되었습니다!</Text>
    </View>
  )
}
