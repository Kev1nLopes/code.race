import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import {router, Href} from 'expo-router';

export function Card({ children, link }: PropsWithChildren & { link: string }) {
  return (
    <View style={styles.card} onPointerDown={() => {router.navigate(link as Href<string | object>)}}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 3,
    borderStyle: 'solid',
    borderColor: '#cecece',
    borderRadius: 6,
  },
});
