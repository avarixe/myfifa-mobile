import { Avatar, ListItem, Text } from '@rneui/themed'
import { FlashList } from '@shopify/flash-list'
import { teamIdAtom } from 'atoms'
import { TouchableListItem } from 'components'
import { router } from 'expo-router'
import { teamFragment } from 'fragments'
import { View } from 'react-native'
import { useRecoilState } from 'recoil'
import { Team } from 'types'
import { gql, useQuery } from 'urql'
import { toDateString } from 'utils/date'
import { getBadgeUrl } from 'utils/team'

const FetchTeams = gql`
  query FetchTeams {
    teams {
      ...TeamData
    }
  }
  ${teamFragment}
`

export default function SelectTeamScreen() {
  const [_, setTeamId] = useRecoilState(teamIdAtom)

  const [{ data, fetching }] = useQuery<{ teams: Team[] }>({
    query: FetchTeams
  })

  const onSelect = (team: Team) => {
    setTeamId(team.id)
    onClose()
  }

  const onClose = () => {
    router.navigate('/')
  }

  return (
    <View style={{ height: '100%' }}>
      {fetching ? (
        <Text>Loading Teams...</Text>
      ) : (
        <FlashList
          data={data?.teams}
          renderItem={({ item: team }) => {
            return (
              <TouchableListItem onPress={() => onSelect(team)} bottomDivider>
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
                  <ListItem.Subtitle>
                    {toDateString(team.startedOn, 'yyyy')} -{' '}
                    {toDateString(team.currentlyOn, 'yyyy')}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </TouchableListItem>
            )
          }}
          estimatedItemSize={80}
        />
      )}
    </View>
  )
}
