import { CapView } from 'components'
import { Stack, useLocalSearchParams } from 'expo-router'
import {
  bookingFragment,
  capFragment,
  goalFragment,
  matchFragment,
  penaltyShootoutFragment
} from 'fragments'
import { ScrollView, View } from 'react-native'
import { Surface, Text } from 'react-native-paper'
import { Match } from 'types'
import { gql, useQuery } from 'urql'
import { assertType } from 'utils/asserts'
import { toDateString } from 'utils/date'

const FetchMatch = gql`
  query fetchMatchPage($matchId: ID!) {
    match(id: $matchId) {
      ...MatchData
      caps {
        ...CapData
      }
      goals {
        ...GoalData
      }
      bookings {
        ...BookingData
      }
      penaltyShootout {
        ...PenaltyShootoutData
      }
      previousMatch {
        id
      }
      nextMatch {
        id
      }
    }
  }
  ${matchFragment}
  ${capFragment}
  ${goalFragment}
  ${bookingFragment}
  ${penaltyShootoutFragment}
`

export default function MatchScreen() {
  const { matchId } = useLocalSearchParams()
  assertType<string>(matchId)

  const [{ data }] = useQuery<{ match: Match }>({
    query: FetchMatch,
    variables: { matchId }
  })

  if (data) {
    const match = data.match
    return (
      <Surface style={{ flex: 1 }}>
        <Stack.Screen options={{ title: toDateString(match.playedOn) }} />
        <ScrollView>
          <Text>
            {match.home} v {match.away}
          </Text>
          <Text>{match.score}</Text>

          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {match.caps.map(cap => (
              <CapView key={cap.id} match={match} cap={cap} />
            ))}
          </View>

          <Text>{JSON.stringify(match)}</Text>
        </ScrollView>
      </Surface>
    )
  } else {
    return (
      <Surface style={{ flex: 1 }}>
        <Text>Loading Match...</Text>
      </Surface>
    )
  }
}
