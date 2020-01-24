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
