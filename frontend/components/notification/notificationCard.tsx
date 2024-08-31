import { Notificacao, TipoNotificacao } from '@/features/notifications/types'
import { Usuario } from '@/features/usuario/types'
import { Ionicons } from '@expo/vector-icons'
import { Card, Text, XStack, YStack } from 'tamagui'
import { UserAvatar } from '../UserAvatar'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export type NotificationTypeIconProps = {
  type: TipoNotificacao
}

export function NotificationTypeIcon(props: NotificationTypeIconProps) {
  switch (props.type) {
    case TipoNotificacao.INFO:
      return <Ionicons name='information-circle' size={32} color='blue' />
    case TipoNotificacao.SUCESSO:
      return <Ionicons name='checkmark-circle' size={32} color='green' />
    case TipoNotificacao.ALERTA:
      return <Ionicons name='alert-circle' size={32} color='yellow' />
    case TipoNotificacao.ERRO:
      return <Ionicons name='close-circle' size={32} color='red' />
    default:
      return <Ionicons name='information-circle' size={32} color='blue' />
  }
}

export function NotificationSender(props: { sender: Usuario }) {
  return (
    <XStack
      padding='$1'
      backgroundColor='#ECECEC'
      gap='$2'
      borderRadius={32}
      paddingRight='$2'
    >
      <UserAvatar name={props.sender.nome} size={20} />
      <Text color='black'>{props.sender.nome}</Text>
    </XStack>
  )
}

export type NotificationCardProps = {
  notification: Notificacao
}

export function NotificationCard(props: NotificationCardProps) {
  return (
    <Card
      flexDirection='row'
      padding='$2'
      backgroundColor='white'
      marginBottom='$2'
    >
      <XStack gap='$2'>
        <NotificationTypeIcon type={props.notification.tipo} />
        <YStack>
          <XStack justifyContent='space-between' flex={1}>
            <NotificationSender sender={props.notification.sender} />
            {/* <Text color='black'>
              {dayjs(props.notification.data_criacao).fromNow()}
            </Text> */}
          </XStack>
          <Text color='black' fontSize={16} fontWeight={700}>
            {props.notification.titulo}
          </Text>
          <Text color='black'>{props.notification.descricao}</Text>
        </YStack>
      </XStack>
    </Card>
  )
}
