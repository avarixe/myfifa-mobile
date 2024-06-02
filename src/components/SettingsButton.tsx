import { Button } from '@rneui/themed'
import { router } from 'expo-router'

export const SettingsButton = () => (
  <Button
    onPress={() => router.navigate('/settings')}
    icon={{ name: 'cog', type: 'material-community' }}
    color="transparent"
  />
)
