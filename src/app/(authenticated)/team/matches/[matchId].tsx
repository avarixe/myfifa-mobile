import { Text } from '@rneui/themed'
import { Stack, useLocalSearchParams } from 'expo-router'
import {
  bookingFragment,
  capFragment,
  goalFragment,
  matchFragment,
  penaltyShootoutFragment
} from 'fragments'
import { ScrollView } from 'react-native'
import { Match } from 'types'
import { gql, useQuery } from 'urql'
import { assertType } from 'utils/asserts'

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
    return (
      <ScrollView>
        <Stack.Screen
          options={{ title: `${data.match.home} v ${data.match.away}` }}
        />
        <Text>{JSON.stringify(data)}</Text>
      </ScrollView>
    )
  } else {
    return <Text>Loading Match...</Text>
  }
}
