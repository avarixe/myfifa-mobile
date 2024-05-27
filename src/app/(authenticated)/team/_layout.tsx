import { Icon } from '@rneui/themed'
import { TeamProvider, useTeam } from 'context'
import { Tabs } from 'expo-router'
import { useRecoilValue } from 'recoil'
import { teamIdAtom } from 'store'

export default function TeamLayout() {
  const teamId = useRecoilValue(teamIdAtom) as string

  const { team } = useTeam()

  return (
    <TeamProvider teamId={teamId}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="players"
          options={{
            title: 'Players',
            tabBarIcon: () => <Icon name="run" type="material-community" />
          }}
        />
        <Tabs.Screen
          name="season"
          options={{
            title: 'Season',
            tabBarIcon: () => <Icon name="calendar" type="material-community" />
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: team?.name ?? 'Team',
            tabBarIcon: () => (
              <Icon name="shield-half-full" type="material-community" />
            )
          }}
        />
        <Tabs.Screen
          name="matches"
          options={{
            title: 'Matches',
            tabBarIcon: () => (
              <Icon name="soccer-field" type="material-community" />
            )
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            title: 'Create',
            tabBarIcon: () => <Icon name="plus" type="material-community" />
          }}
        />
      </Tabs>
    </TeamProvider>
  )
}
