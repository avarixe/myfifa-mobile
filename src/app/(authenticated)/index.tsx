import { View } from 'react-native'
import { Text } from '@rneui/themed'
import { useRecoilValue } from 'recoil'
import { teamIdAtom } from 'store'
import { useEffect } from 'react'
import { Link, router } from 'expo-router'

export default function EntryScreen() {
  const teamId = useRecoilValue(teamIdAtom)

  useEffect(() => {
    if (teamId) {
      // TOOD: Load Team

      router.navigate('/team')
    } else {
      router.navigate('/select-team')
    }
  }, [teamId])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Loading Team...</Text>
      <Link href="/select-team">Select a Team</Link>
    </View>
  )
}
