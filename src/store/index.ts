import { atom } from 'recoil'

export const authTokenAtom = atom<string | null>({
  key: 'authToken',
  default: null
})
