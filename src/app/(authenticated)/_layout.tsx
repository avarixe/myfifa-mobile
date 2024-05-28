import { Redirect, router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAuth, UserProvider } from 'context'
import { LogOut } from 'components'
import { Button } from '@rneui/themed'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'

export default function AppLayout() {
  const { token } = useAuth()

  // Only require authentication within the (authenticated) group's layout as users
  // need to be able to access the (authenticated) group and sign in again.
  if (!token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            title: 'MyFIFA Manager',
            headerTitleAlign: 'center',
            headerRight: () => <LogOut />
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerItemStyle: { display: 'none' }
            }}
          />
          <Drawer.Screen
            name="team"
            options={{
              drawerLabel: 'Team'
            }}
          />
          <Drawer.Screen
            name="select-team"
            options={{
              drawerLabel: 'Select a Team',
              title: 'Select a Team'
            }}
          />
          <Drawer.Screen
            name="user"
            options={{
              drawerLabel: 'User',
              title: 'User'
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
      <StatusBar style="dark" />
    </UserProvider>
  )
}
