import { useAreasCurrentUser } from '@/features/area/hooks'
import { RefreshControl } from 'react-native'
import { ScrollView, Text } from 'tamagui'
import { AreaCard } from './AreaCard'

export function AreasSubmetidasCard() {
  const areas = useAreasCurrentUser()

  if (areas.isLoading || !areas.data) {
    return <Text>Carregando...</Text>
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={areas.isFetching}
          onRefresh={areas.refetch}
        />
      }
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {areas.data.map(area => (
        <AreaCard key={area.id} area={area} />
      ))}
    </ScrollView>
  )
}
