import { UrqlProvider } from 'context'
import { Slot } from 'expo-router'
import { useAuth } from 'hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'

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
