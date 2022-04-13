import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useGetUserLazyQuery } from '../generated/graphql'

import { Navbar } from '../components/modules'
import { TokenContext } from '../providers'

const AccountSettingsPage: NextPage = () => {
  //  if the user tries to access this page without being logged in,
  //  take them to the login page, pass this url as a query
  const [getUser, { data, loading, called }] = useGetUserLazyQuery()
  const userData = data && data.getUser

  const [fetchingUser, setFetchingUser] = useState(true)

  const { tokenAttached } = useContext(TokenContext)

  const router = useRouter()

  useEffect(() => {
    if (tokenAttached) getUser()
    setFetchingUser(false)
  }, [tokenAttached])

  return (
    <>
      <Head>
        <title>Account Settings - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div>Account settings</div>
      {userData && (
        <div>
          <div>{userData.email}</div>
          <div>{userData.first_name}</div>
          <div>{userData.last_name}</div>
        </div>
      )}
    </>
  )
}

export default AccountSettingsPage
