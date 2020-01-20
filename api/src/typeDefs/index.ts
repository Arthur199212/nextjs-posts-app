import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    hello: String
    posts: [Post!]!
    post(id: String): Post
  }

  type Mutation {
    createPost(title: String, body: String): Post
    updatePost(id: ID, title: String, body: String): Post
    deletePost(id: ID): String
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    updatedAt: String!
  }
`
