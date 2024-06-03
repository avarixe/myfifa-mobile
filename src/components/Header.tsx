import { useRoute } from '@react-navigation/native'
import { router } from 'expo-router'
import { Appbar } from 'react-native-paper'

export const Header: React.FC<{
  title: string
  backAction?: React.ReactNode
  [key: string]: unknown
}> = ({ title, backAction, ...rest }) => {
  const route = useRoute()

  return (
    <Appbar.Header mode="center-aligned" {...rest}>
      {backAction}
      <Appbar.Content title={title} />
      {route.name !== 'settings' && (
        <Appbar.Action
          icon="cog"
          onPress={() => router.navigate('/settings')}
        />
      )}
    </Appbar.Header>
  )
}
