import { View } from 'react-native'
import {
  Avatar,
  BottomSheet,
  Button,
  Icon,
  ListItem,
  Text
} from '@rneui/themed'
import { gql, useQuery } from 'urql'
import { teamFragment } from 'fragments'
import { Team } from 'types'
import { FlashList } from '@shopify/flash-list'
import { getBadgeUrl } from 'utils'
import { useRecoilState } from 'recoil'
import { teamIdAtom } from 'store'
import { router } from 'expo-router'

const FetchTeams = gql`
  query FetchTeams {
    teams {
      ...TeamData
    }
  }
  ${teamFragment}
`

export default function SelectTeamScreen() {
  const [teamId, setTeamId] = useRecoilState(teamIdAtom)

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
              <ListItem bottomDivider onPress={() => onSelect(team)}>
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
                <ListItem.Chevron />
              </ListItem>
            )
          }}
          estimatedItemSize={80}
        />
      )}
    </View>
  )
}
