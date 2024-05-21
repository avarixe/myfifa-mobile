import { gql } from 'urql'

export const matchFragment = gql`
  fragment MatchData on Match {
    id
    teamId
    home
    away
    competition
    stage
    playedOn
    extraTime
    homeScore
    awayScore
    homeXg
    awayXg
    homePossession
    awayPossession
    score
    teamResult
    season
  }
`

export const baseCapFragment = gql`
  fragment BaseCapData on Cap {
    id
    matchId
    playerId
    nextId
    pos
    start
    stop
    ovr
    rating
    injured
  }
`

export const capFragment = gql`
  fragment CapData on Cap {
    ...BaseCapData
    player {
      id
      name
      pos
      value
      ovr
      histories {
        id
        playerId
        value
        ovr
      }
    }
  }
  ${baseCapFragment}
`

export const goalFragment = gql`
  fragment GoalData on Goal {
    id
    createdAt
    matchId
    capId
    playerId
    playerName
    assistCapId
    assistId
    assistedBy
    minute
    home
    setPiece
    ownGoal
  }
`

export const bookingFragment = gql`
  fragment BookingData on Booking {
    id
    createdAt
    matchId
    capId
    playerId
    playerName
    minute
    home
    redCard
  }
`

export const penaltyShootoutFragment = gql`
  fragment PenaltyShootoutData on PenaltyShootout {
    id
    matchId
    homeScore
    awayScore
  }
`
