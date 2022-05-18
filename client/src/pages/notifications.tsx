import Head from 'next/head'
import type { NextPage } from 'next'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import { Navbar } from '../components/modules'
import { TokenContext } from '../providers'
import { Notifications } from '../components/elements'

const ErrorPage: NextPage = () => {
  const { isMounted, tokenAttached, userData } = useContext(TokenContext)

  const router = useRouter()

  //  if the user tries to access this page without being logged in,
  //  take them to the login page, pass this url as a query
  if (isMounted && !tokenAttached) {
    router.push('/login?redirect_url=notifications')
  }
  return (
    <>
      <Head>
        <title>Notifications - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar small />
      {userData && <Notifications user={userData} />}
    </>
  )
}

export default ErrorPage
