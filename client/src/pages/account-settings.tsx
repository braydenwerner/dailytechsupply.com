import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Navbar } from '../components/modules'
import { TokenContext } from '../providers'

const AccountSettingsPage: NextPage = () => {
  const { isMounted, tokenAttached, userData } = useContext(TokenContext)

  const router = useRouter()

  //  if the user tries to access this page without being logged in,
  //  take them to the login page, pass this url as a query
  if (isMounted && !tokenAttached) {
    router.push('/login?redirect_url=account-settings')
  }

  return (
    <>
      <Head>
        <title>Account Settings - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {userData && (
        <div>
          <Navbar />
          <div>Account settings</div>
          <div>{userData.email}</div>
          <div>{userData.first_name}</div>
          <div>{userData.last_name}</div>
        </div>
      )}
    </>
  )
}

export default AccountSettingsPage
