import { format } from 'date-fns'
import { Team } from 'types'

export * from './asserts'

export const toDateString = (
  date?: string | Date,
  dateFormat = 'yyyy MMM dd',
  fallback = ''
): string => {
  return date ? format(new Date(date), dateFormat) : fallback
}

export const getBadgeUrl = (team: Team) => {
  return `${process.env.EXPO_PUBLIC_API_URL?.replace(/\/api/, '')}/${team.badgePath}`
}
