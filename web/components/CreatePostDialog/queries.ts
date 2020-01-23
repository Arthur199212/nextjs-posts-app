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
