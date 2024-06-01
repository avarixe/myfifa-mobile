import { SpeedDial } from '@rneui/themed'
import { useState } from 'react'

export function TeamActionsSpeedDial() {
  const [isOpen, setIsOpen] = useState(false)

  const color = isOpen ? 'white' : 'rgba(255, 255, 255, 0.9)'

  return (
    <SpeedDial
      isOpen={isOpen}
      icon={{ name: 'shield-edit', type: 'material-community' }}
      openIcon={{ name: 'close', type: 'material-community' }}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      color={color}
      style={{ bottom: 48 }}
    >
      <SpeedDial.Action
        icon={{ name: 'trophy', type: 'material-community' }}
        title="Add Competition"
        onPress={() => {}}
        color={color}
      />
      <SpeedDial.Action
        icon={{ name: 'account-plus', type: 'material-community' }}
        title="Add Players"
        onPress={() => {}}
        color={color}
      />
      <SpeedDial.Action
        icon={{ name: 'soccer-field', type: 'material-community' }}
        title="Add Match"
        onPress={() => {}}
        color={color}
      />
    </SpeedDial>
  )
}
