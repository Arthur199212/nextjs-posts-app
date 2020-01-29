import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    posts(page: Int): [Post!]!
    post(id: ID!): Post
    postsCount: Int!
  }

  extend type Mutation {
    createPost(title: String!, body: String!, imageUrl: String): Post @auth
    updatePost(id: ID!, title: String!, body: String!, imageUrl: String!): Post @auth
    deletePost(id: ID!): String @auth
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    imageUrl: String
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`
