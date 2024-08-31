import { router } from 'expo-router'
import { Button, Text, View } from 'tamagui'

export default function HomeScreen() {
  function navigateToMap() {
    router.push('/map')
  }

  return (
    <View padding='$6'>
      <Text color='black' fontSize={20}>
        O SaferNow é um aplicativo que ajuda você a se manter conectado e seguro
        em ocasiões de desastres naturais.
      </Text>
      <View>
        <Text color='black' fontSize={20}>
          Procure no mapa pelo abrigo mais próximo, áreas de risco e seguras, e
          receba alertas em tempo real de ocorrências eminentes.
        </Text>
      </View>
      <Button marginTop='$8' onPress={navigateToMap}>
        Ir para o Mapa
      </Button>
    </View>
  )
}
