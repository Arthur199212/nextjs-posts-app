import gql from 'graphql-tag'

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
      id
      title
      body
      user {
        id
        name
      }
    }
  }
`

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`

export const POSTS_QUERY = gql`
  {
    posts {
      id
      title
      body
      createdAt
      user {
        id
        name
      }
    }
  }
`

export const ME_QUERY = gql`
  {
    me {
      id
      name
    }
  }
`

export const POST_QUERY = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      body
      createdAt
      user {
        id
        name
      }
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(id: $id, title: $title, body: $body) {
      id
      title
      body
      createdAt
      user {
        id
        name
      }
    }
  }
`
