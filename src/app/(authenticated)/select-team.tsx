import { FlashList } from '@shopify/flash-list'
import { teamIdAtom } from 'atoms'
import { router } from 'expo-router'
import { teamFragment } from 'fragments'
import { Avatar, List, Surface, Text } from 'react-native-paper'
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
    <Surface style={{ flex: 1 }}>
      {fetching ? (
        <Surface style={{ flex: 1 }}>
          <Text>Loading Teams...</Text>
        </Surface>
      ) : (
        <FlashList
          data={data?.teams}
          renderItem={({ item: team }) => {
            return (
              <List.Item
                onPress={() => onSelect(team)}
                title={team.name}
                description={`${toDateString(team.startedOn, 'yyyy')} - ${toDateString(team.currentlyOn, 'yyyy')}`}
                left={() =>
                  team.badgePath ? (
                    <Avatar.Image
                      source={{ uri: getBadgeUrl(team) }}
                      size={48}
                      style={{ backgroundColor: 'transparent' }}
                    />
                  ) : (
                    <Avatar.Icon icon="shield-half-full" />
                  )
                }
                right={() => <List.Icon icon="chevron-right" />}
              />
            )
          }}
          estimatedItemSize={80}
        />
      )}
    </Surface>
  )
}
