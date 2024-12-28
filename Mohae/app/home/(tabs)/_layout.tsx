import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#090A0A',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.1)',
          height: 64,
          paddingBottom: 16,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 4,
          fontFamily: 'BMJUA',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name='archive'
        options={{
          title: '기록',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'archive' : 'archive-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name='add'
        options={{
          title: '',
          tabBarIcon: () => <Ionicons name='add-circle' color='#FFC12D' size={30} />,
          tabBarIconStyle: {
            overflow: 'visible',
          },
        }}
      />

      <Tabs.Screen
        name='friends'
        options={{
          title: '친구',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          title: '설정',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  )
}
