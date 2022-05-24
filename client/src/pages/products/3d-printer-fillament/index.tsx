import Head from 'next/head'
import { NextPage } from 'next'

import { Navbar } from '../../../components/modules'

const Printer3dFillamentPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>3d Printer Fillament - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div>3d Printer Fillament Page</div>
    </>
  )
}

export default Printer3dFillamentPage
