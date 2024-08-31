import { AreasSubmetidasCard } from '@/components/areas/AreasSubmetidasCard'
import { LoginForm } from '@/components/LoginForm'
import { CurrentUserProfileCard } from '@/components/usuarios/UserProfileCard'
import { useSession } from '@/hooks/SessionContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'

export default function Profiles() {
  const { isAuthenticated } = useSession()

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return (
    <SafeAreaView>
      <YStack padding='$2' background='white'>
        <CurrentUserProfileCard />
        <AreasSubmetidasCard />
      </YStack>
    </SafeAreaView>
  )
}
