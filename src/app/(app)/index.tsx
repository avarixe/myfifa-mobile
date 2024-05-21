import { View } from 'react-native'
import { Button, Text } from '@rneui/themed'
import { Stack } from 'expo-router'
import { useAuth } from 'context/AuthContext'
import { gql, useMutation } from 'urql'

const RevokeAccessToken = gql`
  mutation revokeAccessToken($token: String!) {
    revokeAccessToken(token: $token) {
      confirmation
    }
  }
`

export default function Root() {
  const { token, setToken } = useAuth()

  const [{ fetching }, revokeAccessToken] = useMutation(RevokeAccessToken)

  const signOut = async () => {
    const { error } = await revokeAccessToken({ token })
    if (error) {
      console.error(error)
    } else {
      await setToken('')
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text h3>Welcome Back!</Text>
      <Button
        onPress={() => signOut()}
        loading={fetching}
      >
        Sign Out
      </Button>
    </View>
  )
}
