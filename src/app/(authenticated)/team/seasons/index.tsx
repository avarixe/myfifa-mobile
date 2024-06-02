import { Stack } from 'expo-router'
import { ScrollView } from 'react-native'

export default function SeasonsScreen() {
  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerLeft: () => <></>
        }}
      />
    </ScrollView>
  )
}
