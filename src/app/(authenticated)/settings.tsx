import { LogOut } from 'components'
import { useUser } from 'context'
import { router } from 'expo-router'
import { List, Surface } from 'react-native-paper'
import { assertDefined } from 'utils/asserts'

export default function SettingsScreen() {
  const { user } = useUser()
  assertDefined(user)

  return (
    <Surface style={{ flex: 1, padding: 8 }}>
      <List.Item
        title="Change Team"
        onPress={() => {
          router.navigate('/select-team')
        }}
        right={() => <List.Icon icon="chevron-right" />}
      />
      <List.Item title={user?.fullName} description="Name" />
      <List.Item title={user?.username} description="Username" />
      <List.Item title={user?.email} description="Email Address" />
      <LogOut />
    </Surface>
  )
}
