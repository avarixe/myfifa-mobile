import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { userFragment } from 'fragments'
import { useAuth } from 'hooks'
import React, { useState } from 'react'
import { Button, Surface, TextInput } from 'react-native-paper'
import { gql, useMutation } from 'urql'

const GrantAccessToken = gql`
  mutation grantAccessToken($username: String!, $password: String!) {
    grantAccessToken(username: $username, password: $password) {
      token
      expiresAt
      user {
        ...UserData
      }
    }
  }
  ${userFragment}
`

export default function SignInScreen() {
  const { setToken } = useAuth()

  const [{ fetching }, grantAccessToken] = useMutation(GrantAccessToken)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function signIn() {
    const { data, error } = await grantAccessToken({ username, password })
    if (error) {
      console.error(error)
    } else {
      const {
        grantAccessToken: { token }
      } = data
      await setToken(token)
      router.replace('/')
    }
  }

  return (
    <Surface
      style={{
        flex: 1,
        padding: 8,
        justifyContent: 'center'
      }}
    >
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        autoComplete="username"
        autoFocus
        autoCorrect={false}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="current-password"
        // keyboardType="visible-password"
        autoCorrect={false}
        autoCapitalize="none"
        style={{ marginTop: 8, marginBottom: 8 }}
      />
      <Button onPress={signIn} mode="contained" loading={fetching}>
        Sign In
      </Button>
      <StatusBar style="dark" />
    </Surface>
  )
}
