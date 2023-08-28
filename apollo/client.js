import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// create httpLink and authLink to pass authentication token
const httpLink = createHttpLink({
  uri: 'https://myfifa.jooni.me/graphql'
})

const authLink = setContext(async (_, { headers }) => {
  const storedToken = await SecureStore.getItemAsync('token')
  return {
    headers: {
      ...headers,
      authorization: storedToken ? `Bearer ${storedToken}` : ''
    }
  }
})

// Initialite Apollo Client
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
