import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { auth, serverURL } from '../config/config'
import { onError } from '@apollo/client/link/error'

const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : ''
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(async ({ message, locations, path }) => {
      if (message === 'Not Authorized') {
        await auth.signOut().catch((err) => {
          console.log(err)
        })
      } else if (message === 'invalid token') {
        await auth.signOut().catch((err) => {
          console.log(err)
        })

        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
          window.location.reload()
        }
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const client = new ApolloClient({
  link: from([authLink, errorLink, new HttpLink({ uri: serverURL })]),
  cache: new InMemoryCache(),
})
