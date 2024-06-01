import { Text } from '@rneui/themed'
import { teamFragment } from 'fragments'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { Team } from 'types'
import { gql, useQuery } from 'urql'

interface TeamProviderProps extends PropsWithChildren {
  teamId: string
}

export const TeamContext = createContext<{
  team: Team | null
}>({
  team: null
})

// This hook can be used to access the user info.
export function useTeam() {
  return useContext(TeamContext)
}

const FetchTeam = gql`
  query FetchTeam($teamId: ID!) {
    team(id: $teamId) {
      ...TeamData
    }
  }
  ${teamFragment}
`

export function TeamProvider(props: TeamProviderProps) {
  const [team, setTeam] = useState<Team | null>(null)

  const [{ data }] = useQuery({
    query: FetchTeam,
    variables: { teamId: props.teamId }
  })

  useEffect(() => {
    if (data) {
      setTeam(data.team)
    }
  }, [data, setTeam])

  return (
    <TeamContext.Provider value={{ team }}>
      {team ? props.children : <Text>Loading Team...</Text>}
    </TeamContext.Provider>
  )
}
