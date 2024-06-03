import { teamIdAtom } from 'atoms'
import { Link, router, useFocusEffect } from 'expo-router'
import { Surface, Text } from 'react-native-paper'
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
    <Surface
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Loading Team...</Text>
      <Link href="/select-team">Select a Team</Link>
    </Surface>
  )
}
