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
}

export interface Match extends TeamModel {
  home: string
  homeScore: number
  away: string
  awayScore: number
  playedOn: string
  competition: string
  stage: string | null
}
