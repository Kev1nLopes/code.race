import { NotificationCard } from '@/components/notification/notificationCard'
import { useAllNotifications } from '@/features/notifications/hooks'
import { RefreshControl } from 'react-native'
import { ScrollView, Text, View } from 'tamagui'

export default function Notifications() {
  const notifications = useAllNotifications()

  if (notifications.isLoading || !notifications.data) {
    return <Text>Carregando...</Text>
  }

  return (
    <View flex={1} marginTop='$6'>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={notifications.isLoading}
            onRefresh={notifications.refetch}
          />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        padding='$2'
      >
        {notifications.data.map((n, index) => (
          <NotificationCard notification={n} key={index} />
        ))}
      </ScrollView>
    </View>
  )
}
