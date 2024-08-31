import { StatusArea } from '@/features/area/types'
import { Text, XStack } from 'tamagui'

export type StatusBadgeProps = {
  status: StatusArea
}

export type BadgeProps = {
  mutedColor: string
  nameColor?: string
  color: string
  backgroundColor: string
  text: string
}

export function Badge(props: BadgeProps) {
  return (
    <XStack
      backgroundColor={props.mutedColor}
      borderRadius={12}
      alignItems='center'
      paddingRight='$2'
      paddingLeft={props.nameColor ? '0' : '$2'}
      gap='$2'
    >
      {props.nameColor && (
        <Text
          paddingInline='$2'
          paddingBlock='$1'
          backgroundColor={props.backgroundColor}
          color={props.color}
          fontWeight={800}
          borderRadius={12}
        >
          {props.nameColor}
        </Text>
      )}
      <Text color={props.color}>{props.text}</Text>
    </XStack>
  )
}

export function StatusBadge(props: StatusBadgeProps) {
  switch (props.status) {
    case StatusArea.EM_RISCO:
      return (
        <Badge
          color='white'
          backgroundColor='#F44336'
          text='EM RISCO'
          mutedColor='#F4433680'
          nameColor='VERMELHO'
        />
      )
    case StatusArea.EM_ANALISE:
      return (
        <Badge
          color='black'
          backgroundColor='#e2e2e2'
          text='EM ANÁLISE'
          mutedColor='#e2e2e280'
        />
      )
    case StatusArea.EM_ALERTA:
      return (
        <Badge
          color='white'
          backgroundColor='#FF9800'
          text='EM ALERTA'
          mutedColor='#FF980080'
          nameColor='LARANJA'
        />
      )
    case StatusArea.EM_PERIGO:
      return (
        <Badge
          color='white'
          backgroundColor='#FF5722'
          text='EM PERIGO'
          mutedColor='#FF572280'
          nameColor='VERMELHO'
        />
      )
    case StatusArea.SEGURADA:
      return (
        <Badge
          color='white'
          backgroundColor='#2196F3'
          text='SEGURADA'
          mutedColor='#2196F380'
          nameColor='AZUL'
        />
      )
    case StatusArea.SEM_RISCO:
      return (
        <Badge
          color='black'
          backgroundColor='#E5E5E5'
          text='SEM RISCO'
          mutedColor='#E5E5E580'
          nameColor='VERDE'
        />
      )
  }
}
