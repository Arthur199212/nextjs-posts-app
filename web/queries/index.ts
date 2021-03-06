import gql from 'graphql-tag'

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!, $imageUrl: String) {
    createPost(title: $title, body: $body, imageUrl: $imageUrl) {
      id
      title
      body
      imageUrl
      createdAt
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
  query Posts($page: Int) {
    posts(page: $page) {
      id
      title
      body
      imageUrl
      createdAt
      user {
        id
        name
        avatarUrl
      }
    }
  }
`

export const ME_QUERY = gql`
  {
    me {
      id
      name
      avatarUrl
    }
  }
`

export const POST_QUERY = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      body
      imageUrl
      createdAt
      user {
        id
        name
        avatarUrl
      }
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String!, $body: String!, $imageUrl: String!) {
    updatePost(id: $id, title: $title, body: $body, imageUrl: $imageUrl) {
      id
      title
      body
      imageUrl
      createdAt
      user {
        id
        name
      }
    }
  }
`

export const POSTS_COUNT = gql`
  {
    postsCount
  }
`
