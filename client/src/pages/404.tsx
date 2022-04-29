import type { NextPage } from 'next'
import Head from 'next/head'

import { Navbar } from '../components/modules'
import { Error404 } from '../components/elements'

const ErrorPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page not found - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Error404 />
      </main>
    </>
  )
}

export default ErrorPage
