import { View } from 'react-native'
import { Text } from '@rneui/themed'
import { useUser } from 'context'

export default function UserScreen() {
  const { user } = useUser()

  return (
    <View style={{ padding: 4 }}>
      <Text>Name: {user?.fullName}</Text>
      <Text>Username: {user?.username}</Text>
      <Text>Email Address: {user?.email}</Text>
    </View>
  )
}
