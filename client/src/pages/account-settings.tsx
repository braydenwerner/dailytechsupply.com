import Head from 'next/head'
import { NextPage } from 'next'

import { Navbar } from '../components/modules'

const AccountSettingsPage: NextPage = () => {
  //  if the user tries to access this page without being logged in,
  //  take them to the login page, pass this url as a query
  return (
    <>
      <Head>
        <title>Account Settings - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div>Account settings</div>
    </>
  )
}

export default AccountSettingsPage
