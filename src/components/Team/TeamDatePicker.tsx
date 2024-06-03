import { useTeam } from 'context'
import { FAB } from 'react-native-paper'
import { toDateString } from 'utils/date'

export function TeamDatePicker() {
  const { team } = useTeam()

  return (
    <FAB
      label={toDateString(team?.currentlyOn).toUpperCase()}
      style={{ position: 'absolute', bottom: 96, left: 16 }}
    />
  )
}
