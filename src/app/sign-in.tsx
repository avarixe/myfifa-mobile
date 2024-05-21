import React, { useState } from 'react'
import { View } from "react-native"
import { Button, Input } from '@rneui/themed'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAuth } from "context/AuthContext"
import { userFragment } from 'fragments'
import { useMutation, gql } from 'urql'

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

export default function SignIn() {
  const { setToken } = useAuth()

  const [{ fetching }, grantAccessToken] = useMutation(GrantAccessToken)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function signIn() {
    const { data, error } = await grantAccessToken({ username, password })
    if (error) {
      console.error(error)
    } else {
      const { grantAccessToken: { token, user } } = data
      console.debug('User: ', user)
      await setToken(token)
      router.replace('/')
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'transparent' }}>
      <Input
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoComplete="username"
        autoFocus
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        autoComplete="current-password"
        // keyboardType="visible-password"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Button
        onPress={() => signIn()}
        loading={fetching}
      >
        Sign In
      </Button>
      <StatusBar style="dark" />
    </View>
  );
}
