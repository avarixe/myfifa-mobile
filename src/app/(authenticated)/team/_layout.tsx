import { Avatar, Icon } from '@rneui/themed'
import { teamIdAtom } from 'atoms'
import { SettingsButton } from 'components'
import { TeamActionsSpeedDial, TeamDatePicker } from 'components/Team'
import { TeamProvider, useTeam } from 'context'
import { Tabs } from 'expo-router'
import { useRecoilValue } from 'recoil'
import { assertDefined } from 'utils/asserts'
import { getBadgeUrl, getCurrentSeason } from 'utils/team'

const TeamTabs = () => {
  const { team } = useTeam()
  assertDefined(team)

  return (
    <Tabs
      screenOptions={{
        title: 'MyFIFA Manager',
        headerShown: false,
        headerTitleAlign: 'center',
        headerRight: SettingsButton
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
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            navigation.navigate('players', { screen: 'index' })
          }
        })}
      />
      <Tabs.Screen
        name="seasons"
        options={{
          title: 'Season',
          tabBarIcon: ({ color }) => (
            <Icon name="trophy" type="material-community" color={color} />
          )
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            const currentSeason = getCurrentSeason(team)
            navigation.navigate('seasons', {
              screen: '[season]',
              params: { season: currentSeason }
            })
          }
        })}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: team?.name ?? 'Team',
          headerShown: true,
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
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            navigation.navigate('matches', { screen: 'index' })
          }
        })}
      />
      <Tabs.Screen
        name="squads"
        options={{
          title: 'Squads',
          headerShown: true,
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
  assertDefined(teamId)

  return (
    <TeamProvider teamId={teamId}>
      <TeamTabs />
      <TeamDatePicker />
      <TeamActionsSpeedDial />
    </TeamProvider>
  )
}
