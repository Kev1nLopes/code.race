import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import UseApi from '../../hooks/useApi'
import { Card } from '../../components/Card';
import { useEffect, useState } from "react";

type Notifications = {
  image: ImageSourcePropType | undefined,
  title: string,
  description: string,
  sender: string,
}

export default function Notifications() {
  const {api} = UseApi();
  const [notifications, setNotifications] = useState<any[]>([])
  
  useEffect(()=>{
    api.get("/notificacoes").then((res)=>{
      setNotifications(res.data);
    })
  }, [])

  return (
    <View>
      {notifications.map((item) => {
        return (
          <Card link="">
            <View style={styles.content}>
              <View>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.info}>
                <Text>{item.sender}</Text>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
            </View>
          </Card>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
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
  sender: {
    backgroundColor: '#ECECEC',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  description: {
    fontSize: 13
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});