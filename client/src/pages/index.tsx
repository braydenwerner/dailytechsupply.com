import { useContext, useEffect } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import { useGetUserLazyQuery } from '../generated/graphql'
import { SignedInContext } from '../providers'
import { SignIn } from '../components/modules'

const Home: NextPage = () => {
  const { tokenAttached } = useContext(SignedInContext)

  const [getUser, { data }] = useGetUserLazyQuery()
  const userData = data && data.getUser

  useEffect(() => {
    //  only want to make this query once the user is signed in and the session cookie is attached
    if (tokenAttached) {
      getUser()
    }
  }, [tokenAttached])

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          {!userData ? <SignIn /> : <div>Hello, {userData.first_name}</div>}
        </div>
      </main>
    </div>
  )
}

export default Home
