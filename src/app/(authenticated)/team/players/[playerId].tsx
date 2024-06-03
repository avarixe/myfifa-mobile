import { useTeam } from 'context'
import { Stack, useLocalSearchParams } from 'expo-router'
import {
  contractFragment,
  injuryFragment,
  loanFragment,
  playerFragment,
  playerHistoryFragment,
  playerPerformanceStatsFragment,
  transferFragment
} from 'fragments'
import { ScrollView } from 'react-native'
import { Surface, Text } from 'react-native-paper'
import { Player } from 'types'
import { gql, useQuery } from 'urql'
import { assertDefined, assertType } from 'utils/asserts'

const FetchPlayer = gql`
  query fetchPlayerPage($teamId: ID!, $playerId: ID!) {
    player(id: $playerId) {
      ...PlayerData
      contracts {
        ...ContractData
      }
      transfers {
        ...TransferData
      }
      loans {
        ...LoanData
      }
      injuries {
        ...InjuryData
      }
      histories {
        ...PlayerHistoryData
      }
    }
    team(id: $teamId) {
      playerPerformanceStats(playerIds: [$playerId]) {
        ...PlayerPerformanceStatsData
      }
    }
  }
  ${playerFragment}
  ${contractFragment}
  ${transferFragment}
  ${loanFragment}
  ${injuryFragment}
  ${playerHistoryFragment}
  ${playerPerformanceStatsFragment}
`

export default function PlayerScreen() {
  const { team } = useTeam()
  assertDefined(team)

  const { playerId } = useLocalSearchParams()
  assertType<string>(playerId)

  const [{ data }] = useQuery<{ player: Player }>({
    query: FetchPlayer,
    variables: { teamId: team.id, playerId }
  })

  if (data) {
    const player = data.player
    return (
      <Surface style={{ flex: 1 }}>
        <Stack.Screen options={{ title: player.name }} />

        <ScrollView>
          <Text>{JSON.stringify(player)}</Text>
        </ScrollView>
      </Surface>
    )
  } else {
    return (
      <Surface style={{ flex: 1 }}>
        <Text>Loading Player...</Text>
      </Surface>
    )
  }
}
