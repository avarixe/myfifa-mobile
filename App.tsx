import '@tamagui/core/reset.css'
import { TamaguiProvider, createTamagui, View, Text } from 'tamagui'
import { config } from '@tamagui/config/v3'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'

const tamaguiConfig = createTamagui(config)

const App = () => {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello world!</Text>
      </View>
      <StatusBar style="auto" />
    </TamaguiProvider>
  )
}

export default App
