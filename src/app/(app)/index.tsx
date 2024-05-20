import { View, Text, Button } from 'tamagui'
import { useAuth } from 'context/AuthContext'

export default function Root() {
  const { setToken } = useAuth()

  const signOut = async () => {
    await setToken('')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome Back!</Text>
      <Button onPress={() => signOut()}>Sign Out</Button>
    </View>
  )
}
