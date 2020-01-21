import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    email: String!
    posts: [Post!]!
    createdAt: String!
    updatedAt: String!
  }
`
