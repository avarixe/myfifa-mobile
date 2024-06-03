import { SettingsButton } from 'components'
import { Stack } from 'expo-router'

export default function MatchesLayout() {
  return (
    <Stack
      screenOptions={{
        title: 'Matches',
        headerTitleAlign: 'center',
        headerRight: SettingsButton,
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff'
      }}
    />
  )
}
