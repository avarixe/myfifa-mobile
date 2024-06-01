import { Button } from '@rneui/themed'
import { SettingsButton } from 'components'
import { UserProvider } from 'context'
import { Redirect, router } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { StatusBar } from 'expo-status-bar'
import { useAuth } from 'hooks'

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
      <Drawer
        screenOptions={{
          title: 'MyFIFA Manager',
          headerTitleAlign: 'center',
          headerLeft: () => null,
          headerRight: SettingsButton
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'MyFIFA Manager'
          }}
        />
        <Drawer.Screen
          name="team"
          options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' }
          }}
        />
        <Drawer.Screen
          name="select-team"
          options={{
            drawerLabel: 'Select a Team',
            title: 'Select a Team',
            headerRight: () => null
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Settings',
            headerLeft: () => {
              if (router.canGoBack()) {
                return (
                  <Button
                    onPress={router.back}
                    icon={{ name: 'arrow-left', type: 'material-community' }}
                    color="transparent"
                  />
                )
              } else {
                return null
              }
            },
            headerRight: () => null
          }}
        />
      </Drawer>
      <StatusBar style="dark" />
    </UserProvider>
  )
}
