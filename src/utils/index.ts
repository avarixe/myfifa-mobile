import { Team } from 'types'

export * from './asserts'

export const getBadgeUrl = (team: Team) => {
  return `${process.env.EXPO_PUBLIC_API_URL?.replace(/\/api/, '')}/${team.badgePath}`
}
