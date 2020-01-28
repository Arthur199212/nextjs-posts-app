import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import fetch from 'isomorphic-unfetch'
import { getReduxStore } from './redux/redux-store'
import { showNotification } from './redux/actions'

const GRAPHQL_URL = 'http://localhost:4000/graphql'

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
  credentials: 'include',
  fetch
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )

      if (!message.includes('You must be logged in')) {
        const store = getReduxStore()
  
        store.dispatch(
          showNotification({
            status: 'error',
            message
          })
        )
      }
    })
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const createApolloClient = (initialState = {}) => 
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState)
  })

export default createApolloClient
