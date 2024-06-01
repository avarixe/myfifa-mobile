import { SettingsButton } from 'components'
import { Stack } from 'expo-router'

export default function PlayersLayout() {
  return (
    <Stack
      screenOptions={{
        title: 'Players',
        headerTitleAlign: 'center',
        headerRight: SettingsButton
      }}
    />
  )
}
