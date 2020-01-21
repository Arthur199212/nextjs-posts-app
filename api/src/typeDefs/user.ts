import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    email: String!
    createdAt: String!
    updatedAt: String!
  }
`
