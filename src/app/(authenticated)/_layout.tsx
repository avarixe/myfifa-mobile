import { Redirect, Stack, useNavigation } from 'expo-router'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useAuth, UserProvider } from 'context'
import { LogOut, TeamSelector } from 'components'
import { Button } from '@rneui/themed'

export default function AppLayout() {
  const { token } = useAuth()

  const navigation =
    useNavigation<NativeStackNavigationProp<{ user: undefined }>>()

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
      <Stack
        screenOptions={{
          title: 'MyFIFA Manager',
          headerTitleAlign: 'center',
          headerRight: () => (
            <>
              <Button
                onPress={() => {
                  navigation.navigate('user')
                }}
                icon={{ name: 'account', type: 'material-community' }}
                color="transparent"
              />
              <LogOut />
            </>
          )
        }}
      />
      <TeamSelector />
      <StatusBar style="dark" />
    </UserProvider>
  )
}
