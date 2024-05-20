import '@tamagui/core/reset.css'
import { TamaguiProvider, createTamagui } from 'tamagui'
import { config } from '@tamagui/config/v3'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { Slot } from 'expo-router'
import { RecoilRoot } from 'recoil'
import React, { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from 'context/AuthContext'

const tamaguiConfig = createTamagui(config)

const App = () => {
  const [tokenLoaded, setTokenLoaded] = useState(false)

  const [fontLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  const { loadToken } = useAuth()
  const loadAuthToken = async () => {
    await loadToken()
    setTokenLoaded(true)
  }

  useEffect(() => {
    console.debug('App mounted')
    loadAuthToken()
  }, [])

  return fontLoaded && tokenLoaded ? <Slot /> : null
}

export default function Layout() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <TamaguiProvider config={tamaguiConfig}>
          <StatusBar style="auto" />
          <App />
        </TamaguiProvider>
      </AuthProvider>
    </RecoilRoot>
  )
}
