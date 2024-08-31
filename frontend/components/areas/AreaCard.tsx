import { Area } from '@/features/area/types'
import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { Card, Text, View, XStack, YStack } from 'tamagui'
import { StatusBadge } from './StatusBadge'

export type AreaCardProps = {
  area: Area
}

export function AreaCard(props: AreaCardProps) {
  return (
    <Card
      backgroundColor='white'
      padding='$4'
      marginBottom='$2'
      borderBlockColor='$gray11'
      borderWidth={1}
    >
      <XStack gap='$4'>
        <View
          borderRadius={24}
          width={48}
          height={48}
          padding='$2'
          backgroundColor='$gray12'
          justifyContent='center'
          alignItems='center'
        >
          <Ionicons name='map-outline' size={24} />
        </View>
        <YStack>
          <XStack gap='$2'>
            <Text fontWeight='bold' color='black'>
              Nome:
            </Text>
            <Text color='black'>{props.area.nome}</Text>
          </XStack>
          <XStack gap='$2'>
            <Text fontWeight='bold' color='black'>
              Endereço:
            </Text>
            <Text color='black'>
              {props.area.poligonos.perimetro[0].latitude},{' '}
              {props.area.poligonos.perimetro[0].longitude}
            </Text>
          </XStack>
          <XStack gap='$2'>
            <Text fontWeight='bold' color='black'>
              Analisado em:
            </Text>
            <Text color='black'>
              {props.area.analisadoEm
                ? dayjs(props.area.analisadoEm).format('dd/MM/yyyy HH:mm')
                : 'Não analisado'}
            </Text>
          </XStack>
          <XStack gap='$2'>
            <Text fontWeight='bold' color='black'>
              Status:
            </Text>
            <StatusBadge status={props.area.status} />
          </XStack>
        </YStack>
      </XStack>
    </Card>
  )
}
