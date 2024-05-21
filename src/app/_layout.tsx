import { Slot } from 'expo-router'
import { RecoilRoot } from 'recoil'
import React, { useEffect, useState, useCallback } from 'react'
import { AuthProvider, useAuth } from 'context/AuthContext'
import { UrqlProvider } from 'context/UrqlContext'

const App = () => {
  const [tokenLoaded, setTokenLoaded] = useState(false)

  const { loadToken } = useAuth()
  const loadAuthToken = useCallback(async () => {
    await loadToken()
    setTokenLoaded(true)
  }, [loadToken, setTokenLoaded])

  useEffect(() => {
    loadAuthToken()
  }, [loadAuthToken])

  return tokenLoaded ? <Slot /> : null
}

export default function Layout() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <UrqlProvider>
          <App />
        </UrqlProvider>
      </AuthProvider>
    </RecoilRoot>
  )
}
