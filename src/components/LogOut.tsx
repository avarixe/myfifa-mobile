import { Button } from '@rneui/themed'
import { useAuth } from 'context'
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
      onPress={() => signOut()}
      loading={fetching}
    >
      Sign Out
    </Button>
  )
}