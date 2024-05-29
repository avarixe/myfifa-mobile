import { Icon } from '@rneui/themed'
import { useMemo } from 'react'
import { Player } from 'types'

interface PlayerStatusProps {
  player: Player
}

export function PlayerStatus({ player }: PlayerStatusProps) {
  const color = useMemo(() => {
    switch (player.status) {
      case 'Active':
        return 'lightgreen'
      case 'Loaned':
        return 'deeporange'
      case 'Injured':
        return 'magenta'
      case 'Pending':
        return 'orange'
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

  return <Icon name={icon} type="material-community" color={color} />
}
