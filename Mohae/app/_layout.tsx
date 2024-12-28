import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='home/(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='+not-found' />
      </Stack>
    </QueryClientProvider>
  )
}
