import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client'
import { serverURL } from '../config/config'
import { onError } from '@apollo/client/link/error'
// import { setContext } from '@apollo/client/link/context'

// import { serverURL } from '../config/config'
// import { auth } from '../config/firebaseConfig'

// const uploadLink = createUploadLink({
//   uri: serverURL,
//   headers: {
//     'keep-alive': 'true',
//   },
// })

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('token')
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   }
// })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(async ({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const client = new ApolloClient({
  link: from([errorLink, new HttpLink({ uri: serverURL })]),
  cache: new InMemoryCache(),
})
