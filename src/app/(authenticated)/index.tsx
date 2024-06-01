import { Text } from '@rneui/themed'
import { teamIdAtom } from 'atoms'
import { Link, router, useFocusEffect } from 'expo-router'
import { View } from 'react-native'
import { useRecoilValue } from 'recoil'

export default function EntryScreen() {
  const teamId = useRecoilValue(teamIdAtom)

  useFocusEffect(() => {
    if (teamId) {
      // TOOD: Load Team

      router.navigate('/team')
    } else {
      router.navigate('/select-team')
    }
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Loading Team...</Text>
      <Link href="/select-team">Select a Team</Link>
    </View>
  )
}
