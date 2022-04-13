import Head from 'next/head'
import { NextPage } from 'next'

import { SignUp } from '../components/modules'

const SignUpPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>SignUp - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUp />
    </>
  )
}

export default SignUpPage
