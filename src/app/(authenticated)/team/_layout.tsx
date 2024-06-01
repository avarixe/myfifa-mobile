import { Avatar, Button, Icon } from '@rneui/themed'
import { assertType } from 'utils'
import { TeamProvider, useTeam } from 'context'
import { router, Tabs } from 'expo-router'
import { useRecoilValue } from 'recoil'
import { teamIdAtom } from 'atoms'
import { getBadgeUrl } from 'utils'

const TeamTabs = () => {
  const { team } = useTeam()

  return (
    <Tabs
      screenOptions={{
        title: 'MyFIFA Manager',
        headerTitleAlign: 'center',
        headerRight: () => (
          <Button
            onPress={() => router.navigate('/settings')}
            icon={{ name: 'cog', type: 'material-community' }}
            color="transparent"
          />
        )
      }}
    >
      <Tabs.Screen
        name="players"
        options={{
          title: 'Players',
          tabBarIcon: ({ color }) => (
            <Icon name="run" type="material-community" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="season"
        options={{
          title: 'Season',
          tabBarIcon: ({ color }) => (
            <Icon name="calendar" type="material-community" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: team?.name ?? 'Team',
          tabBarIcon: ({ color }) => (
            <Avatar
              source={team?.badgePath ? { uri: getBadgeUrl(team) } : undefined}
              icon={
                team?.badgePath
                  ? undefined
                  : {
                      name: 'shield-half-full',
                      type: 'material-community',
                      color
                    }
              }
            />
          )
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color }) => (
            <Icon name="soccer-field" type="material-community" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => (
            <Icon name="plus" type="material-community" color={color} />
          )
        }}
      />
    </Tabs>
  )
}

export default function TeamLayout() {
  const teamId = useRecoilValue(teamIdAtom)
  assertType<string>(teamId)

  return (
    <TeamProvider teamId={teamId}>
      <TeamTabs />
    </TeamProvider>
  )
}
