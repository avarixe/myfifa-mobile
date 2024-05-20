import { View } from 'react-native'
import { Button, Text } from '@rneui/themed'
import { Stack } from 'expo-router'
import { useAuth } from 'context/AuthContext'

export default function Root() {
  const { setToken } = useAuth()

  const signOut = async () => {
    await setToken('')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text h3>Welcome Back!</Text>
      <Button onPress={() => signOut()}>Sign Out</Button>
    </View>
  )
}
