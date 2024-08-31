import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { SessionProvider } from '@/hooks/SessionContext'
import { useColorScheme } from '@/hooks/useColorScheme'
import { config } from '@tamagui/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTamagui, TamaguiProvider } from 'tamagui'

const tamaguiConfig = createTamagui(config)

const queryClient = new QueryClient()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' />
          </Stack>
        </QueryClientProvider>
      </SessionProvider>
    </TamaguiProvider>
  )
}
