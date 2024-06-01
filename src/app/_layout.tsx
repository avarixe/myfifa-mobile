import { Slot } from 'expo-router'
import { RecoilRoot } from 'recoil'
import React, { useEffect, useState, useCallback } from 'react'
import { UrqlProvider } from 'context'
import { useAuth } from 'hooks'

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
      <UrqlProvider>
        <App />
      </UrqlProvider>
    </RecoilRoot>
  )
}
