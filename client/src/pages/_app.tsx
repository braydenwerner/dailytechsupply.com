import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import '../styles/globals.css'

import { client } from '../utils/createApolloClient'
import { TokenProvider } from '../providers'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DailyTechSupply</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={client}>
        <TokenProvider>
          <div id="modal-portal"></div>
          <Component {...pageProps} />
        </TokenProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
