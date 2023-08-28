import { Text, View } from "react-native";
import { useDispatch } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import { setToken } from '../../store/auth'

export default function Login() {
  const dispatch = useDispatch()

  async function login() {
    const token = 'abc'
    await SecureStore.setItemAsync('token', token)
    dispatch(setToken(token))
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => login()}>Log In</Text>
    </View>
  );
}
