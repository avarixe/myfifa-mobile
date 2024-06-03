import { Stack } from 'expo-router'
import { ScrollView } from 'react-native'
import { Surface } from 'react-native-paper'

export default function SeasonsScreen() {
  return (
    <Surface style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerLeft: () => <></>
        }}
      />
      <ScrollView></ScrollView>
    </Surface>
  )
}
