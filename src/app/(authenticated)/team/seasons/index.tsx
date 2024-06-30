import { FlashList } from '@shopify/flash-list'
import { useTeam } from 'context'
import { router, Stack } from 'expo-router'
import { competitionFragment } from 'fragments'
import groupBy from 'lodash/groupBy'
import { useCallback, useMemo } from 'react'
import { ScrollView } from 'react-native'
import { List, Surface } from 'react-native-paper'
import { Competition } from 'types'
import { gql, useQuery } from 'urql'
import { assertDefined } from 'utils/asserts'
import { getCurrentSeason, toSeasonLabel } from 'utils/team'

type CompetitionItem = Competition | string

const FetchCompetitions = gql`
  query FetchCompetitions($teamId: ID!) {
    team(id: $teamId) {
      competitions {
        ...CompetitionData
      }
    }
  }
  ${competitionFragment}
`

export default function SeasonsScreen() {
  const { team } = useTeam()
  assertDefined(team)

  const [{ data }] = useQuery<{ team: { competitions: Competition[] } }>({
    query: FetchCompetitions,
    variables: { teamId: team.id }
  })

  const itemData: CompetitionItem[] = useMemo(() => {
    const currentSeason = getCurrentSeason(team)
    const competitionsBySeason = groupBy(
      data?.team?.competitions ?? [],
      'season'
    )

    return [...Array(currentSeason).keys()]
      .reverse()
      .reduce<CompetitionItem[]>((items, season) => {
        items.push(toSeasonLabel(team, season))
        items.push(...(competitionsBySeason[season] ?? []))
        return items
      }, [])
  }, [data, team])

  const renderItem = useCallback(({ item }: { item: CompetitionItem }) => {
    if (typeof item === 'string') {
      return <List.Subheader>{item}</List.Subheader>
    } else {
      return (
        <List.Item
          title={item.name}
          description={item.champion}
          onPress={() => {
            router.navigate(`/team/competitions/${item.id}`)
          }}
          right={() => <List.Icon icon="chevron-right" />}
        />
      )
    }
  }, [])

  return (
    <Surface style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerLeft: () => <></>
        }}
      />
      <ScrollView>
        <FlashList
          data={itemData}
          renderItem={renderItem}
          getItemType={item => (typeof item === 'string' ? 'header' : 'item')}
          estimatedItemSize={71}
        />
      </ScrollView>
    </Surface>
  )
}
