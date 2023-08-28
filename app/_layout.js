import { useState, useEffect } from 'react'
import { Stack, SplashScreen } from "expo-router";
import { Provider as AuthProvider } from '../context/auth';

import { Provider as StoreProvider, useSelector, useDispatch } from 'react-redux'
import { store } from '../store';
import * as SecureStore from 'expo-secure-store'

import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/client'

const App = () => {
  const [loading, setLoading] = useState(true)
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  useEffect(async () => {
    const storedToken = await SecureStore.getItemAsync('token')
    if (storedToken) {
      dispatch(setToken(storedToken))
    }
    setLoading(false)
    console.log('loading is now false')
  }, [])

  return (
    <AuthProvider token={token}>
      {loading ? <SplashScreen /> : <Stack />}
    </AuthProvider>
  );
}

export default function Layout() {
  <StoreProvider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StoreProvider>
}
