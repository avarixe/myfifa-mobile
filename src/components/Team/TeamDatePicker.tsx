import { FAB } from '@rneui/themed'
import { useTeam } from 'context'
import { toDateString } from 'utils/date'

export function TeamDatePicker() {
  const { team } = useTeam()

  return (
    <FAB
      icon={{ name: 'calendar', type: 'material-community', size: 20 }}
      title={toDateString(team?.currentlyOn)}
      color="rgba(255, 255, 255, 0.9)"
      titleStyle={{ color: 'black' }}
      upperCase
      style={{ position: 'absolute', bottom: 64, left: 16 }}
    />
  )
}
