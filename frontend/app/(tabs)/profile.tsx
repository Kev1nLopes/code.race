import { AreasSubmetidasCard } from '@/components/areas/AreasSubmetidasCard'
import { LoginForm } from '@/components/LoginForm'
import { CurrentUserProfileCard } from '@/components/usuarios/UserProfileCard'
import { useSession } from '@/hooks/SessionContext'
import { View } from 'tamagui'

export default function Profiles() {
  const { isAuthenticated } = useSession()

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return (
    <View flexGrow={1} padding='$2'>
      <View flex={1} padding='$2' background='white'>
        <CurrentUserProfileCard />
        <AreasSubmetidasCard />
      </View>
    </View>
  )
}
