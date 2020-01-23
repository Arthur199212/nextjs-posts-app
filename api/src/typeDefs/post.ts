import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    hello: String
    posts: [Post!]!
    post(id: String): Post
  }

  extend type Mutation {
    createPost(title: String, body: String): Post @auth
    updatePost(id: ID, title: String, body: String): String @auth
    deletePost(id: ID): String @auth
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`
