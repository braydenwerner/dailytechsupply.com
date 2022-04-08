import { useContext, useEffect, useState } from 'react'
import { useGetUserLazyQuery, User } from '../generated/graphql'
import type { NextPage } from 'next'
import Head from 'next/head'

import { auth } from '../config/config'
import { TokenContext } from '../providers'
import { SignInHandler } from '../components/modules'

const Home: NextPage = () => {
  const [fetchingUser, setFetchingUser] = useState(true)

  const [getUser, { data, loading }] = useGetUserLazyQuery()
  const userData = data && data.getUser

  const { tokenAttached } = useContext(TokenContext)

  useEffect(() => {
    if (tokenAttached) getUser()
    setFetchingUser(false)
  }, [tokenAttached])

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!userData && !loading && !fetchingUser && <SignInHandler />}
        {userData && (
          <button
            onClick={async () => {
              await auth.signOut().catch((err) => {
                console.log(err)
              })
              localStorage.removeItem('token')
              window.location.reload()
            }}
          >
            Sign Out
          </button>
        )}
        {userData && <div>Hey, {userData.first_name}</div>}
      </main>
    </div>
  )
}

export default Home
