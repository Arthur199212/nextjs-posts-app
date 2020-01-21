import { gql } from 'apollo-server-express'

export default gql`
  directive @auth on FIELD_DEFINITION

  type Query {
    hello: String
    posts: [Post!]! @auth
    post(id: String): Post @auth
  }

  type Mutation {
    createPost(title: String, body: String): Post @auth
    updatePost(id: ID, title: String, body: String): String @auth
    deletePost(id: ID): String @auth
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    updatedAt: String!
  }
`
