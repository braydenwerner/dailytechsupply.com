import type { NextPage } from 'next'
import Head from 'next/head'

import { Navbar } from '../components/modules'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DailyTechSupply - New Tech Deals Everyday</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Navbar />
        </div>
      </main>
    </>
  )
}

export default Home
