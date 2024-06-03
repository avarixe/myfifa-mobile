import { useTeam } from 'context'
import { playerFragment, squadFragment } from 'fragments'
import { ScrollView } from 'react-native'
import { Surface, Text } from 'react-native-paper'
import { Squad } from 'types'
import { gql, useQuery } from 'urql'
import { assertDefined } from 'utils/asserts'

const FetchSquads = gql`
  query fetchSquadsPage($teamId: ID!) {
    team(id: $teamId) {
      squads {
        ...SquadData
      }
      players {
        ...PlayerData
      }
    }
  }
  ${squadFragment}
  ${playerFragment}
`

export default function SquadsScreen() {
  const { team } = useTeam()
  assertDefined(team)

  const [{ data }] = useQuery<{ team: { squads: Squad[] } }>({
    query: FetchSquads,
    variables: { teamId: team?.id }
  })

  return (
    <Surface style={{ flex: 1 }}>
      <ScrollView>
        <Text>{JSON.stringify(data)}</Text>
      </ScrollView>
    </Surface>
  )
}
