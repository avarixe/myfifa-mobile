import { View } from "react-native"
import { Button } from '@rneui/themed'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAuth } from "context/AuthContext"

export default function SignIn() {
  const { setToken } = useAuth()

  async function signIn() {
    await setToken('abc')
    router.replace('/')
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'transparent' }}>
      <Button onPress={() => signIn()}>Sign In</Button>
      <StatusBar style="dark" />
    </View>
  );
}
