import { useCurrentUser } from '@/features/usuario/hooks'
import { useSession } from '@/hooks/SessionContext'
import { Ionicons } from '@expo/vector-icons'
import { Button, Text, View, XStack, YStack } from 'tamagui'
import { UserAvatar } from '../UserAvatar'

export function CurrentUserProfileCard() {
  const user = useCurrentUser()
  const { signOut } = useSession()

  if (user.isError) {
    return <Text>{user.error.message}</Text>
  }

  if (user.isLoading || !user.data) {
    return <Text>Carregando...</Text>
  }

  return (
    <View backgroundColor='#f7f7f7' padding='$3'>
      <XStack justifyContent='space-between'>
        <XStack gap='$3'>
          <UserAvatar name={user.data.nome} />
          <YStack>
            <Text color='black' fontWeight={800}>
              {user.data.nome}
            </Text>
            <Text color='black'>{user.data.email}</Text>
            <Text color='black'>{user.data.cidade}</Text>
          </YStack>
        </XStack>
        <Button backgroundColor='$gray12' onPress={signOut}>
          <Ionicons name='log-out' size={24} />
        </Button>
      </XStack>
    </View>
  )
}
