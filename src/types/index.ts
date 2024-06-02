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
  status: string | null
}

export interface Match extends TeamModel {
  home: string
  score: string
  homeScore: number
  away: string
  awayScore: number
  playedOn: string
  competition: string
  stage: string | null
}

export interface Squad extends TeamModel, NamedModel {}
