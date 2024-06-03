import { Text } from '@rneui/themed'
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
import { matchPositions } from 'globals'
import { ScrollView } from 'react-native'
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
  console.log('matchPositions: ', matchPositions.join(' '))

  const { team } = useTeam()
  assertDefined(team)

  const { playerId } = useLocalSearchParams()
  assertType<string>(playerId)

  const [{ data }] = useQuery<{ player: Player }>({
    query: FetchPlayer,
    variables: { teamId: team.id, playerId }
  })

  if (data) {
    return (
      <ScrollView>
        <Stack.Screen options={{ title: data.player.name }} />
        <Text>{JSON.stringify(data)}</Text>
      </ScrollView>
    )
  } else {
    return <Text>Loading Player...</Text>
  }
}
