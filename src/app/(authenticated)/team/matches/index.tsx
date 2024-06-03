import { FlashList } from '@shopify/flash-list'
import { useTeam } from 'context'
import { router } from 'expo-router'
import { matchFragment } from 'fragments'
import { useCallback, useEffect, useRef, useState } from 'react'
import { List, Surface } from 'react-native-paper'
import { Match } from 'types'
import { gql, useQuery } from 'urql'
import { assertDefined } from 'utils/asserts'
import { toDateString } from 'utils/date'

const FetchMatches = gql`
  query FetchMatches(
    $teamId: ID!
    $pagination: PaginationAttributes
    $filters: MatchFilterAttributes
  ) {
    team(id: $teamId) {
      matchSet(pagination: $pagination, filters: $filters) {
        matches {
          ...MatchData
        }
        total
      }
    }
  }
  ${matchFragment}
`

export default function MatchesScreen() {
  const { team } = useTeam()
  assertDefined(team)

  const [pagination, setPagination] = useState({
    page: 0,
    itemsPerPage: 25,
    sortBy: 'playedOn',
    sortDesc: true
  })

  const filters = useRef({
    season: null,
    competition: null,
    stage: null,
    team: null,
    result: ['win', 'draw', 'loss']
  })

  const [{ data, fetching }] = useQuery<{
    team: { matchSet: { matches: Match[]; total: number } }
  }>({
    query: FetchMatches,
    variables: {
      teamId: team.id,
      pagination,
      filters: filters.current
    }
  })

  const [matches, setMatches] = useState<Match[]>(
    data?.team?.matchSet?.matches || []
  )

  useEffect(() => {
    if (data?.team?.matchSet?.matches) {
      setMatches(prevMatches => [...prevMatches, ...data.team.matchSet.matches])
    }
  }, [data])

  const onEndReached = useCallback(() => {
    setPagination(prevPagination => ({
      ...prevPagination,
      page: prevPagination.page + 1
    }))
  }, [setPagination])

  return (
    <Surface style={{ flex: 1 }}>
      <FlashList
        data={matches}
        refreshing={fetching}
        renderItem={({ item: match }) => {
          return (
            <List.Item
              title={`${match.home} v ${match.away}`}
              description={`${match.score} ${toDateString(match.playedOn)}`}
              onPress={() => {
                router.navigate(`/team/matches/${match.id}`)
              }}
              right={() => <List.Icon icon="chevron-right" />}
            />
          )
        }}
        estimatedItemSize={100}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
      />
    </Surface>
  )
}
