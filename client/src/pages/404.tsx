import type { NextPage } from 'next'
import Head from 'next/head'

const ErrorPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Page not found - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Big fat error</div>
      </main>
    </div>
  )
}

export default ErrorPage
