import { addYears, differenceInYears, format } from 'date-fns'
import { Team } from 'types'

import { toDate } from './date'

export const getBadgeUrl = (team: Team): string => {
  return `${process.env.EXPO_PUBLIC_API_URL?.replace(/\/api/, '')}/${team.badgePath}`
}

export const toSeason = (team: Team, date: string | Date): number => {
  const startDate = toDate(team.startedOn)
  return differenceInYears(toDate(date), startDate)
}

export const toSeasonLabel = (team: Team, season: number): string => {
  const startDate = addYears(toDate(team.startedOn), season)
  const startYear = parseInt(format(startDate, 'yyyy'))
  return `${startYear} - ${startYear + 1}`
}

export const getCurrentSeason = (team: Team): number => {
  return toSeason(team, team.currentlyOn)
}

export const getStartOfCurrentSeason = (team: Team): Date => {
  return addYears(toDate(team.startedOn), getCurrentSeason(team))
}

export const getEndOfCurrentSeason = (team: Team): Date => {
  return addYears(toDate(team.startedOn), getCurrentSeason(team) + 1)
}
