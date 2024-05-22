import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth, UserProvider } from 'context';

export default function AppLayout() {
  const { token } = useAuth();

  // Only require authentication within the (authenticated) group's layout as users
  // need to be able to access the (authenticated) group and sign in again.
  if (!token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <UserProvider>
      <Stack />
      <StatusBar style="dark" />
    </UserProvider>
  )
}
