import { Icon } from '@rneui/themed'
import { useTeam } from 'context'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  const { team } = useTeam()

  return (
    <Tabs>
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
        name="dashboard"
        options={{
          title: team?.name,
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
  )
}
