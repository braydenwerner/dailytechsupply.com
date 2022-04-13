import type { NextPage } from 'next'
import Head from 'next/head'

import { Navbar } from '../components/modules'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>DailyTechSupply - New Tech Deals Everyday</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div>Main page</div>
      </main>
    </div>
  )
}

export default Home
