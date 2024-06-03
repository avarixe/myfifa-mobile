import { CommonActions } from '@react-navigation/native'
import { teamIdAtom } from 'atoms'
import { SettingsButton } from 'components'
import { TeamActionsSpeedDial, TeamDatePicker } from 'components/Team'
import { TeamProvider, useTeam } from 'context'
import { Tabs } from 'expo-router'
import { Avatar, BottomNavigation, Icon } from 'react-native-paper'
import { useRecoilValue } from 'recoil'
import { assertDefined, assertType } from 'utils/asserts'
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
        headerRight: SettingsButton,
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff'
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            })

            if (event.defaultPrevented) {
              preventDefault()
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key
              })
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key]
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 })
            }

            return null
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key]
            assertType<string | undefined>(options.tabBarLabel)
            return options.tabBarLabel ?? options.title ?? route.name
          }}
        />
      )}
    >
      <Tabs.Screen
        name="players"
        options={{
          title: 'Players',
          tabBarIcon: ({ color }) => (
            <Icon source="run" size={24} color={color} />
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
            <Icon source="trophy" size={24} color={color} />
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
          tabBarIcon: ({ color }) =>
            team?.badgePath ? (
              <Avatar.Image
                source={{ uri: getBadgeUrl(team) }}
                size={24}
                style={{ backgroundColor: 'transparent' }}
              />
            ) : (
              <Avatar.Icon icon="shield-half-full" color={color} />
            )
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color }) => (
            <Icon source="soccer-field" size={24} color={color} />
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
            <Icon source="vector-polygon-variant" size={24} color={color} />
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
