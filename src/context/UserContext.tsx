import { userFragment } from 'fragments'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { Surface, Text } from 'react-native-paper'
import { User } from 'types'
import { gql, useQuery } from 'urql'

export const UserContext = createContext<{
  user: User | null
}>({
  user: null
})

// This hook can be used to access the user info.
export function useUser() {
  return useContext(UserContext)
}

const FetchUser = gql`
  query FetchUser {
    user {
      ...UserData
    }
  }
  ${userFragment}
`

export function UserProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)

  const [{ data }] = useQuery({ query: FetchUser })

  useEffect(() => {
    if (data) {
      setUser(data.user)
    }
  }, [data, setUser])

  return (
    <UserContext.Provider value={{ user }}>
      {user ? (
        props.children
      ) : (
        <Surface style={{ flex: 1 }}>
          <Text>Loading User...</Text>
        </Surface>
      )}
    </UserContext.Provider>
  )
}
