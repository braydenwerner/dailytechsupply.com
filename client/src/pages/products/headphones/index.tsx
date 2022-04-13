import Head from 'next/head'
import { NextPage } from 'next'

import { Navbar } from '../../../components/modules'

const HeadphonesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Headphones - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div>Headphones Page</div>
    </>
  )
}

export default HeadphonesPage
