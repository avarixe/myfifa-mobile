import { View } from 'react-native'
import { Text } from '@rneui/themed'
import { useRecoilState, useRecoilValue } from 'recoil'
import { showTeamSelectorAtom, teamIdAtom } from 'store'
import { TeamProvider } from 'context'
import { Stack } from 'expo-router'
import { useEffect } from 'react'

export default function Teams() {
  const teamId = useRecoilValue(teamIdAtom)
  const [_, setShowTeamSelector] = useRecoilState(showTeamSelectorAtom)

  useEffect(() => {
    if (!teamId) {
      setShowTeamSelector(true)
    }
  }, [teamId])

  if (!teamId) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No Team Selected</Text>
      </View>
    )
  }

  return (
    <TeamProvider teamId={teamId}>
      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{ headerShown: false }}
      />
    </TeamProvider>
  )
}
