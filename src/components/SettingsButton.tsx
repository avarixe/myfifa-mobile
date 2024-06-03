import { router } from 'expo-router'
import { IconButton } from 'react-native-paper'

export const SettingsButton = () => (
  <IconButton onPress={() => router.navigate('/settings')} icon="cog" />
)
