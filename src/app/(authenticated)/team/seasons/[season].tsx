import { useTeam } from 'context'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'
import { IconButton, Surface } from 'react-native-paper'
import { assertDefined } from 'utils/asserts'
import { toSeasonLabel } from 'utils/team'

export default function SeasonScreen() {
  const { team } = useTeam()
  assertDefined(team)

  const params = useLocalSearchParams<{ season: string }>()
  const season = Number(params.season)

  return (
    <Surface style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: `${toSeasonLabel(team, season)} Season`,
          headerLeft: () => (
            <IconButton
              icon="history"
              onPress={() => {
                router.navigate('/team/seasons')
              }}
            />
          )
        }}
      />
      <ScrollView></ScrollView>
    </Surface>
  )
}
