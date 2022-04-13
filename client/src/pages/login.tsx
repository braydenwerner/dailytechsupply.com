import Head from 'next/head'
import { NextPage } from 'next'

import { SignIn } from '../components/modules'

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignIn />
    </>
  )
}

export default LoginPage
