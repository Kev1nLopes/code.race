import { useAreasCurrentUser } from '@/features/area/hooks'
import { FlatList } from 'react-native'
import { Text } from 'tamagui'

export function AreasSubmetidasCard() {
  const areas = useAreasCurrentUser()

  if (areas.isLoading || !areas.data) {
    return <Text>Carregando...</Text>
  }

  return (
    <FlatList
      data={areas.data}
      keyExtractor={area => area.id.toString()}
      renderItem={({ item }) => <Text>{item.tipo}</Text>}
    />
  )
}
