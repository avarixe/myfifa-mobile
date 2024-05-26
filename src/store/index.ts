import { atom } from 'recoil'

export const authTokenAtom = atom<string | null>({
  key: 'authToken',
  default: null
})

export const teamIdAtom = atom<string | null>({
  key: 'teamId',
  default: null
})

export const showTeamSelectorAtom = atom<boolean>({
  key: 'showTeamSelector',
  default: false
})
