import { gql } from '@apollo/client'

export const teamFragment = gql`
  fragment TeamData on Team {
    id
    name
    startedOn
    currentlyOn
    currency
    badgePath
  }
`
