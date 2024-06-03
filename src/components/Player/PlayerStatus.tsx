import { useMemo } from 'react'
import { Icon } from 'react-native-paper'
import { Player } from 'types'

export const PlayerStatus: React.FC<{ player: Player }> = ({ player }) => {
  const color = useMemo(() => {
    switch (player.status) {
      case 'Active':
        return 'lightgreen'
      case 'Loaned':
        return 'orange'
      case 'Injured':
        return 'red'
      case 'Pending':
        return 'blue'
      default:
        return undefined
    }
  }, [player.status])

  const icon = useMemo(() => {
    switch (player.status) {
      case 'Active':
        return 'account-check'
      case 'Loaned':
        return 'transit-transfer'
      case 'Injured':
        return 'hospital'
      case 'Pending':
        return 'lock-clock'
      default:
        return 'minus'
    }
  }, [player.status])

  return <Icon source={icon} size={24} color={color} />
}
