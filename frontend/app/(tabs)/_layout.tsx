import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Text, YStack } from 'tamagui'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: true,
        tabBarHideOnKeyboard: true,
        headerLeft: () => (
          <YStack marginBlock='$4' paddingInline='$4' borderRightWidth={1}>
            <Text color='black' fontFamily='Bitter' fontWeight={600}>
              Safer
            </Text>
            <Text color='black' fontFamily='Bitter' fontWeight={600}>
              Now
            </Text>
          </YStack>
        ),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='map'
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='info'
        options={{
          title: 'Informações',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'code-slash' : 'code-slash-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='notification'
        options={{
          title: 'Notificações',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'notifications' : 'notifications-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
