import { createContext, useContext, useCallback, useMemo, PropsWithChildren } from "react"
import { useRecoilState } from "recoil"
import * as SecureStore from 'expo-secure-store'
import { authTokenAtom } from "store"

const AuthContext = createContext<{
  token: string | null;
  setToken: (token?: string) => Promise<void>;
  loadToken: () => Promise<void>;
}>({
  token: null,
  setToken: async () => {},
  loadToken: async () => {},
});

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props: PropsWithChildren) {
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);

  const setToken = useCallback(async (token?: string) => {
    if (token) {
      await SecureStore.setItemAsync('authToken', token)
      setAuthToken(token)
    } else {
      await SecureStore.deleteItemAsync('authToken')
      setAuthToken(null)
    }
  }, [setAuthToken])

  const loadToken = useCallback(async () => {
    const token = await SecureStore.getItemAsync('authToken')
    setAuthToken(token)
  }, [setAuthToken])

  const value = useMemo(() => ({
    token: authToken,
    setToken,
    loadToken,
  }), [authToken, setAuthToken])

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}
