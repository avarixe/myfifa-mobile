import { ListItem, ListItemProps } from '@rneui/themed'
import { TouchableHighlight } from 'react-native'

export const TouchableListItem: React.FC<
  ListItemProps & {
    onPress: () => void
  }
> = ({ onPress, ...rest }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <ListItem {...rest} />
    </TouchableHighlight>
  )
}
