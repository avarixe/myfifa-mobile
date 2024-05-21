import { gql } from 'urql'

export const teamFragment = gql`
  fragment TeamData on Team {
    id
    previousId
    name
    managerName
    game
    startedOn
    currentlyOn
    currency
    badgePath
    createdAt
  }
`
