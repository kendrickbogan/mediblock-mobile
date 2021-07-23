import { gql } from "@apollo/client"

gql`
  fragment BaseUserFields on User {
    id
    authorizationToken
    expirationWarningTimeUnits
    expirationWarningTime
    onboardingStatus
  }
`
