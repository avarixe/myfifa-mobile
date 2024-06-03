import { SettingsButton } from 'components'
import { UserProvider } from 'context'
import { Redirect, router } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { StatusBar } from 'expo-status-bar'
import { useAuth } from 'hooks'
import { IconButton } from 'react-native-paper'

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
          headerRight: SettingsButton,
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          swipeEdgeWidth: 0
        }}
      >
        <Drawer.Screen name="index" />
        <Drawer.Screen name="team" options={{ headerShown: false }} />
        <Drawer.Screen
          name="select-team"
          options={{
            title: 'Select a Team',
            headerRight: () => null
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            headerLeft: () => {
              if (router.canGoBack()) {
                return <IconButton onPress={router.back} icon="arrow-left" />
              } else {
                return null
              }
            },
            headerRight: () => null
          }}
        />
      </Drawer>
      <StatusBar style="light" />
    </UserProvider>
  )
}
