import { useState } from 'react'
import { FAB } from 'react-native-paper'

export function TeamActionsSpeedDial() {
  const [open, setOpen] = useState(false)

  return (
    <FAB.Group
      open={open}
      visible
      icon={open ? 'close' : 'shield-edit'}
      onStateChange={({ open }) => setOpen(open)}
      actions={[
        { icon: 'soccer-field', label: 'Add Match', onPress: () => {} },
        { icon: 'account-plus', label: 'Add Player', onPress: () => {} },
        { icon: 'trophy', label: 'Add Competition', onPress: () => {} }
      ]}
      style={{ position: 'absolute', bottom: 80 }}
    />
  )
}
