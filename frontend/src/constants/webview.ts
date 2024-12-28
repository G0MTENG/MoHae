const isWebView = () => {
  const USER_AGENT_NAME = 'APP_WEBVIEW'
  return window.navigator.userAgent.includes(USER_AGENT_NAME)
}

export const ISWEBVIEW = isWebView()
