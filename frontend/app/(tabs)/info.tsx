import { StyleSheet, Text, View, ImageSourcePropType, Image } from 'react-native';
import UseApi from '../../hooks/useApi'
import { Card } from '../../components/Card';

type Info = {
  image: ImageSourcePropType | undefined,
  title: string,
  description: string,
  link: string,
}

const InfoData: Info[] = [
  {
    link: '/(tabs)/flood',
    image: {
      uri: '../../assets/images',
    },
    title: 'Enchentes e inundações',
    description: 'Como proceder em casos de alagamentos na sua região',
  },
  {
    link: '/(tabs)/hurricane',
    image: {
      uri: '../../assets/images',
    },
    title: 'Tornados e furacões',
    description: 'Como proceder em casos de ventos fortes na sua região',
  },
  {
    link: '/(tabs)/erosion',
    image: {
      uri: '../../assets/images',
    },
    description: 'Como proceder em casos de erosão na sua região',
    title: 'Deslizamento de terra',
  },
  {
    link: '/(tabs)/fire',
    image: {
      uri: '../../assets/images',
    },
    description: 'Incêndio',
    title: 'Como proceder em casos de incêndios na sua região',
  },
]

export default function Info() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.info}>Como se prevenir de um desastre natural?</Text>
        <Text>Aqui você encontra guias e passo-a-passo de como agir nessas situações</Text>
      </View>

      <View style={styles.cards}>
        {InfoData.map((item, index) => (
          <Card link={item.link} key={index}>
            <View style={styles.content}>
              <View>
                <Image source={item.image} style={styles.image} />

              </View>
              <View style={styles.info}>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
            </View>
          </Card>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  content: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  description: {
    fontSize: 13
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});