import { useAuth } from 'hooks'
import { PropsWithChildren, useMemo } from 'react'
import { cacheExchange, Client, fetchExchange, Provider } from 'urql'

export const UrqlProvider = (props: PropsWithChildren) => {
  const { token } = useAuth()
  const client = useMemo(
    () =>
      new Client({
        url: `${process.env.EXPO_PUBLIC_API_URL}/graphql`,
        exchanges: [cacheExchange, fetchExchange],
        requestPolicy: 'network-only',
        fetchOptions: () => ({
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }),
    [token]
  )

  return <Provider value={client}>{props.children}</Provider>
}
