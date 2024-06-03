import { FlashList } from '@shopify/flash-list'
import { PlayerStatus } from 'components/Player'
import { useTeam } from 'context'
import { router } from 'expo-router'
import { playerFragment } from 'fragments'
import { List, Surface, Text } from 'react-native-paper'
import { Player } from 'types'
import { gql, useQuery } from 'urql'
import { assertDefined } from 'utils/asserts'

const FetchPlayers = gql`
  query FetchPlayers($teamId: ID!) {
    team(id: $teamId) {
      players {
        ...PlayerData
      }
    }
  }
  ${playerFragment}
`

export default function PlayersScreen() {
  const { team } = useTeam()
  assertDefined(team)

  const [{ data }] = useQuery<{ team: { players: Player[] } }>({
    query: FetchPlayers,
    variables: { teamId: team.id }
  })

  if (data) {
    return (
      <Surface style={{ flex: 1 }}>
        <FlashList
          data={data.team.players}
          renderItem={({ item: player }) => {
            return (
              <List.Item
                title={player.name}
                description={player.pos}
                onPress={() => {
                  router.navigate(`/team/players/${player.id}`)
                }}
                left={() => <PlayerStatus player={player} />}
                right={() => <List.Icon icon="chevron-right" />}
              />
            )
          }}
          estimatedItemSize={80}
        />
      </Surface>
    )
  } else {
    return (
      <Surface style={{ flex: 1 }}>
        <Text>Loading Players...</Text>
      </Surface>
    )
  }
}
