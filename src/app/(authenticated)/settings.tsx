import { ListItem } from '@rneui/themed'
import { LogOut, TouchableListItem } from 'components'
import { useUser } from 'context'
import { router } from 'expo-router'
import { View } from 'react-native'

export default function SettingsScreen() {
  const { user } = useUser()

  return (
    <View style={{ padding: 4 }}>
      <TouchableListItem
        bottomDivider
        onPress={() => {
          router.navigate('/select-team')
        }}
      >
        <ListItem.Content>
          <ListItem.Title>Change Team</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </TouchableListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{user?.fullName}</ListItem.Title>
          <ListItem.Subtitle>Name</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{user?.username}</ListItem.Title>
          <ListItem.Subtitle>Username</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{user?.email}</ListItem.Title>
          <ListItem.Subtitle>Email Address</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <LogOut />
    </View>
  )
}
