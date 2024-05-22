import { View } from 'react-native'
import { Text } from '@rneui/themed'
import { Stack } from 'expo-router'
import { LogOut } from 'components'
import { useUser } from 'context'

export default function Root() {
  const { user } = useUser()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text h3>Welcome Back!</Text>
      <Text>ID: {user?.id}</Text>
      <Text>Name: {user?.fullName}</Text>
      <Text>Username: {user?.username}</Text>
      <LogOut />
    </View>
  )
}
