import { authTokenAtom } from 'atoms'
import { useRecoilState } from 'recoil'
import * as SecureStore from 'expo-secure-store'
import { useCallback } from 'react'

export const useAuth = () => {
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom)

  const setToken = useCallback(
    async (token?: string) => {
      if (token) {
        await SecureStore.setItemAsync('authToken', token)
        setAuthToken(token)
      } else {
        await SecureStore.deleteItemAsync('authToken')
        setAuthToken(null)
      }
    },
    [setAuthToken]
  )

  const loadToken = useCallback(async () => {
    const token = await SecureStore.getItemAsync('authToken')
    setAuthToken(token)
  }, [setAuthToken])

  return {
    token: authToken,
    setToken,
    loadToken
  }
}
