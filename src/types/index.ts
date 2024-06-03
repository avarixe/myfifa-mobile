import { MatchPosition } from 'globals'

interface Model {
  id: string
  createdAt: string
}

interface NamedModel extends Model {
  name: string
}

interface TeamModel extends Model {
  teamId: string
}

interface PlayerModel extends Model {
  playerId: string
  player: Player
}

interface MatchModel extends Model {
  matchId: string
  match: Match
}

export interface User extends Model {
  fullName: string
  username: string
  email: string
}

export interface Team extends NamedModel {
  previousId?: string
  managerName: string
  game: string
  startedOn: string
  currentlyOn: string
  currency: string
  badgePath?: string
}

export interface Player extends TeamModel, NamedModel {
  pos: string // TODO: enum
  nationality: string
  ovr: number
  value: number
  kitNo?: number
  status: string | null
}

export interface Match extends TeamModel {
  home: string
  score: string
  homeScore: number
  away: string
  awayScore: number
  playedOn: string
  season: number
  competition: string
  stage: string | null
  homeXg?: number
  awayXg?: number
  homePossession: number
  awayPossession: number
  extraTime: boolean
  teamResult?: string
  caps: Cap[]
  goals: Goal[]
  bookings: Booking[]
}

export interface Cap extends PlayerModel, MatchModel {
  nextId?: string
  pos: MatchPosition
  start: number
  stop: number
  ovr: number
  injured: boolean
  rating?: number
}

export interface Goal extends MatchModel {
  capId?: string
  playerId?: string
  playerName: string
  assistCapId?: string
  assistId?: string
  assistedBy?: string
  minute: number
  home: boolean
  ownGoal: boolean
  setPiece?: string
}

export interface Booking extends MatchModel {
  capId?: string
  playerId?: string
  playerName: string
  minute: number
  home: boolean
  redCard: boolean
}

export interface Squad extends TeamModel, NamedModel {}
