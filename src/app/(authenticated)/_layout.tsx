import { Redirect, Stack, useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useAuth, UserProvider } from 'context';
import { LogOut } from 'components';
import { Button } from '@rneui/themed';

export default function AppLayout() {
  const { token } = useAuth();

  // Only require authentication within the (authenticated) group's layout as users
  // need to be able to access the (authenticated) group and sign in again.
  if (!token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  const navigation = useNavigation<NativeStackNavigationProp<{ user: undefined }>>();

  // This layout can be deferred because it's not the root layout.
  return (
    <UserProvider>
      <Stack screenOptions={{
        title: 'MyFIFA Manager',
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerRight: () => <>
          <Button
            onPress={() => { navigation.navigate('user') }}
            icon={{ name: "account", type: "material-community" }}
            color="transparent"
          />
          <LogOut />
        </>,
      }} />
      <StatusBar style="dark" />
    </UserProvider>
  )
}
