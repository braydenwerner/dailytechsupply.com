import Head from 'next/head'
import { NextPage } from 'next'

import { ForgotPassword, Navbar } from '../components/modules'

const ForgotPasswordPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Reset Password - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar small />
      <ForgotPassword />
    </>
  )
}

export default ForgotPasswordPage
