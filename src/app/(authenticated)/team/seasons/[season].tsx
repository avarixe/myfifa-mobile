import { Button } from '@rneui/themed'
import { useTeam } from 'context'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'
import { assertDefined } from 'utils/asserts'
import { toSeasonLabel } from 'utils/team'

export default function SeasonScreen() {
  const { team } = useTeam()
  assertDefined(team)

  const params = useLocalSearchParams<{ season: string }>()
  const season = Number(params.season)

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: `${toSeasonLabel(team, season)} Season`,
          headerLeft: () => (
            <Button
              icon={{ name: 'history', type: 'material-community' }}
              onPress={() => {
                router.navigate('/team/seasons')
              }}
              color="transparent"
            />
          )
        }}
      />
    </ScrollView>
  )
}
