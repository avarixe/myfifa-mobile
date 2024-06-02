import { SettingsButton } from 'components'
import { Stack } from 'expo-router'

export default function SeasonsLayout() {
  return (
    <Stack
      screenOptions={{
        title: 'Seasons',
        headerTitleAlign: 'center',
        headerRight: SettingsButton
      }}
    />
  )
}
