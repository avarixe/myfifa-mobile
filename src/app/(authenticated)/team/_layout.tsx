import { Avatar, Icon } from '@rneui/themed'
import { teamIdAtom } from 'atoms'
import {
  SettingsButton,
  TeamActionsSpeedDial,
  TeamDatePicker
} from 'components'
import { TeamProvider, useTeam } from 'context'
import { Tabs } from 'expo-router'
import { useRecoilValue } from 'recoil'
import { assertType } from 'utils'
import { getBadgeUrl } from 'utils'

const TeamTabs = () => {
  const { team } = useTeam()

  return (
    <Tabs
      screenOptions={{
        title: 'MyFIFA Manager',
        headerTitleAlign: 'center',
        headerRight: SettingsButton
      }}
    >
      <Tabs.Screen
        name="players"
        options={{
          title: 'Players',
          headerShown: false,
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
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="soccer-field" type="material-community" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="squads"
        options={{
          title: 'Squads',
          tabBarIcon: ({ color }) => (
            <Icon
              name="vector-polygon-variant"
              type="material-community"
              color={color}
            />
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
      <TeamDatePicker />
      <TeamActionsSpeedDial />
    </TeamProvider>
  )
}
