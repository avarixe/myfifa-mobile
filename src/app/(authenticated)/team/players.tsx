import { Avatar, ListItem, Text } from '@rneui/themed'
import { FlashList } from '@shopify/flash-list'
import { PlayerStatus } from 'components'
import { useTeam } from 'context'
import { playerFragment } from 'fragments'
import { View } from 'react-native'
import { Player } from 'types'
import { gql, useQuery } from 'urql'

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

  const [{ data, fetching }] = useQuery<{ team: { players: Player[] } }>({
    query: FetchPlayers,
    variables: { teamId: team?.id }
  })

  if (fetching) {
    return <Text>Loading Players...</Text>
  } else {
    return (
      <View style={{ height: '100%' }}>
        <FlashList
          data={data?.team?.players}
          renderItem={({ item: player }) => {
            return (
              <ListItem bottomDivider>
                <Avatar>
                  <PlayerStatus player={player} />
                </Avatar>
                <Text style={{ fontWeight: 800 }}>{player.pos}</Text>
                <ListItem.Content>
                  <ListItem.Title>{player.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )
          }}
          estimatedItemSize={80}
        />
      </View>
    )
  }
}
