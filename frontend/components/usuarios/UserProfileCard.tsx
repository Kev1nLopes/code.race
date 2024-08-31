import { useCurrentUser } from '@/features/usuario/hooks'
import { Text, View, XStack, YStack } from 'tamagui'
import { UserAvatar } from '../UserAvatar'

export function CurrentUserProfileCard() {
  const user = useCurrentUser()

  if (user.isError) {
    return <Text>{user.error.message}</Text>
  }

  if (user.isLoading || !user.data) {
    return <Text>Carregando...</Text>
  }

  return (
    <View backgroundColor='#f7f7f7' padding='$3'>
      <XStack gap='$3'>
        <UserAvatar name={user.data.nome} />
        <YStack>
          <Text color='black' fontWeight={800}>
            {user.data.nome}
          </Text>
          <Text color='black'>{user.data.email}</Text>
        </YStack>
      </XStack>
    </View>
  )
}
