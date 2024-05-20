import { Button, View } from "tamagui"
import { router } from 'expo-router'
import { useAuth } from "../context/AuthContext"

export default function SignIn() {
  const { setToken } = useAuth()

  async function signIn() {
    await setToken('abc')
    router.replace('/')
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => signIn()}>Sign In</Button>
    </View>
  );
}
