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
import { showTeamSelectorAtom, teamIdAtom } from 'store'

const FetchTeams = gql`
  query FetchTeams {
    teams {
      ...TeamData
    }
  }
  ${teamFragment}
`

export function TeamSelector() {
  const [teamId, setTeamId] = useRecoilState(teamIdAtom)
  const [showTeamSelector, setShowTeamSelector] =
    useRecoilState(showTeamSelectorAtom)

  const [{ data, fetching }] = useQuery<{ teams: Team[] }>({
    query: FetchTeams
  })

  const onSelect = (team: Team) => {
    setTeamId(team.id)
    onClose()
  }

  const onClose = () => {
    setShowTeamSelector(false)
  }

  return (
    <BottomSheet isVisible={showTeamSelector}>
      <View style={{ height: 500 }}>
        <ListItem>
          {teamId && (
            <Button
              icon={{ name: 'close', type: 'material-community' }}
              color="transparent"
              onPress={onClose}
            />
          )}
          <ListItem.Content>
            <ListItem.Title
              style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
            >
              Select a Team
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
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
    </BottomSheet>
  )
}
