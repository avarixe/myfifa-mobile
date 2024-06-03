import { useAuth } from 'hooks'
import { Button } from 'react-native-paper'
import { gql, useMutation } from 'urql'

const RevokeAccessToken = gql`
  mutation revokeAccessToken($token: String!) {
    revokeAccessToken(token: $token) {
      confirmation
    }
  }
`

export function LogOut() {
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
    <Button
      onPress={signOut}
      loading={fetching}
      mode="contained"
      buttonColor="red"
      textColor="white"
    >
      Sign Out
    </Button>
  )
}
