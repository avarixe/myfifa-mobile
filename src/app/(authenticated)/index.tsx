import { View } from 'react-native'
import { Avatar, ListItem, Text } from '@rneui/themed'
import { gql, useQuery } from 'urql'
import { teamFragment } from 'fragments'
import { Team } from 'types'
import { FlashList } from '@shopify/flash-list'
import { getBadgeUrl } from 'utils'

const FetchTeams = gql`
  query FetchTeams {
    teams {
      ...TeamData
    }
  }
  ${teamFragment}
`

export default function Teams() {
  const [{ data, fetching }] = useQuery<{ teams: Team[] }>({
    query: FetchTeams
  })

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      {fetching ? (
        <Text>Loading Teams...</Text>
      ) : (
        <View style={{ flexGrow: 1 }}>
          <FlashList
            data={data?.teams}
            renderItem={({ item: team }) => {
              console.debug('team badge: ', team.badgePath)
              return (
                <ListItem bottomDivider>
                  <Avatar
                    source={
                      team.badgePath ? { uri: getBadgeUrl(team) } : undefined
                    }
                    icon={
                      team.badgePath
                        ? undefined
                        : {
                            name: 'shield-half-full',
                            type: 'material-community'
                          }
                    }
                  />
                  <ListItem.Content>
                    <ListItem.Title>{team.name}</ListItem.Title>
                    <ListItem.Subtitle>{team.currentlyOn}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )
            }}
            estimatedItemSize={80}
          />
        </View>
      )}
    </View>
  )
}
