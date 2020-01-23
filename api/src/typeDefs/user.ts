import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    users: [User!]! @auth
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    createdAt: String!
    updatedAt: String!
  }
`
